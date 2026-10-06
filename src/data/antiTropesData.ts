export type Topic =
  | 'Arte'
  | 'Libros'
  | 'Fiestas'
  | 'Deportes'
  | 'Verano'
  | 'Concierto'
  | 'Tech';

export const TOPICS: Topic[] = [
  'Arte',
  'Libros',
  'Fiestas',
  'Deportes',
  'Verano',
  'Concierto',
  'Tech',
];

export const antiTropesData: Record<Topic, string[]> = {
  Arte: ['Bustos clásicos', 'pan de oro', 'brochazos', 'iconos de reloj'],
  Libros: ['Libros apilados', 'tazas de café', 'hojas secas'],
  Fiestas: ['Banderines', 'farolillos', 'fuegos artificiales', 'degradados'],
  Deportes: ['Siluetas corriendo', 'línea de meta', 'letra inclinada'],
  Verano: ['Sol sonriente', 'salpicaduras', 'hojas de palmera'],
  Concierto: ['Foco amarillo', 'micrófono', 'notas musicales'],
  Tech: ['Neones', 'cerebros 3D', 'robots futuristas'],
};

export const FIXED_ANTI_GUIDE =
  'Textura desgastada, pinceladas secas, líneas de velocidad, rayos decorando elementos y subrayados de pincel';

export const EMPTY_ADJECTIVES = ['bonito', 'moderno', 'profesional', 'impactante'];

export interface TopicExample {
  text: string;
  image?: string;
}

export const TOPIC_EXAMPLES: Record<Topic, string | TopicExample> = {
  Arte: 'Ej. evita bustos y pan de oro; usa trama riso en su lugar',
  Libros: 'Ej. evita pila de libros + café; usa lomo tipográfico macro',
  Fiestas: 'Ej. evita banderines y farolillos; usa confeti recortado',
  Deportes: 'Ej. evita silueta corriendo; usa dorsal gigante en primer plano',
  Verano: 'Ej. evita sol sonriente; usa sombra de palmera sobre crema',
  Concierto: 'Ej. evita foco amarillo + notas; usa ecualizador en bloque',
  Tech: 'Ej. evita neones y robot; usa placa de circuito en crema',
};

export const TOPIC_EXAMPLE_IMAGES: Record<Topic, string> = {
  Arte: '/tooltips/topic-arte.svg',
  Libros: '/tooltips/topic-libros.svg',
  Fiestas: '/tooltips/topic-fiestas.svg',
  Deportes: '/tooltips/topic-deportes.svg',
  Verano: '/tooltips/topic-verano.svg',
  Concierto: '/tooltips/topic-concierto.svg',
  Tech: '/tooltips/topic-tech.svg',
};
export function containsEmptyAdjective(text: string): string | null {
  const lower = text.toLowerCase();
  for (const adj of EMPTY_ADJECTIVES) {
    if (lower.includes(adj)) return adj;
  }
  return null;
}
