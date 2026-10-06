# Design

## Context

Estado actual (verificado): marca `beailabs-*` en `src/index.css`, `Header.tsx`, `Footer.tsx`, `HomePage.tsx`, clave `beailabs-prompt-store` en `usePromptStore.ts`, textos en `formatPrompt.ts`; tooltip solo-texto en `RecommendationTooltip.tsx` con datos `stepsData.ts` / `antiTropesData.ts`; store monolitico con `projectName:string` + `history:PromptRecord[]` sin `projectId`; resultado solo ES; tema dark fijo sin variante `dark:`. Stack: React 19 + Vite + Tailwind v4 (`@theme`), Zustand persist, React Router 7, lucide-react. Ver `proposal.md` para el porqué y `specs/` para requisitos.

## Goals / Non-Goals

**Goals:**
- Desmarca total sin romper engine 7 líneas ni persistencia existente.
- Tooltips texto+imagen accesibles y livianos.
- Multiproyecto con migración sin pérdida.
- Salida EN optimizada local por target.
- Theming claro/oscuro persistente y legible.

**Non-Goals:**
- No backend, no i18n completa de la UI, no generación de imágenes con IA, no rediseño del flujo 7+revisión.

## Decisions

- **Marca neutra `app-*` + alias temporal:** renombrar tokens `beailabs-*` → `app-*` (`bg-app-*`, etc.) con búsqueda global; clave store `image-prompt-store-v2` con lectura fallback a `beailabs-prompt-store` una vez. Alternativa (mantener alias CSS) descartada por dejar deuda de marca.
- **Tooltips `example: {text, image?}`:** extender `StepOption.example` a objeto o añadir `exampleImage?: string` + `TOPIC_EXAMPLES: Record<Topic,{text,image?}>`; assets en `public/tooltips/<slug>.webp` (~20-40KB, lazy, `alt` derivado). `RecommendationTooltip` renderiza `<img onError=hide>` con fallback textual. Alternativa (CDN externo) descartada por offline-first.
- **Proyectos como entidad separada:** nuevo `useProjectsStore` persist (`projects: Project[]`, `activeProjectId`) + `usePromptStore` añade `projectId` por registro y filtra historial; cuestionario guarda borrador por proyecto (`drafts: Record<projectId, answers>` o persist por proyecto). Migración: si hay estado viejo, crea proyecto con su `projectName`/`history`. Alternativa (reusar solo `history`) descartada por no aislar borradores.
- **EN optimizado local:** nuevo `src/utils/formatPromptEn.ts`: `buildOptimizedEn(input, target)` — diccionario ES→EN para formatos/estilos/tópicos + plantillas `"{subject}, {style} poster, {palette}, {texts} | avoid {negatives} --ar {ratio} --v 6"` (Midjourney) / `"Create ... photoreal/flat ... --quality high"` (DALL-E). Sin API. Alternativa (LLM externo) descartada por costo/privacidad.
- **Theming `data-theme` + Tailwind v4 dark variant:** `useThemeStore {theme: 'light'|'dark'|'system', resolved}` + `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *))`, toggle en `Header` con `Sun`/`Moon` de lucide, init desde `prefers-color-scheme` antes de paint para evitar flash. Alternativa (`darkMode: 'class'`) no existe en v4, se usa custom-variant.

## Risks / Trade-offs

- [Migración rompe borrador] → doble lectura de clave vieja, test manual recarga + backup en memoria antes de escribir.
- [Peso imágenes tooltip] → WebP <50KB, lazy + `decoding=async`, fallback texto garantiza uso sin assets.
- [Traducción EN ingenua] → diccionario acotado a opciones `stepsData` + passthrough entre comillas; sufijos por target documentados, sin promesa de inglés perfecto.
- [Contraste en claro] → auditar `app-muted`/`app-cream` en ambos temas, tooltips y `PromptMarkdownViewer` con fondo adaptativo.
- [Filenames con marca] → renombrar output a neutro manteniendo `prompt_cartel_7_lineas.md` como alias para no romper hábito.

## Migration Plan

1. Deploy solo-front: renombrado + theming + tooltips (lectura compatible).
2. Activar proyectos + migración lazy en primer `load()`; si falla, conserva clave vieja intacta.
3. Rollback: revertir commit + restaurar `localStorage` desde backup automático `image-prompt-backup-v1`.

## Open Questions

- Ninguna bloqueante. Deferible: generar set final de imágenes tooltip (placeholder gris vs ilustraciones) y lista exacta de keywords EN por estilo — se resuelven con assets/diccionario sin cambiar specs ni tareas.
