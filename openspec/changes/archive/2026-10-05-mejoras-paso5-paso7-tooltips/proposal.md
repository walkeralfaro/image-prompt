# Proposal

## Why

Los usuarios no pueden corregir un texto del paso 5 sin borrarlo y re-crearlo, no existe un camino visible desde el cuestionario al prompt final una vez confirmados los 7 pasos, y las opciones predefinidas no muestran qué ejemplo concreto proponen. Esto genera fricción, errores tipográficos arrastrados al prompt y descubribilidad pobre del resultado.

## What Changes

- Paso 5 editable: cada texto ingresado en `TextListInput` se puede editar inline (editar, guardar con Enter, cancelar con Escape) sin perder orden ni obligar a borrar/re-crear. Valida no-vacío y respeta el modo `Sin texto en la imagen base`.
- Puerta de salida al resultado: en `QuestionnairePage`, finalizado el paso 7 y con los 7 `confirmedSteps` en `true`, se habilita el botón `Ver prompt resultante` que navega directo a `/resultado`. Mientras falte alguna confirmación, el botón permanece deshabilitado con explicación de pasos pendientes.
- Tooltip con ejemplo por opción: cada opción predefinida de cada pregunta (pasos 1-4, 6 y temáticas del paso 7) muestra un tooltip accesible (hover + foco + táctil) con un ejemplo de lo que se propone. Datos vía nuevo campo opcional `example` en `StepOption` y tópicos.

## Capabilities

### New Capabilities

Ninguna. Los tres cambios son comportamiento UI del cuestionario existente y se cubren como deltas de la capacidad actual.

### Modified Capabilities

- `prompt-questionnaire`: cambia requisitos de interacción del paso 5 (edición inline de la lista), navegación de salida (CTA gateado a `/resultado` desde paso 7 con 7/7 confirmados) y presentación de opciones (tooltip con ejemplo por opción predefinida).

## Impact

- Afectado: `src/components/questionnaire/TextListInput.tsx`, `src/components/questionnaire/OptionCard.tsx` (nueva prop `example` + tooltip), `src/data/stepsData.ts` (campo `example?` + contenidos), `src/data/antiTropesData.ts` (ejemplos por tópico), `src/components/questionnaire/TopicMultiSelect.tsx`, `src/components/questionnaire/PaletteBuilder.tsx`, `src/routes/pages/QuestionnairePage.tsx` (CTA + gate).
- No afectado: `src/utils/formatPrompt.ts` (engine, sufijos, antiguía fija), `src/routes/pages/ReviewPage.tsx` y `ResultPage.tsx` (guards existentes se mantienen), `prompt-engine` y `prompt-history`.
- Sin nuevas dependencias; tooltip con CSS/Tailwind + Lucide (`Info`), sin librería externa.
