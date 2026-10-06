# Spec Delta

## ADDED Requirements

### Requirement: Edición inline de textos del paso 5
El sistema SHALL permitir editar cada texto de la lista del paso 5 sin borrarlo, conservando su posición hasta guardar.

#### Scenario: Editar un texto existente
- **WHEN** el usuario pulsa Editar en un ítem de la lista del paso 5 y confirma con Enter o Guardar
- **THEN** el sistema actualiza ese ítem en `textList`, mantiene el orden y refleja el cambio en la vista previa

#### Scenario: Cancelar edición conserva el valor
- **WHEN** el usuario pulsa Escape o Cancelar durante la edición
- **THEN** el sistema descarta el borrador y conserva el texto original sin reordenar

#### Scenario: Edición vacía queda bloqueada
- **WHEN** el usuario intenta guardar un texto vacío o solo espacios
- **THEN** el sistema rechaza el guardado y mantiene el valor anterior con indicación visible

#### Scenario: Modo sin texto oculta la lista
- **WHEN** el modo `Sin texto en la imagen base` está activo
- **THEN** el sistema oculta la lista y sus acciones de edición hasta desactivarlo

### Requirement: Botón gateado a resultado desde el paso 7
El sistema SHALL exponer en el cuestionario un botón `Ver prompt resultante` que navega directo a `/resultado` solo con 7/7 pasos confirmados.

#### Scenario: Botón habilitado con todo confirmado en paso 7
- **WHEN** el usuario está en el paso 7 y los 7 pasos están confirmados
- **THEN** el sistema habilita el botón y al pulsarlo navega directo a `/resultado`

#### Scenario: Botón deshabilitado con pasos pendientes
- **WHEN** falta al menos una confirmación de los 7 pasos
- **THEN** el sistema muestra el botón deshabilitado con el conteo de pasos pendientes

#### Scenario: Guard de resultado sigue vigente
- **WHEN** el usuario visita `/resultado` sin 7/7 confirmados
- **THEN** el sistema lo devuelve a `/cuestionario` e indica los pasos pendientes

### Requirement: Tooltip con ejemplo por opción predefinida
El sistema SHALL mostrar junto a cada opción predefinida de cada pregunta un tooltip accesible con un ejemplo de lo propuesto.

#### Scenario: Ver ejemplo de una opción
- **WHEN** el usuario enfoca o pasa el cursor sobre el indicador de ayuda de una opción
- **THEN** el sistema muestra un tooltip con un ejemplo corto de esa opción sin tapar la selección

#### Scenario: Tooltip usable con teclado y táctil
- **WHEN** el usuario navega con teclado o toca el indicador en móvil
- **THEN** el sistema muestra y oculta el tooltip de forma operable y lo expone vía `aria-describedby`

#### Scenario: Cobertura en pasos y temáticas
- **WHEN** el usuario abre los pasos 1-4, 6 y las temáticas del paso 7
- **THEN** cada opción predefinida visible ofrece su tooltip con ejemplo, sin exigirlo en la opción Personalizada
