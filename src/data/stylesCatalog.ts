export interface StyleEntry {
  name: string;
  category: 'Movimiento' | 'Tradición' | 'Técnica / Digital' | 'Mezcla';
  description: string;
}

export const stylesCatalog: StyleEntry[] = [
  { name: 'Swiss / International Typographic Style', category: 'Movimiento', description: 'Retícula, tipografía grotesca, jerarquía clara' },
  { name: 'Constructivismo', category: 'Movimiento', description: 'Diagonales, rojo/negro, fotomontaje' },
  { name: 'Bauhaus', category: 'Movimiento', description: 'Formas primarias, geometría funcional' },
  { name: 'Art Nouveau', category: 'Movimiento', description: 'Curvas orgánicas, ornamento floral' },
  { name: 'De Stijl', category: 'Movimiento', description: 'Líneas rectas, primarios + negro/blanco' },
  { name: 'Memphis / 80s', category: 'Movimiento', description: 'Color bloque, patrones geométricos' },
  { name: 'Brutalismo gráfico', category: 'Movimiento', description: 'Tipografía bold, alto contraste' },
  { name: 'Editorial Contemporáneo', category: 'Movimiento', description: 'Retícula editorial, serif + sans' },
  { name: 'Secesión Vienesa', category: 'Movimiento', description: 'Dorado, ornamento geométrico' },
  { name: 'Arts and Crafts', category: 'Movimiento', description: 'Artesanía, bordes decorativos' },
  { name: 'Ukiyo-e', category: 'Tradición', description: 'Grabado japonés, olas y planicies' },
  { name: 'WPA / New Deal', category: 'Tradición', description: 'Serigrafía americana, bloques de color' },
  { name: 'Flyer Hip Hop 80s', category: 'Tradición', description: 'Collage fotocopia, letras bold' },
  { name: 'Cartel de viaje clásico', category: 'Tradición', description: 'Ilustración plana, horizonte limpio' },
  { name: 'Risografía', category: 'Técnica / Digital', description: 'Trama de puntos, tintas planas' },
  { name: 'Cutout Collage / Zine', category: 'Técnica / Digital', description: 'Recortes, cinta, fotocopia' },
  { name: 'Pixel Art + Art Deco', category: 'Mezcla', description: 'Píxel retro con geometría déco' },
];
