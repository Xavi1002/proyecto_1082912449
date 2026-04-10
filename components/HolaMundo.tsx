import type { FC } from 'react';

interface HolaMundoProps {
  saludo: string;
  subtitulo: string;
}

const HolaMundo: FC<HolaMundoProps> = ({ saludo, subtitulo }) => {
  return (
    <main className="hero-container">
      <div className="hero-content">
        <div className="badge">TypeScript ✓</div>
        <h1 className="titulo-principal">{saludo}</h1>
        <p className="subtitulo">{subtitulo}</p>
        <div className="linea-decorativa" />
        <span className="version-tag">Next.js 14 · Vercel · JSON DB</span>
      </div>
    </main>
  );
};

export default HolaMundo;