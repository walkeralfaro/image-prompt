# Tasks

## 1. Navbar con página activa

- [x] 1.1 Migrar los 4 enlaces de `Header.tsx` de `Link` a `NavLink` con clase activa (`text-app-accent font-bold` vía `cn()`), `end` en `/`, y verificar visualmente que solo el enlace de la ruta actual se resalta en las 4 rutas
- [x] 1.2 Verificar accesibilidad del enlace activo (`aria-current="page"` presente en el enlace resaltado) inspeccionando el DOM en `/` y `/cuestionario`

## 2. Desconfirmar paso en cuestionario

- [x] 2.1 Convertir el botón de confirmación en `QuestionnairePage.tsx` en toggle (confirmado → `unconfirmStep(i)`, no confirmado → `confirmStep(i)`) con `aria-pressed` y texto/title de "Desconfirmar", y verificar que pulsar desconfirmar revierte `confirmedSteps[i]` y actualiza el conteo de pendientes
- [x] 2.2 Verificar que desconfirmar re-bloquea el avance (CTA `Ver prompt resultante` deshabilitado con pendientes y guards de `/revision`/`/resultado` según regla 7/7) navegando tras desconfirmar un paso

## 3. Proyectos en vista de inicio

- [x] 3.1 Renderizar `ProjectSwitcher` en `HomePage.tsx` sobre el historial reutilizando los stores existentes, y verificar que cambiar/crear/renombrar/duplicar/eliminar desde `/` aplica las mismas reglas y filtra el historial al proyecto activo
- [x] 3.2 Verificar persistencia de borradores al alternar proyectos desde inicio (responder en proyecto A, cambiar a B desde `/`, volver a A y confirmar respuestas y confirmaciones intactas)

## 4. Verificación integrada

- [x] 4.1 Ejecutar `npm run build` y `npm run lint` y verificar que ambos pasan sin errores
- [x] 4.2 Recorrido manual completo (confirmar → desconfirmar → re-bloqueo, gestión de proyectos desde inicio, resaltado único por ruta) y verificar los 4 escenarios de las specs delta
