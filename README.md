# ViralVision AI - Clickbait Studio Pro

Generador inteligente de miniaturas virales de YouTube construido sobre **Next.js 14 (App Router)** e integrado con Google AI Studio de forma segura.

## Despliegue en un clic con Vercel

Tus llaves están seguras en el servidor bajo la función serverless de Next.js en `app/api/generate/route.ts`.

### Configuración Rápida:

1. Instala dependencias:
```bash
npm install
```

2. Configura tu archivo `.env`:
Crea un archivo `.env` en el directorio principal del proyecto:
```env
GEMINI_API_KEY="AIzaSyYourKeyHere..."
```

3. Corre el servidor local:
```bash
npm run dev
```