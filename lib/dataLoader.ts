import { promises as fs } from 'fs';
import path from 'path';

/**
 * Función genérica para cargar datos desde archivos JSON en la carpeta /data
 * @param archivo Nombre del archivo sin extensión (ej: 'config')
 * @returns Promise con los datos tipados
 */
export async function cargarDatos<T>(archivo: string): Promise<T> {
  try {
    const rutaCompleta = path.join(process.cwd(), 'data', `${archivo}.json`);
    const contenido = await fs.readFile(rutaCompleta, 'utf-8');
    const datos = JSON.parse(contenido);
    return datos as T;
  } catch (error) {
    console.error(`Error cargando ${archivo}:`, error);
    throw new Error(`No se pudo cargar el archivo ${archivo}.json`);
  }
}
