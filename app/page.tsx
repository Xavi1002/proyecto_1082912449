'use client';

import { useEffect, useState } from 'react';
import HolaMundo from '@/components/HolaMundo';
import type { ConfigSitio } from '@/lib/types';

export default function Home() {
  const [config, setConfig] = useState<ConfigSitio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadConfig() {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Error al cargar la configuración');
        }
        const data: ConfigSitio = await response.json();
        setConfig(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    loadConfig();
  }, []);

  if (loading) {
    return (
      <main style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0f',
        color: '#f8fafc',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div>Cargando...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0f',
        color: '#f8fafc',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div>Error: {error}</div>
      </main>
    );
  }

  if (!config) {
    return null;
  }

  return (
    <HolaMundo
      saludo={config.sitio.saludo}
      subtitulo={config.sitio.subtitulo}
    />
  );
}
