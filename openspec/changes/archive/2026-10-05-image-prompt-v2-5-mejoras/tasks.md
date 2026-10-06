# Tasks

## 1. Desmarca Beailabs

- [x] 1.1 Renombrar tokens `beailabs-*` → `app-*` en `index.css`, componentes y pages, y verificar con `rg -i beailabs src` sin resultados y `npm run build` en verde
- [x] 1.2 Sustituir textos UI (Header, Footer, HomePage, placeholders) por `Image Prompt · 7 líneas` y verificar recorriendo `/`, `/cuestionario`, `/revision` sin ver `Beailabs`
- [x] 1.3 Migrar clave persist a `image-prompt-store-v2` con fallback de lectura a `beailabs-prompt-store` y verificar recargando con estado viejo que se conserva paso y respuestas
- [x] 1.4 Neutralizar `formatPrompt.generateMarkdownDocument`, `package.json` (`beailabs-scaffold`), `req.md`/`README` y verificar que el `.md` descargado no contiene `Beailabs`

## 2. Tooltips con imagen

- [x] 2.1 Extender modelo a `example: {text, image?}` en `stepsData.ts` y `TOPIC_EXAMPLES` más tipos, y verificar con `tsc --noEmit` sin errores de tipo
- [x] 2.2 Añadir assets `public/tooltips/*.webp` (<50KB, lazy) y mapear cada opción/temática, y verificar abriendo cada tooltip que muestra texto + imagen sin 404
- [x] 2.3 Reescribir `RecommendationTooltip` con `<img alt loading=lazy onError=fallback>` accesible (`aria-describedby`) y verificar con teclado, hover y móvil más lector que anuncia el ejemplo

## 3. Multiproyecto

- [x] 3.1 Crear `useProjectsStore` (`projects`, `activeProjectId`, CRUD con confirmación) y verificar creando/renombrando/duplicando/eliminando con persistencia tras recarga
- [x] 3.2 Anclar cuestionario/historial a `activeProjectId` (borradores por proyecto, `PromptRecord.projectId`, filtro por proyecto + `Ver todos`) y verificar cambiando de proyecto que cada uno conserva pasos y registros
- [x] 3.3 Implementar migración única del estado monolitico al proyecto por defecto y verificar con `localStorage` viejo que aparece migrado sin duplicados ni pérdida

## 4. Prompt optimizado EN en resultado

- [x] 4.1 Crear `formatPromptEn.ts` (`buildOptimizedEn` ES→EN + keywords y flags por target dall-e/midjourney/chatgpt-images, respeta `noText`) y verificar con prompt completo que el EN incluye sujeto/estilo/paleta traducidos y `--ar`/quality tags
- [x] 4.2 Añadir bloque `Prompt optimizado (EN)` en `ResultPage` con selector de target y botón copiar independiente, y verificar copiando EN que el portapapeles trae solo EN y el ES queda intacto
- [x] 4.3 Guardar `promptEnText` opcional en historial y verificar que recargar un registro restaura ambos bloques

## 5. Tema claro/oscuro

- [x] 5.1 Crear `useThemeStore` (`light|dark|system` + `resolved`, persist, init desde `prefers-color-scheme` sin flash) y variante dark Tailwind v4, y verificar recargando que el tema persiste
- [x] 5.2 Añadir toggle Sol/Luna en `Header` (`aria-label`, `aria-pressed`, foco visible) y verificar alternando en móvil y escritorio que icono y tema cambian
- [x] 5.3 Adaptar fondos/tarjetas/tooltips/viewer/historial a ambos temas con contraste AA y verificar revisando cuestionario, revisión, resultado y tooltips con imagen en claro y oscuro sin texto invisible

## 6. Integración y cierre

- [x] 6.1 Ejecutar `npm run build` y `npm run lint`, corregir errores, y verificar build verde sin restos `Beailabs` en `dist` salvo changelog
- [x] 6.2 Recorrido E2E manual (crear 2 proyectos, completar 7 pasos, ver tooltips con imagen, generar ES+EN, alternar tema, recargar, guardar/borrar historial) y verificar que cada spec scenario observado pasa
