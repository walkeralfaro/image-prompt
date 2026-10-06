# Tasks

## 1. Scaffold Vite + TS + Tailwind v4 + Router

- [x] 1.1 Crear proyecto Vite React-TS, instalar `react-router-dom@7`, `zustand`, `lucide-react`, `clsx`, `tailwind-merge`, `@tailwindcss/vite` y verificar con `npm run build` que compila sin errores
- [x] 1.2 Configurar Tailwind v4 (plugin en `vite.config.ts`, `@import "tailwindcss"` y tokens `beailabs-*` en CSS) y verificar visualmente que clases `bg-beailabs-*` aplican en Home
- [x] 1.3 Crear `AppRoutes.tsx` con `BrowserRouter/Routes/Route` para `/`, `/cuestionario`, `/revision`, `/resultado`, `*→/` y verificar que ruta inexistente redirige a `/`

## 2. Datos, store y engine

- [x] 2.1 Crear `src/data/stepsData.ts`, `stylesCatalog.ts` (~17 estilos MVP), `antiTropesData.ts` (7 temáticas) y verificar que cada paso 1-4/6/7 renderiza sus opciones mínimas desde datos
- [x] 2.2 Implementar `src/store/usePromptStore.ts` (answers, customAnswers, textList, selectedTopics, projectName, confirmedSteps[7], history, editingId + acciones + `persist`) y verificar con recarga que el estado persiste en `localStorage`
- [x] 2.3 Implementar `src/utils/formatPrompt.ts` (`generateOptimizedPrompt` con orden 7 líneas, defaults, sufijo L5, antiguía fija L7, merge multi-tópico; `generateMarkdownDocument`) y verificar con casos L5 dos textos, L5 sin texto y L7 multitópico que la salida coincide con specs
- [x] 2.4 Implementar `src/hooks/useCopyToClipboard.ts` con fallback y toast éxito/error y verificar que copiar pega las 7 líneas en texto plano

## 3. Cuestionario 1-7

- [x] 3.1 Crear `Layout/Header/Footer`, `StepCard`, `OptionCard`, `CustomInput`, `ProgressTracker` y verificar que cada paso muestra predefinidas + personalizada y el progreso 1/7..7/7
- [x] 3.2 Crear `TextListInput` (L5 añadir/quitar/reordenar + modo sin texto) y verificar que dos textos generan `"a", "b" y ningún otro texto` sin duplicar sufijo
- [x] 3.3 Crear `PaletteBuilder` (L6 predefinidas + constructora tipografía + 2-3 colores) y verificar que una paleta custom aparece tal cual en la línea 6
- [x] 3.4 Crear `TopicMultiSelect` (L7 checkboxes multi + texto libre) y verificar que Arte+Tech+texto libre se combinan antes de la antiguía fija
- [x] 3.5 Añadir advertencia de adjetivos vacíos (`bonito/moderno/profesional/impactante`) sin bloquear y verificar que el aviso aparece y permite confirmar igual
- [x] 3.6 Implementar botón Confirmar por paso + navegación libre + guard de `confirmedSteps` y verificar que sin 7 confirmados `/revision` redirige a `/cuestionario` indicando pendientes

## 4. Revisión, resultado y exportación

- [x] 4.1 Crear `ReviewPage` (resumen 7 líneas editable, `projectName` con default `Proyecto Gráfico`, editar invalida confirmación del paso) y verificar que editar L4 desconfirma el paso 4 y actualiza la vista previa
- [x] 4.2 Crear `ResultPage` + `PromptMarkdownViewer` + `CopyButton` + `DownloadMdButton` (`prompt_cartel_7_lineas.md` UTF-8) y verificar que la descarga contiene proyecto, bloque ```text y guía mínima Beailabs

## 5. Historial local

- [x] 5.1 Crear `HistoryPanel` (listar con proyecto/fecha/preview + vacío explícito, guardar con snapshot, borrar uno/vaciar con confirmación) y verificar que tras recarga el historial persiste y borrar persiste
- [x] 5.2 Implementar cargar-para-editar (restaura valores, marca 7 confirmados, `editingId`; guardar actualiza mismo `id`) y verificar que editar Tema y guardar no duplica el registro

## 6. Integración MVP

- [x] 6.1 Recorrer flujo completo Home→7 pasos→revisión→resultado→guardar→recargar desde historial y verificar que `npm run build` + `npx tsc --noEmit` pasan y el flujo no muestra errores en consola
