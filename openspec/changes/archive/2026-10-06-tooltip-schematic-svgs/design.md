# Design

## Context

Ver `proposal.md` (Why) y `specs/prompt-questionnaire/spec.md` (contrato). Estado actual que condiciona el diseño:

- Los 47 ficheros bajo `public/tooltips/` comparten una única plantilla: fondo `#1e1b2e`, rect morado, círculo + 2 barras, y `<text>` con el nombre. Solo cambia el label.
- `RecommendationTooltip.tsx` renderiza la imagen a `w-60` (~240px) desde un fuente `320x180`, con `loading="lazy"`, `alt` derivado del texto y fallback a solo-texto vía `onError`. No hay que tocarlo si las rutas se mantienen.
- `stepsData.ts` fija el mapeo opción → `example` (texto) + `exampleImage` (ruta). Los nombres de archivo están truncados (p. ej. `formato-ej-banner-19201080-con-titular.svg`) pero son estables; renombrar rompería el mapeo.
- Los textos `example` ya describen el motivo a dibujar (p. ej. "diagonales rojas con tipografía inclinada", "historia 1080×1920 con titular arriba y sujeto abajo").

## Goals / Non-Goals

**Goals:**
- 21 esquemas legibles a 240px que distingan cada opción de Formato (proporción) y Estilo (rasgos definitorios) a simple vista.
- Un solo lenguaje visual para los 21, coherente con Lucide (trazo fino redondo) y la paleta dark de la app.
- Cero cambios de código: solo se sobrescriben ficheros SVG.

**Non-Goals:**
- No rediseñar el tooltip, el layout del cuestionario ni el theming.
- No tocar los 26 SVGs restantes (Qué es, Tema, Tipografía, Topics) ni sus textos.
- No introducir dependencias, fuentes web, raster ni peticiones externas en los SVG.

## Decisions

**D1: Esquemas propios dibujados a mano, no iconos de internet.**
Por qué: no existen iconos libres que representen "Swiss vs. Constructivismo vs. De Stijl" o "Knolling"; un icono literal (guitarra, libro) no explica composición. Además se evitan licencias mixtas y estilos de trazo inconsistentes entre 47 fuentes distintas.
Alternativa descartada: packs MIT (Lucide/Tabler/Phosphor) solo para los 7 topics — válida como follow-up, pero no resuelve los 21 priorizados.

**D2: Lenguaje "esquema de composición", no ilustración.**
Cada SVG es un wireframe del layout: marcos de proporción, bloques de titular/sujeto, retículas, gestos de color. Sin escenas realistas ni sombras. A 240px un wireframe se lee; una mini-ilustración detallada se vuelve ruido.
Estructura común: `<svg viewBox="0 0 320 180">` + fondo propio redondeado (`rx=12`) + 3–7 primitivas (rect/circle/line/path) + como máximo 1–2 marcas de texto geométricas (líneas que sugieren tipografía, no palabras reales).

**D3: Trazo estilo Lucide + color plano del estilo representado.**
Trazo ~2px, `stroke-linecap/join round`, sobre fondo oscuro propio para que funcione en light y dark sin depender del tema. El color de acento sale de la opción (p. ej. primarios Bauhaus sobre crema, rosa/azul superpuestos en Riso, dorado geométrico en Secesión), no de la paleta genérica morada actual.
Alternativa descartada: monocromo total — pierde la mitad de la señal distintiva entre movimientos.

**D4: Motivos fijos por grupo (el texto `example` es la spec visual).**
- Formato (4): mismo "contenido" (titular + sujeto + aire) en 4 marcos con la proporción real centrada en el lienzo 320x180: 4:5 alto centrado, 9:16 estrecho y alto, 1:1 cuadrado, 16:9 apaisado a sangre.
- Estilo (17): un gesto por opción — Swiss: retícula + titular Helvética + bloque rojo; Constructivismo: diagonales rojas + tipo inclinada; Bauhaus: círculos/barras primarias sobre crema; Art Nouveau: orlas florales + letra ondulada dorada; De Stijl: bloques rojo/azul/amarillo + líneas negras; Memphis: zigzags pastel + tipo playful; Brutalismo: bloque negro + letra blanca cruda; Editorial: serif grande + aire; Secesión: marco dorado geométrico + letra alta; Arts&Crafts: bordes vegetales + letra artesanal; Ukiyo-e: olas planas + sol rojo; WPA: cartel serigráfico + atardecer degradado en franjas; HipHop80s: letras gruesas con borde sobre foto (bloque); Viaje clásico: tren+montaña + banda inferior; Riso: tramas granuladas rosa/azul superpuestas; Zine: recortes rasgados + cinta; Pixel+Deco: arcos dorados pixelados sobre negro.

**D5: Autoría manual con plantilla compartida y validación visual.**
Un esqueleto común (fondo, radio, viewBox, grosor) copiado en los 21; cada motivo se dibuja a mano con primitivas. Validación: abrir cada SVG a 240px y a 320px, checklist "¿se distingue de sus hermanos sin leer el label?". Sin tooling nuevo.

## Risks / Trade-offs

- [Varianza entre 21 dibujos a mano] → Mitigación: esqueleto único, revisión comparativa por grupo (los 4 formatos juntos, los 17 estilos en rejilla) antes de cerrar.
- [Nombres de archivo truncados confunden] → Mitigación: no renombrar; el mapeo vive en `stepsData.ts` y ya es correcto.
- [Texto real dentro del SVG (i18n, fuentes)] → Mitigación: prohibido salvo marcas geométricas; el texto explicativo ya lo pone el tooltip fuera de la imagen.
- [Contraste en tema claro/oscuro] → Mitigación: cada SVG lleva su propio fondo opaco; no usa `currentColor` del tema.
- [Peso/complejidad] → Mitigación: límite práctico ~5KB y <50 nodos por archivo; sin filtros, sin `<image>`, sin fuentes.

## Migration Plan

1. Sobrescribir los 21 ficheros en `public/tooltips/` (mismas rutas).
2. Verificar: `vite build`, abrir `/cuestionario` pasos 1 y 4, hover/foco en cada tooltip, comprobar imagen + texto + `alt`; forzar un 404 de imagen para confirmar que el fallback textual sigue intacto.
3. Rollback: revert de los 21 ficheros (cambio puramente de assets, sin migraciones ni estado).
