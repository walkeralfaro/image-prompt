# Design

## Context

- `Header.tsx` usa `Link` sin estado activo; estilos base `hover:text-app-cream`. Rutas: `/`, `/cuestionario`, `/revision`, `/resultado` (`AppRoutes.tsx`).
- `QuestionnairePage.tsx` (botón confirm) solo llama `confirmStep`; `confirmed` solo alterna color/texto. El store (`usePromptStore.ts`) ya expone `confirmStep`/`unconfirmStep` sobre `confirmedSteps: boolean[7]`; el gateo a resultado deriva de `allConfirmed`.
- `HomePage.tsx` solo monta `HistoryPanel` (filtrado por proyecto); `ProjectSwitcher.tsx` solo montado en cuestionario y ya resuelve `ensureDefault` + migración legacy + `saveDraftForProject/loadDraftForProject`.
- Utilidad `cn()` disponible (`utils/cn.ts`) para clases condicionales; React Router v7 disponible (`react-router-dom`).

## Goals / Non-Goals

**Goals:**
- Toggle confirmar/desconfirmar reutilizando el estado existente sin cambiar persistencia ni gateo.
- `ProjectSwitcher` visible en `/` compartiendo los mismos stores, sin divergencia de borradores.
- Enlace activo del navbar derivado del router con color + negrita + `aria-current`.

**Non-Goals:**
- Cambios en el engine de prompts, defaults, rutas o criterios 7/7.
- Nuevo CRUD de proyectos propio de Home ni migración de persistencia.
- Rediseño visual del header o del flujo de pasos.

## Decisions

- **Navbar con `NavLink` + `cn()`**: migrar los 4 enlaces a `NavLink` con `className={({ isActive }) => cn(base, isActive && "text-app-accent font-bold")}`; `end` solo en `/`. Alternativa descartada: estado manual de ruta activa (se desincroniza; el router ya lo expone, incluyendo `aria-current="page"`).
- **Toggle sobre el botón existente**: si `confirmed` → `unconfirmStep(i)`, si no → `confirmStep(i)`; añadir `aria-pressed={confirmed}` y ajustar texto/title ("Desconfirmar paso" cuando está confirmado). Alternativa descartada: botón separado de "desconfirmar" (duplica controles y confunde; el toggle conserva layout y es reversible en un gesto).
- **Reutilizar `ProjectSwitcher` en `HomePage`**: importarlo tal cual encima del historial; el `useEffect` de `ensureDefault`/migración es idempotente (`migrated` flag) y no se duplica estado. Alternativa descartada: selector propio en Home (diverge reglas de crear/renombrar/duplicar/eliminar y manejo de borradores).

## Risks / Trade-offs

- [Doble montaje de `ProjectSwitcher` en `/` y `/cuestionario`] → Ambos leen los mismos stores; el efecto de init corre una vez por montaje pero es idempotente; verificar que no parpadee "Cargando proyectos…".
- [`NavLink` parcial en `/` marcando activo en subrutas] → Mitigación: prop `end` en el enlace de Inicio.
- [Texto del botón toggle ambiguo] → Mitigación: cuando está confirmado mostrar acción siguiente ("Desconfirmar") en title/texto, manteniendo el ✓ verde como estado.

## Migration Plan

Sin migración: sin cambios de schema de persistencia, claves de storage ni rutas. Rollback = revertir los 3 archivos de UI.

## Open Questions

Ninguna que afecte specs, enfoque o tareas.
