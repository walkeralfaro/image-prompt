# Proposal

## Why

La app funciona pero mantiene marca ajena (Beailabs), tooltips solo-texto poco ilustrativos, un único contexto de trabajo, salida solo en español y sin modo claro. Esto limita reutilización, claridad pedagógica y confort visual. El cambio agrupa 5 mejoras pedidas por el usuario en un solo incremento coherente sin romper el engine de 7 líneas.

## What Changes

- **Desmarca Beailabs (BREAKING visible, no funcional):** elimina toda referencia textual/visual a Beailabs en UI (`Header`, `Footer`, `HomePage`), tokens Tailwind `beailabs-*`, clave persist `beailabs-prompt-store`, título y recomendaciones del Markdown, `package.json` y docs. Nueva marca neutra `Image Prompt · 7 líneas`. Mantiene orden 7 líneas, sufijo `y ningún otro texto` y antiguía fija (texto funcional, sin atribución).
- **Tooltips con imagen:** cada tooltip conserva su texto de ejemplo y añade imagen de ejemplo (`exampleImage`). Fallback con texto solo si la imagen falta o falla. Cobertura en pasos 1-4, 6 y temáticas paso 7; no exigido en opción Personalizada.
- **Multiproyecto:** introduce entidad `Project {id, name, createdAt, updatedAt}` con selector/CRUD en cuestionario/revisión/resultado; el cuestionario activo, `projectName` y guardados quedan anclados a `activeProjectId`. Migra el estado actual (respuesta única + `history`) al proyecto por defecto sin pérdida.
- **Botón "Prompt optimizado" en resultado:** nuevo bloque que entrega el prompt traducido al inglés y optimizado con keywords y parámetros para DALL-E / Midjourney / ChatGPT Images (p. ej. `--ar`, `--style`, quality tags), con copiar independiente. Generación 100% local, sin backend.
- **Tema claro/oscuro:** store `theme: light|dark|system`, toggle en `Header` con iconos Sol/Luna (lucide), persistencia en `localStorage`, respeto a `prefers-color-scheme` en primer arranque y variantes `dark:` en toda la UI.

## Capabilities

### New Capabilities

- `prompt-projects`: gestión de múltiples proyectos de prompts (crear, renombrar, duplicar, eliminar, cambiar activo) y anclaje del cuestionario/historial al proyecto activo.
- `app-theming`: tema claro/oscuro/sistema con toggle en header, persistencia y aplicación global sin romper legibilidad ni tooltips.

### Modified Capabilities

- `prompt-questionnaire`: tooltips con texto + imagen; sustitución de marca en títulos/subtítulos; selector de proyecto activo en el flujo.
- `prompt-engine`: sustitución de marca en documento Markdown; nueva salida EN optimizada para agentes de imagen manteniendo el bloque ES de 7 líneas como fuente.
- `prompt-history`: compatibilidad con `activeProjectId` (filtrado por proyecto, migración del historial existente); sustitución de marca en nombre por defecto y textos.

## Impact

- Afecta `src/components/layout/Header.tsx`, `Footer.tsx`, `src/index.css` (tokens + `dark` variant), `src/components/questionnaire/RecommendationTooltip.tsx`, `OptionCard.tsx`, `TopicMultiSelect.tsx`, `src/data/stepsData.ts`, `antiTropesData.ts`, `src/store/usePromptStore.ts` (+ nuevo `useThemeStore` / `useProjectsStore` o extensión), `src/routes/pages/ResultPage.tsx`, `ReviewPage.tsx`, `QuestionnairePage.tsx`, `src/utils/formatPrompt.ts` (+ `formatPromptEn.ts`), `public/tooltips/*` (nuevos assets), `package.json`, `req.md`, `README.md`.
- Riesgos: migración de `localStorage` (`beailabs-prompt-store` → nueva clave con fallback), peso de imágenes, traducción EN ingenua si el diccionario es corto. Sin cambios de router ni dependencias nuevas salvo assets.
