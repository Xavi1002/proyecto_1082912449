// Tipos de datos para el sistema de persistencia JSON

export interface ConfigSitio {
  sitio: {
    nombre: string;
    saludo: string;
    subtitulo: string;
    version: string;
  };
  tema: {
    colorPrimario: string;
    colorSecundario: string;
    fuente: string;
  };
}
