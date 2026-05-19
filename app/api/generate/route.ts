import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY no configurada en Vercel.' }, { status: 500 });
    }

    const { title, desc, audience, style } = await req.json();

    const geminiPrompt = `
      Actúas como un estratega de miniaturas de YouTube.
      Título: "${title}"
      Contexto: "${desc}"
      Audiencia: "${audience}"
      Estilo: "${style}"

      Genera un prompt estructurado en inglés detallado para Imagen 4.0 asegurando que el personaje y elementos principales no sufran recortes y se sitúen de forma correcta en los tercios.

      Responde en JSON:
      {
        "imagePrompt": "prompt en inglés detallado...",
        "hooks": ["Gancho 1", "Gancho 2"]
      }
    `;

    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: geminiPrompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    const geminiData = await geminiRes.json();
    const parsedData = JSON.parse(geminiData.candidates[0].content.parts[0].text);

    const imageRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: { prompt: parsedData.imagePrompt },
        parameters: { sampleCount: 1 }
      })
    });

    const imageData = await imageRes.json();
    const base64Image = imageData.predictions[0].bytesBase64Encoded;

    return NextResponse.json({
      base64Image,
      hooks: parsedData.hooks
    });

  } catch (error: any) {
    return NextResponse.json({ error: 'Fallo al procesar con los endpoints de IA.' }, { status: 500 });
  }
}