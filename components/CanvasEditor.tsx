"use client";

import React, { useRef, useEffect } from 'react';

interface CanvasEditorProps {
  baseImage: string | null;
  hooks: string[];
}

export default function CanvasEditor({ baseImage, hooks }: CanvasEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (baseImage) {
      const img = new Image();
      img.src = baseImage;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        if (hooks.length > 0) {
          ctx.save();
          ctx.translate(60, 160);
          ctx.font = 'italic 800 65px "Impact"';
          
          const text = hooks[0].toUpperCase();
          const w = ctx.measureText(text).width;
          
          ctx.fillStyle = '#ff0055';
          ctx.fillRect(-20, -10, w + 40, 80);
          
          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 10;
          ctx.strokeText(text, 0, 60);
          ctx.fillText(text, 0, 60);
          ctx.restore();
        }
      };
    }
  }, [baseImage, hooks]);

  return (
    <div className="border border-slate-800 rounded-xl overflow-hidden aspect-video bg-slate-900 shadow-2xl">
      <canvas ref={canvasRef} width="1280" height="720" className="w-full h-full block" />
    </div>
  );
}