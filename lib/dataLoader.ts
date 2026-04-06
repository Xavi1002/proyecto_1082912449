// Placeholder para data loader (Fase 2)
// Este archivo será implementado en la siguiente fase

export async function cargarDatos<T>(archivo: string): Promise<T> {
  try {
    const data = await import(`../data/${archivo}.json`);
    return data.default as T;
  } catch (error) {
    console.error(`Error cargando ${archivo}:`, error);
    throw error;
  }
}
