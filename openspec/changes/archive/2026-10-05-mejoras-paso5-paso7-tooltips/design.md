# Design

## Context

Ver `proposal.md` para motivación. Estado actual: `TextListInput.tsx` solo añade/borra/reordena (`textList` en `usePromptStore` vía `setTextList`); `QuestionnairePage.tsx` no tiene CTA a resultado (solo Anterior/Siguiente/Confirmar); `OptionCard.tsx` muestra `label+description` sin ayuda contextual; `stepsData.ts` no tiene campo de ejemplo y los pasos 2/5/7 carecen de descripciones sistemáticas. Los guards de `/revision` y `/resultado` ya exigen 7/7 `confirmedSteps`.

## Goals / Non-Goals

**Goals:**
- Edición inline del paso 5 sin pérdida de orden y compatible con `noText`.
- CTA visible y gateado a `/resultado` directo (decisión de usuario), reutilizando `confirmedSteps`.
- Sistema de tooltip reutilizable alimentado por datos (`example?`), accesible y sin nuevas dependencias.

**Non-Goals:**
- Cambios al engine (`formatPrompt.ts`), sufijos, antiguía fija o defaults.
- Rediseño del catálogo de estilos o del flujo revisión/resultado.
- Persistencia nueva o i18n.

## Decisions

- **Edición inline con `editingIndex + editDraft` local en `TextListInput`:** estado local, commit inmutable vía `setTextList(next)`. Alternativa (editar en `ReviewPage` solamente) descartada: el usuario pidió explícitamente edición en el cuestionario.
- **CTA en `QuestionnairePage` con `Link to="/resultado"`:** `allConfirmed = confirmedSteps.every(Boolean)`; habilitado solo si `currentStep === 7 && allConfirmed`, si no deshabilitado con texto `Te faltan N: ...`. Alternativa (ir a `/revision`) descartada por decisión de usuario (directo a resultado). El guard de `ResultPage` queda como red de seguridad.
- **Tooltip como extensión de `OptionCard` (`example?` prop) + componente `RecommendationTooltip`:** CSS/Tailwind `group-hover` + `focus-within`, `role="tooltip"`, icono `Info` de Lucide. Alternativa (librería Radix/Headless) descartada: sobrecarga innecesaria para texto corto.
- **Datos: `StepOption.example?: string` + ejemplos por tópico:** poblar ~30 opciones y 7 tópicos de `antiTropesData.ts`. Alternativa (hardcodear en JSX) descartada: duplica contenido y rompe `PaletteBuilder`/`TopicMultiSelect` que ya leen `stepsData`.

## Risks / Trade-offs

- [Contenido de ejemplos largo o inconsistente] → Mitigación: ejemplos de 1 línea, tono Beailabs, revisión en `ReviewPage` diff antes de merge.
- [Tooltip tapa la card en móvil] → Mitigación: posicionamiento `bottom/full-width` en `sm`, cierre al perder foco o segundo tap.
- [Edición concurrente con `noText`] → Mitigación: al activar `noText` se cancela `editingIndex` y se oculta la lista; el engine ya ignora `textList` en ese modo.
- [CTA descubierto por navegación directa] → Mitigación: sin cambio; `ResultPage`/`ReviewPage` siguen redirigiendo con mensaje de pendientes.

## Migration Plan

Sin migración: cambio UI retrocompatible, estado Zustand sin versionado nuevo. Rollback: revertir los 3 componentes + datos. Despliegue: `tsc -b && vite build` y prueba manual 1→7 + edición paso 5 + tooltip + CTA.

## Open Questions

Ninguna bloqueante. Detalle menor diferible: si el CTA debe mostrarse deshabilitado en pasos 1-6 o solo aparecer en paso 7 — default: visible siempre, habilitado solo en paso 7 con 7/7.
