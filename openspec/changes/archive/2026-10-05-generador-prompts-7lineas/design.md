# Design

## Context

Proyecto greenfield: no hay código, solo `req.md` (fuente Beailabs) y decisiones de explore (TypeScript, Tailwind v4, confirmación explícita, lista dinámica L5, paleta constructora, evita multi, historial local, MVP cuestionario + resultado). Ver `proposal.md` para el porqué. Las reglas de comportamiento están en `specs/*/spec.md`.

## Goals / Non-Goals

**Goals:**
- Scaffold Vite + React + TS mínimo que compile y sirva el flujo 7+1 pasos.
- Un solo engine puro y testeable en `src/utils/formatPrompt.ts`.
- Store Zustand tipado con `persist` que modele respuestas, confirmaciones e historial.
- Guards de ruta basados en `confirmedSteps`, no en valores no vacíos (hay defaults).

**Non-Goals:**
- Catálogo 100+ estilos con buscador/modal (fase 2; MVP usa ~17 de `req.md`).
- Drawer `LivePreview` en tiempo real, `canvas-confetti`, guía extendida (fase 2).
- Backend, auth, i18n, modo claro/oscuro, tests E2E.

## Decisions

**1. Stack fijado: Vite + React 19 + TS + `react-router-dom` v7 + Tailwind v4.**
Por qué: `req.md` pedía v3/v4 ambiguo y el import `react-router-v7` es inválido. Se fija `react-router-dom@7` declarativo (`BrowserRouter/Routes/Route`) y Tailwind v4 (`@import "tailwindcss"` + `@tailwindcss/vite`, sin config). Alternativa descartada: Tailwind v3 con config (contradice decisión A del usuario).

**2. Engine único puro en `src/utils/formatPrompt.ts` (`generateOptimizedPrompt` + `generateMarkdownDocument`).**
Por qué: `req.md` duplicaba `utils/exportMarkdown.js` y `hooks/usePromptGenerator.js`. Una función pura sin dependencias de store facilita escenarios de spec (orden, sufijo, antiguía). Descarga y copiado quedan en `hooks/useCopyToClipboard.ts` y helper de descarga, no en el engine.

**3. Store `usePromptStore.ts` con `persist('beailabs-prompt-store')`: `answers`, `customAnswers`, `textList: string[]`, `selectedTopics: string[]`, `projectName`, `confirmedSteps: boolean[7]`, `history: PromptRecord[]`, `editingId: string | null`.**
Por qué: el store de `req.md` usaba `selectedTopicFilter: 'ninguno'` (single) y no modelaba lista dinámica ni confirmaciones. `getFinalAnswer(field)` se mantiene para `custom` vs predefinida. Alternativa descartada: un topic único (contradice decisión E multi).

**4. Datos como código TS: `stepsData.ts`, `stylesCatalog.ts` (~17 estilos MVP), `antiTropesData.ts` (`Record<Topic, string[]>` con 7 temáticas).**
Por qué: evita fetch y permite tipado; el catálogo completo 100+ queda como extensión de datos sin cambiar componentes.

**5. Rutas con guards en componentes (`RequireConfirmed`): `/` Home, `/cuestionario`, `/revision`, `/resultado`, `*` → `/`.**
Por qué: revisión/resultado leen derivados del store; si `confirmedCount < 7` redirigen a `/cuestionario` con mensaje de pendientes. Navegación libre 1-7 sin validación de contenido (los vacíos usan defaults).

**6. Componentes MVP mínimos: `Layout/Header/Footer`, `StepCard`, `OptionCard`, `CustomInput`, `TextListInput` (L5), `PaletteBuilder` (L6), `TopicMultiSelect` (L7), `ProgressTracker`, `PromptMarkdownViewer`, `CopyButton`, `DownloadMdButton`, `HistoryPanel`.**
Por qué: cubre specs sin sobrediseñar; `StyleCatalogModal`, `LivePreview` drawer y `BestPracticesGuide` extendida quedan fuera.

## Risks / Trade-offs

- [Tailwind v4 sin config rompe snippet de `req.md`] → Mitigación: ignorar `tailwind.config.js`, usar CSS-first y tokens `beailabs-*` vía `@theme`.
- [Clipboard API falla en inseguros/permisos] → Mitigación: `try/catch` con fallback a selección manual + toast de error (spec exige ambos caminos visibles).
- [Comillas y sufijo en L5 con input libre] → Mitigación: normalizar (trim, envolver en comillas si faltan, no duplicar sufijo), caso `sin texto` como rama separada.
- [`persist` + historial crece sin límite] → Mitigación: capar historial (ej. 50) y borrar/vaciar explícitos; sin migraciones de versión en MVP.
- [Adjetivos vacíos como advertencia no bloqueante] → Trade-off consciente: se advierte pero se permite confirmar (mejor UX que bloqueo).

## Migration Plan

Greenfield: sin migración ni rollback de datos. Despliegue como estático Vite (`npm run build` → `dist/`). `localStorage` con clave versionable; si el schema cambia en fase 2, bump de clave `beailabs-prompt-store-v2`.

## Open Questions

- Fuente canónica de los 100+ estilos para fase 2 (¿aportará el usuario PDF/blog o curamos lista?).
- ¿Previsualización de ejemplo por estilo (imágenes) o solo texto en fase 2?
