"use client";

import React, { useState, useEffect } from 'react';
import CanvasEditor from '../components/CanvasEditor';

export default function Home() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [audience, setAudience] = useState('Programadores & Tech');
  const [style, setStyle] = useState('High-Key Vibrant (Estilo MrBeast)');
  const [loading, setLoading] = useState(false);
  const [baseImage, setBaseImage] = useState<string | null>(null);
  const [hooks, setHooks] = useState<string[]>([]);
  const [usesRemaining, setUsesRemaining] = useState(3);

  useEffect(() => {
    const uses = localStorage.getItem('viralvision_uses') || '3';
    setUsesRemaining(parseInt(uses));
  }, []);

  const handleGenerate = async () => {
    if (usesRemaining <= 0) {
      alert("Has alcanzado el límite de 3 pruebas gratis.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, desc, audience, style })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setBaseImage(`data:image/png;base64,${data.base64Image}`);
      setHooks(data.hooks);
      
      const nextUses = usesRemaining - 1;
      setUsesRemaining(nextUses);
      localStorage.setItem('viralvision_uses', nextUses.toString());

    } catch (e) {
      console.error(e);
      alert("Error al procesar la petición con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto p-6 grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-12 flex justify-between items-center py-4">
        <h1 className="text-xl font-bold">ViralVision Studio</h1>
        <div className="text-xs bg-indigo-950 text-indigo-400 px-3 py-1 rounded-full border border-indigo-900 font-bold">
          {usesRemaining} Créditos Gratuitos
        </div>
      </div>

      <section className="lg:col-span-5 space-y-6">
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-white/5 space-y-4">
          <input 
            type="text" 
            placeholder="Título del Video" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm"
          />
          <textarea 
            placeholder="Contexto o detalles visuales de la composición" 
            value={desc} 
            onChange={(e) => setDesc(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm h-24 resize-none"
          />
          <button 
            onClick={handleGenerate} 
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-sm"
          >
            {loading ? "GENERANDO COMPOSICIÓN..." : "GENERAR CON IA"}
          </button>
        </div>
      </section>

      <section className="lg:col-span-7">
        <CanvasEditor baseImage={baseImage} hooks={hooks} />
      </section>
    </main>
  );
}