import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ViralVision AI - Clickbait Studio Pro',
  description: 'Generador y editor inteligente de miniaturas virales de YouTube en alta definición.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-slate-950 text-slate-50 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}