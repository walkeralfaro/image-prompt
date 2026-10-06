# Checklist de revisión — esquemas de tooltip (21)

Esqueleto común: `<svg viewBox="0 0 320 180" width="320" height="180" role="img" aria-label="...">`
+ fondo propio opaco redondeado + 3–15 primitivas, trazo ~2px round donde aplique.

Por cada esquema, verificar:

- [ ] Proporción/motivo correcto según su `example` en `stepsData.ts`
- [ ] Distinguible de sus hermanos a 240px sin leer el label
- [ ] `<50` nodos, `<5KB`, sin `<text>`, `<image>`, `<style>` ni fuentes externas
- [ ] Sin referencias externas (`http`, `xlink:href` externo, `@import`)
- [ ] `aria-label` propio y descriptivo
- [ ] Rutas y nombres sin cambios

Grupos: Formato 4 (rejilla conjunta) · Estilo movimientos 10 · Estilo tradiciones/técnicas 7 (rejilla conjunta de 17).
