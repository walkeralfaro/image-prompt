import { antiTropesData, FIXED_ANTI_GUIDE } from '../data/antiTropesData';
import type { StepField } from '../data/stepsData';

export interface EngineInput {
  answers: Record<StepField, string>;
  customAnswers: Record<StepField, string>;
  textList?: string[];
  noText?: boolean;
  selectedTopics?: string[];
}

const NO_TEXT_LINE = 'Sin texto en la imagen base (se maquetará en editor externo)';
const SUFFIX = 'y ningún otro texto';

function getVal(
  answers: Record<StepField, string>,
  customAnswers: Record<StepField, string>,
  key: StepField,
): string {
  if (answers[key] === 'custom') return (customAnswers[key] || '').trim();
  return (answers[key] || '').trim();
}

function quoteIfNeeded(t: string): string {
  const trimmed = t.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length >= 2) {
    return trimmed;
  }
  return `"${trimmed}"`;
}

function cleanSuffix(t: string): string {
  return t.replace(/\s*y\s+ningún otro texto\s*\.?\s*/gi, '').trim();
}

function buildTextoExacto(input: EngineInput): string {
  if (input.noText) return NO_TEXT_LINE;
  const list = (input.textList ?? [])
    .map((t) => cleanSuffix(t).trim())
    .filter(Boolean);
  let base: string;
  if (list.length > 0) {
    base = list.map(quoteIfNeeded).join(', ');
  } else {
    const raw =
      getVal(input.answers, input.customAnswers, 'textoExacto') ||
      '"Título Principal", "01 OCT 2026", "Galería Central"';
    if (raw.includes(SUFFIX)) return raw;
    base = raw;
  }
  if (base.includes(SUFFIX)) return base;
  return `${base} ${SUFFIX}`;
}

function buildEvita(input: EngineInput): string {
  const evitaBase = getVal(input.answers, input.customAnswers, 'evita');
  const topics = input.selectedTopics ?? [];
  const tropes: string[] = [];
  for (const t of topics) {
    const arr = (antiTropesData as Record<string, string[]>)[t];
    if (arr) tropes.push(...arr);
  }
  const parts = [evitaBase, tropes.join(', ')].filter((p) => p.trim() !== '');
  const head = parts.join(', ');
  return head ? `${head}. ${FIXED_ANTI_GUIDE}` : FIXED_ANTI_GUIDE;
}

export function generateOptimizedPrompt(input: EngineInput): string {
  const formato = getVal(input.answers, input.customAnswers, 'formato') || 'Vertical 4:5';
  const queEs =
    getVal(input.answers, input.customAnswers, 'queEs') || 'Cartel publicitario para evento';
  const tema =
    getVal(input.answers, input.customAnswers, 'tema') || 'Sujeto central único con composición limpia';
  const estilo =
    getVal(input.answers, input.customAnswers, 'estilo') || 'Swiss / International Typographic Style';
  const textoExacto = buildTextoExacto(input);
  const tipografiaPaleta =
    getVal(input.answers, input.customAnswers, 'tipografiaPaleta') ||
    'Tipografía del estilo; Rojo, Negro y Crema';
  const evitaFinal = buildEvita(input);

  return `Formato: ${formato}
Qué es: ${queEs}
Tema: ${tema}
Estilo: ${estilo}
Texto exacto: ${textoExacto}
Tipografía y paleta: ${tipografiaPaleta}
Evita: ${evitaFinal}`;
}

export function generateMarkdownDocument(
  promptText: string,
  projectName: string = 'Mi primer proyecto',
): string {
  const name = projectName.trim() === '' ? 'Mi primer proyecto' : projectName;
  return `# Prompt Optimizado para Generador de Imágenes (Método 7 Líneas)

## Proyecto: ${name}

### Prompt Final (Copiar y Pegar en ChatGPT / DALL-E / Midjourney)

\`\`\`text
${promptText}
\`\`\`

---

### Recomendaciones de Uso
1. **Chat Nuevo:** Inicia un chat totalmente independiente para evitar que la IA arrastre estilos o sesgos de generaciones previas.
2. **Imagen de Referencia:** Si vas a generar un producto o mantener la identidad de tu marca, adjunta la foto real junto al prompt.
3. **Control Tipográfico:** Revisa siempre las tildes, letras y nombres. Si la IA presenta inconsistencias en el texto, genera solo la imagen base sin texto y retoca en Canva, Figma o Photoshop.
4. **Cero Palabras Vacías:** Nunca agregues adjetivos como "bonito" o "moderno". Define estilos con nombre propio.
`;
}
