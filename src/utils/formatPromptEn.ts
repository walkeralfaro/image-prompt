import { antiTropesData } from '../data/antiTropesData';
import type { EngineInput } from './formatPrompt';

export type OptimizedTarget = 'midjourney' | 'dall-e' | 'chatgpt-images';

const FORMAT_EN: Record<string, { desc: string; ar: string }> = {
  'Vertical 4:5': { desc: 'vertical 4:5 portrait poster', ar: '4:5' },
  'Vertical 9:16': { desc: 'vertical 9:16 story format', ar: '9:16' },
  'Cuadrado 1:1': { desc: 'square 1:1 format', ar: '1:1' },
  'Horizontal 16:9': { desc: 'horizontal 16:9 banner format', ar: '16:9' },
};

const QUE_ES_EN: Record<string, string> = {
  'Cartel de exposición': 'exhibition poster',
  'Afiche publicitario': 'advertising poster',
  'Portada de carrusel': 'carousel cover slide',
  'Vista explosionada / despiece': 'exploded axonometric view with floating parts',
  'Blueprint / plano técnico': 'technical blueprint with fine linework on blue',
  Knolling: 'flat-lay knolling arrangement at right angles',
  'Rayos X': 'x-ray cutaway revealing the interior',
  'Corte en sección (Cutaway)': 'cutaway section showing inner layers',
  'Infografía explicativa': 'explanatory infographic with icons and data blocks',
  'Anatomía de producto': 'product anatomy with labeled parts',
  'Packaging mockup': '3D packaging mockup in perspective',
};

const TEMA_EN: Record<string, string> = {
  'Objeto o sujeto central único con datos clave': 'single central subject with key data points',
  'Piezas despiezadas y flotando en su eje': 'exploded parts floating along their axis',
  'Composición cenital plana con elementos en ángulo recto':
    'top-down flat composition with elements at right angles',
  'Plano con líneas finas sobre azul, vista frontal y lateral':
    'blueprint with thin lines, front and side views',
};

const ESTILO_EN: Record<string, string> = {
  'Swiss / International Typographic Style': 'Swiss International Typographic Style, grid-based, grotesque type',
  Constructivismo: 'Constructivist poster, red diagonals, inclined bold type',
  Bauhaus: 'Bauhaus composition, primary circles and bars on cream',
  'Art Nouveau': 'Art Nouveau, flowing floral borders, wavy lettering',
  'De Stijl': 'De Stijl, red-blue-yellow blocks with black lines',
  'Memphis / 80s': 'Memphis 80s pattern, pastel zigzags, playful type',
  'Brutalismo gráfico': 'graphic brutalism, massive black block, raw white type',
  'Editorial Contemporáneo': 'contemporary editorial, clean cover, large serif',
  'Secesión Vienesa': 'Vienna Secession, geometric golden frame, tall lettering',
  'Arts and Crafts': 'Arts and Crafts, vegetal borders, artisanal lettering',
  'Ukiyo-e': 'Ukiyo-e woodblock style, flat waves, red sun',
  'WPA / New Deal': 'WPA New Deal silkscreen poster, gradient sunset',
  'Flyer Hip Hop 80s': '80s hip-hop flyer, chunky outlined letters over photo',
  'Cartel de viaje clásico': 'classic travel poster, train and mountain, bottom band',
  Risografía: 'risograph print, grainy overlapping pink and blue textures',
  'Cutout Collage / Zine': 'cutout collage zine, torn paper, visible tape',
  'Pixel Art + Art Deco': 'pixel-art meets Art Deco, golden arches on black',
};

const PALETTE_EN: Record<string, string> = {
  'Sans-serif recta; rojo, negro y crema': 'straight grotesque type; red, black and cream',
  'Serif elegante; azul cobalto, blanco y dorado mate':
    'elegant serif; cobalt blue, white and matte gold',
  'Tipografía Bold / Brutalista; blanco, negro y amarillo chicle':
    'bold brutalist type; white, black and bubblegum yellow',
  'La propia del estilo': 'the movement-native typography',
};

const TROPE_EN: Record<string, string> = {
  'Bustos clásicos': 'classical busts',
  'pan de oro': 'gold leaf',
  brochazos: 'dry brush strokes',
  'iconos de reloj': 'clock icons',
  'Libros apilados': 'stacked books',
  'tazas de café': 'coffee mugs',
  'hojas secas': 'dry leaves',
  Banderines: 'bunting flags',
  farolillos: 'paper lanterns',
  'fuegos artificiales': 'fireworks',
  degradados: 'gradients',
  'Siluetas corriendo': 'running silhouettes',
  'línea de meta': 'finish line',
  'letra inclinada': 'slanted lettering',
  'Sol sonriente': 'smiling sun',
  salpicaduras: 'splashes',
  'hojas de palmera': 'palm leaves',
  'Foco amarillo': 'yellow spotlight',
  micrófono: 'microphone',
  'notas musicales': 'music notes',
  Neones: 'neon glows',
  'cerebros 3D': '3D brains',
  'robots futuristas': 'futuristic robots',
};

const FIXED_GUIDE_EN =
  'worn texture, dry brush strokes, speed lines, rays decorating elements, brush underlines';

function dictLookup(dict: Record<string, string>, value: string): string {
  const hit = dict[value.trim()];
  return hit ?? value;
}

function translateListaPreservandoComillas(text: string): string {
  return text;
}

export function buildOptimizedEn(input: EngineInput, target: OptimizedTarget): string {
  const { answers, customAnswers } = input;
  const getVal = (k: keyof typeof answers) =>
    (answers[k] === 'custom' ? customAnswers[k] : answers[k] || '').trim();

  const formatoRaw = getVal('formato');
  const fmt = FORMAT_EN[formatoRaw] ?? { desc: `${formatoRaw || 'vertical 4:5'} format`, ar: '4:5' };
  const queEs = dictLookup(QUE_ES_EN, getVal('queEs') || 'Cartel publicitario para evento');
  const tema = dictLookup(TEMA_EN, getVal('tema') || 'Sujeto central único con composición limpia');
  const estilo = dictLookup(ESTILO_EN, getVal('estilo') || 'Swiss / International Typographic Style');
  const paleta = dictLookup(
    PALETTE_EN,
    getVal('tipografiaPaleta') || 'Tipografía del estilo; Rojo, Negro y Crema',
  );

  let textPart: string;
  if (input.noText) {
    textPart = 'no text, clean base artwork for later typography in an external editor';
  } else {
    const list = (input.textList ?? []).map((t) => t.trim()).filter(Boolean);
    const base =
      list.length > 0
        ? list.join(', ')
        : getVal('textoExacto') || '"Título Principal", "01 OCT 2026", "Galería Central"';
    const withSuffix = /ningún otro texto/i.test(base)
      ? base.replace(/y ningún otro texto\.?/gi, 'and no other text')
      : `${translateListaPreservandoComillas(base)} and no other text`;
    textPart = `render text exactly as quoted: ${withSuffix}`;
  }

  const evitaRaw = getVal('evita');
  const topics = input.selectedTopics ?? [];
  const tropes: string[] = [];
  for (const t of topics) {
    const arr = (antiTropesData as Record<string, string[]>)[t];
    if (arr) tropes.push(...arr);
  }
  const evitaParts: string[] = [];
  if (evitaRaw) evitaParts.push(evitaRaw);
  if (tropes.length > 0) evitaParts.push(tropes.join(', '));
  const evitaTranslated = evitaParts
    .join(', ')
    .split(/,\s*/)
    .map((tok) => TROPE_EN[tok.trim()] ?? tok)
    .join(', ');
  const avoidPart = evitaTranslated
    ? `avoid ${evitaTranslated}, ${FIXED_GUIDE_EN}`
    : `avoid ${FIXED_GUIDE_EN}`;

  const core =
    `${fmt.desc}, ${queEs}: ${tema}, ${estilo} style, typography and palette ${paleta}, ` +
    `${textPart}, ${avoidPart}, sharp vector typography, balanced layout, high legibility, no watermark`;

  switch (target) {
    case 'midjourney':
      return `${core} --ar ${fmt.ar} --style raw --v 6.1`;
    case 'dall-e':
      return `High-quality poster artwork, ${core}, photoreal clean render, exact quoted text only`;
    case 'chatgpt-images':
      return `Generate an image: ${core}. Render text exactly as quoted, nothing else.`;
  }
}
