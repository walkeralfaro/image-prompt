# Proposal

## Why

Los 47 SVGs de `public/tooltips/` son el mismo placeholder morado con distinto label; el tooltip muestra texto útil pero una imagen que no explica composición, proporción ni estilo. Esto golpea sobre todo al paso 4 Estilo (17 movimientos/tradiciones/técnicas indistinguibles sin referencia visual) y al paso 1 Formato (4 proporciones que deberían verse de un vistazo).

## What Changes

- Sustituir los 21 SVGs priorizados por esquemas de composición propios dibujados a mano: 17 de `estilo-ej-*` + 4 de `formato-ej-*`.
- Cada esquema es un SVG `320x180` esquemático (wireframe de layout, no ilustración literal ni icono genérico de internet): muestra proporción, distribución, paleta y gesto tipográfico de la opción.
- Lenguaje visual unificado estilo Lucide: trazo ~2px, extremos redondos, paleta de la app + colores planos del estilo representado, sin fuentes embebidas ni raster, sin texto salvo marcas mínimas de layout.
- Rutas y nombres de archivo estables: se sobrescriben los mismos 21 ficheros bajo `public/tooltips/` para no tocar `stepsData.ts`, `antiTropesData.ts` ni `RecommendationTooltip.tsx`.
- Fuera de alcance en este change: los 26 restantes (`queEs` 11, `tema` 4, `tipografiaPaleta` 4, `topic` 7) quedan como follow-up; el fallback textual actual sigue cubriéndolos.

## Capabilities

### New Capabilities

- Ninguna.

### Modified Capabilities

- `prompt-questionnaire`: el requisito "Tooltip con ejemplo por opción predefinida" se endurece — la imagen de Formato y Estilo SHALL ser un esquema de composición representativo (no un placeholder genérico), con cobertura completa en esos dos grupos.

## Impact

- Afectado: `public/tooltips/estilo-ej-*.svg` (17) y `public/tooltips/formato-ej-*.svg` (4). Ningún cambio de código esperado; `RecommendationTooltip` (fallback, `alt`, lazy) se reutiliza tal cual.
- Riesgo bajo: si un SVG falla, el tooltip ya degrada a solo-texto por diseño existente.
- Sin dependencias nuevas, sin cambios de rutas ni de store.
