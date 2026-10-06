# Proposal

## Why

Crear carteles e infografías con IA generativa produce resultados genéricos ("cara de IA": brochazos, pan de oro, destellos, lemas inventados) porque los prompts son vagos y sin estructura. El método Beailabs de 7 líneas resuelve esto con orden estricto y anti-guías, pero es manual y propenso a errores. Una app web guiada lo hace repetible.

## What Changes

- Nueva app web Vite + React + TypeScript que guía por 7 pasos (Formato, Qué es, Tema, Estilo, Texto exacto, Tipografía y paleta, Evita) + paso 8 de revisión + pantalla de resultado.
- Cada paso ofrece opciones predefinidas + entrada personalizada libre, con botón explícito "Confirmar paso" (visto bueno). Navegación libre entre pasos; pasos no confirmados usan defaults del engine.
- Engine de prompts que genera el bloque estricto de 7 líneas con reglas Beailabs: sufijo `y ningún otro texto` en línea 5, antiguía fija en línea 7, prohibición de adjetivos vacíos.
- Línea 5 como lista dinámica de textos; línea 6 con paletas predefinidas + constructor personalizado (tipografía + 2-3 colores); línea 7 multi-select por temáticas + texto libre.
- Pantalla de resultado con prompt plano de 7 líneas, copiar al portapapeles y descargar `prompt_cartel_7_lineas.md` con guía de uso.
- Historial local persistente (localStorage vía Zustand persist): guardar, listar, recargar al cuestionario, borrar y editar.
- MVP consciente: SIN catálogo visual de 100+ estilos con buscador, SIN drawer LivePreview en tiempo real, SIN `canvas-confetti`, SIN guía extendida de buenas prácticas (solo guía mínima en el .md).

## Capabilities

### New Capabilities
- `prompt-questionnaire`: flujo del cuestionario 7+1 pasos, navegación libre, confirmación explícita por paso, defaults, revisión editable.
- `prompt-engine`: construcción del prompt de 7 líneas con reglas Beailabs, lista dinámica de textos, paletas, anti-tópicos multi-temática, generación del documento Markdown y exportación (copiar + descargar).
- `prompt-history`: persistencia local del cuestionario actual e historial de prompts (guardar, listar, cargar, borrar, editar).

### Modified Capabilities
- Ninguna (proyecto greenfield, `openspec/specs/` vacío).

## Impact

- Nuevo proyecto greenfield bajo `/` (fuera de `openspec/`): `src/`, `index.html`, `package.json`, `vite.config.ts`, estilos Tailwind v4.
- Stack: React 19 + TypeScript + `react-router-dom` v7 (declarativo), Tailwind v4 (`@import "tailwindcss"` + `@tailwindcss/vite`, sin `tailwind.config.js`), Zustand + `persist`, `lucide-react`, `clsx` + `tailwind-merge`.
- Sin backend, sin APIs externas, sin autenticación. Solo `localStorage`.
- Riesgos conocidos de `req.md` que esta propuesta corrige: import `react-router-v7` inválido → `react-router-dom`; `tailwind.config.js` descartado (v4); `utils/formatPrompt.ts` como única fuente del engine (descarta duplicado `exportMarkdown.js` / hook).
