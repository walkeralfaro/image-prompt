# Tasks

## 1. Esqueleto y base verificable

- [x] 1.1 Crear el esqueleto SVG común (viewBox 320x180, fondo propio rx=12, trazo 2px round) y verificar que un archivo de prueba parsea como SVG, no referencia recursos externos y pesa <5KB
- [x] 1.2 Definir la checklist de revisión por esquema (proporción/motivo correcto, distinguible de sus hermanos a 240px sin leer el label, <50 nodos, sin texto real ni fuentes) y verificar que está guardada junto al change

## 2. Formato — 4 esquemas de proporción

- [x] 2.1 Dibujar `formato-ej-cartel-10801350-con-sujeto-.svg` (marco 4:5 centrado, sujeto + aire superior) y verificar que a 240px se distingue del resto de formatos y pasa la checklist
- [x] 2.2 Dibujar `formato-ej-historia-10801920-con-titul.svg` (marco 9:16 estrecho, titular arriba y sujeto abajo) y verificar que a 240px se distingue del resto y pasa la checklist
- [x] 2.3 Dibujar `formato-ej-post-10801080-con-sujeto-ce.svg` (marco 1:1 cuadrado, sujeto centrado y marco libre) y verificar que a 240px se distingue del resto y pasa la checklist
- [x] 2.4 Dibujar `formato-ej-banner-19201080-con-titular.svg` (marco 16:9 apaisado, titular a la izquierda) y verificar que a 240px se distingue del resto y pasa la checklist, con los 4 formatos revisados juntos en rejilla

## 3. Estilo — 10 movimientos

- [x] 3.1 Dibujar Swiss (`retícula-sobria`) y Constructivismo (`diagonales-rojas`) y verificar que ambos pasan la checklist y no se confunden entre sí a 240px
- [x] 3.2 Dibujar Bauhaus (`círculos-y-barras-primarias`) y De Stijl (`bloques-rojoazulamarillo`) y verificar que ambos pasan la checklist y sus paletas/geometrías se distinguen a 240px
- [x] 3.3 Dibujar Art Nouveau (`orlas-florales`) y Arts and Crafts (`bordes-vegetales`) y verificar que ambos pasan la checklist y sus ornamentos se distinguen (dorado ondulado frente a vegetal artesanal)
- [x] 3.4 Dibujar Memphis (`zigzags-pastel`), Brutalismo (`bloque-negro-macizo`) y Editorial (`portada-limpia`) y verificar que los tres pasan la checklist y se distinguen a 240px
- [x] 3.5 Dibujar Secesión Vienesa (`marco-dorado-geométrico`) y verificar que pasa la checklist y se distingue de Art Nouveau a 240px

## 4. Estilo — 4 tradiciones + 3 técnicas

- [x] 4.1 Dibujar Ukiyo-e (`olas-planas-y-sol-rojo`), WPA (`cartel-serigráfico`) y verificar que ambos pasan la checklist y se distinguen a 240px
- [x] 4.2 Dibujar Flyer Hip Hop (`letras-gruesas`) y Cartel de viaje (`tren-montaña`) y verificar que ambos pasan la checklist y se distinguen a 240px
- [x] 4.3 Dibujar Risografía (`tramas-granuladas`), Zine (`recortes-rasgados`) y Pixel+Deco (`arcos-dorados-en-píxeles`) y verificar que los tres pasan la checklist y sus texturas/técnicas se distinguen a 240px, con los 17 estilos revisados juntos en rejilla

## 5. Verificación e integración

- [x] 5.1 Ejecutar `npm run build` y abrir `/cuestionario` pasos 1 y 4 para verificar que los 21 tooltips muestran imagen + texto con `alt` correcto y sin cambios en `stepsData.ts` ni `RecommendationTooltip.tsx`
- [x] 5.2 Verificar el fallback provocando un 404 de imagen y confirmar que el tooltip muestra solo el texto sin romper el layout, y que Qué es / Tema / Tipografía / Topics siguen sin regresiones
