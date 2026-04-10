import HolaMundo from '@/components/HolaMundo';
import { cargarDatos } from '@/lib/dataLoader';
import type { ConfigSitio } from '@/lib/types';

// Página de servidor — carga datos del JSON en tiempo de build
export default async function Home() {
  const config = await cargarDatos<ConfigSitio>('config');

  return (
    <HolaMundo
      saludo={config.sitio.saludo}
      subtitulo={config.sitio.subtitulo}
    />
  );
}
