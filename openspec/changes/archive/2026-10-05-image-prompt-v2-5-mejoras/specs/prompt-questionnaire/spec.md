# Spec Delta

## MODIFIED Requirements

### Requirement: Tooltip con ejemplo por opción predefinida
El sistema SHALL mostrar junto a cada opción predefinida de cada pregunta un tooltip accesible con texto de ejemplo más imagen de ejemplo de lo propuesto.

#### Scenario: Ver ejemplo de una opción
- **WHEN** el usuario enfoca o pasa el cursor sobre el indicador de ayuda de una opción
- **THEN** el sistema muestra un tooltip con texto corto de ejemplo más imagen ilustrativa sin tapar la selección

#### Scenario: Tooltip usable con teclado y táctil
- **WHEN** el usuario navega con teclado o toca el indicador en móvil
- **THEN** el sistema muestra y oculta el tooltip con texto e imagen de forma operable y lo expone vía `aria-describedby`

#### Scenario: Cobertura en pasos y temáticas
- **WHEN** el usuario abre los pasos 1-4, 6 y las temáticas del paso 7
- **THEN** cada opción predefinida visible ofrece su tooltip con texto e imagen, sin exigirlo en la opción Personalizada

#### Scenario: Imagen ausente con fallback textual
- **WHEN** una opción no tiene imagen registrada o la imagen falla al cargar
- **THEN** el sistema muestra solo el texto de ejemplo sin romper el layout ni mostrar icono roto

#### Scenario: Imagen con alternativa accesible
- **WHEN** el tooltip incluye imagen
- **THEN** la imagen expone `alt` descriptivo derivado del ejemplo y carga diferida sin bloquear la apertura del tooltip

## ADDED Requirements

### Requirement: Selector de proyecto activo en el flujo
El sistema SHALL mostrar el proyecto activo y permitir cambiarlo desde cuestionario y revisión sin perder confirmaciones del proyecto actual.

#### Scenario: Cambiar proyecto desde cuestionario
- **WHEN** el usuario cambia de proyecto en el paso 4 con 2 pasos confirmados
- **THEN** el nuevo proyecto muestra su propio paso y confirmaciones, y al volver se restauran los 2 confirmados

### Requirement: Interfaz sin referencias a Beailabs
El sistema SHALL no mostrar la cadena `Beailabs` (cualquier capitalización) en títulos, subtítulos, header, footer, landing ni placeholders del cuestionario.

#### Scenario: Cuestionario sin marca ajena
- **WHEN** el usuario recorre inicio, cuestionario y revisión
- **THEN** ningún texto visible contiene `Beailabs` y la marca mostrada es `Image Prompt · 7 líneas` o equivalente neutro
