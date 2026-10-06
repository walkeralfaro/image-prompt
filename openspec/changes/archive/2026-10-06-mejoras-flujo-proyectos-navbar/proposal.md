# Proposal

## Why

El cuestionario exige confirmación explícita por paso pero no permite revertirla desde la UI (existe `unconfirmStep` en el store sin exponer), los proyectos solo se gestionan desde `/cuestionario` aunque el historial ya vive en `/`, y el navbar (`Header.tsx` con `Link`) no indica la página activa. Esto genera fricción: errores de confirmación bloquean el avance, el inicio no es punto de gestión de proyectos y el usuario se desorienta al navegar.

## What Changes

- Botón de confirmación pasa a ser toggle Confirmar / Desconfirmar por paso: si el paso está confirmado muestra estado verde y permite desconfirmar (revierte `confirmedSteps[i]` a `false` vía `unconfirmStep`); desconfirmar vuelve a bloquear `/revision`, `/resultado` y el CTA `Ver prompt resultante` según reglas existentes.
- Vista de inicio (`HomePage`) integra gestión de proyectos: renderiza el selector de proyecto activo (reutiliza `ProjectSwitcher`) sincronizado con el mismo `useProjectsStore` + borradores de `usePromptStore`, manteniendo el `HistoryPanel` filtrado por proyecto ya existente.
- Navbar resalta la página activa: migrar enlaces de `Link` a `NavLink` (React Router v7) con estilo activo — color de acento (`text-app-accent`) + negrita (`font-bold`) + `aria-current="page"` — para `/`, `/cuestionario`, `/revision`, `/resultado`.

## Capabilities

### New Capabilities

Ninguna — se reutilizan capacidades existentes.

### Modified Capabilities

- `prompt-questionnaire`: la confirmación por paso se vuelve reversible (desconfirmar) y la navegación por rutas gana indicación visual de página activa en el navbar.
- `prompt-projects`: el cambio de proyecto activo y su contexto (borrador + historial filtrado) se extiende a la vista de inicio `/`, además de cuestionario/revisión/resultado.

## Impact

- Afecta `src/components/layout/Header.tsx` (nav a `NavLink` + estilos activos y accesibilidad), `src/routes/pages/QuestionnairePage.tsx` (botón toggle confirm/desconfirm), `src/routes/pages/HomePage.tsx` (integración `ProjectSwitcher`).
- Reutiliza `usePromptStore.confirmStep/unconfirmStep` y `useProjectsStore` + `saveDraftForProject/loadDraftForProject`; sin cambios de persistencia ni nuevas dependencias.
- Sin cambios en el engine de prompts, rutas ni criterios de gateo (7/7 confirmados para resultado).
