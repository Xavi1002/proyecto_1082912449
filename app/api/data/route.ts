import { NextResponse } from 'next/server';
import { cargarDatos } from '../../../lib/dataLoader';
import type { ConfigSitio } from '../../../lib/types';

/**
 * API Route para obtener la configuración del sitio
 * GET /api/data
 */
export async function GET() {
  try {
    const config: ConfigSitio = await cargarDatos<ConfigSitio>('config');
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error en API /api/data:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
