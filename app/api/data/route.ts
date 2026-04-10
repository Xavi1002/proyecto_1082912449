import { NextResponse } from 'next/server';
import type { ConfigSitio } from '../../../lib/types';

// Importar datos JSON directamente (Next.js hace tree-shaking)
import configData from '../../../data/config.json';

export async function GET() {
  try {
    // Devolver los datos importados directamente
    const config: ConfigSitio = configData;
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error en API /api/data:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
