# Spec Delta

## MODIFIED Requirements

### Requirement: Tooltip con ejemplo por opción predefinida
El sistema SHALL mostrar junto a cada opción predefinida de cada pregunta un tooltip accesible con texto de ejemplo más imagen de ejemplo de lo propuesto. En Formato y Estilo la imagen SHALL ser un esquema de composición propio y representativo de la opción, nunca un placeholder genérico repetido.

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

#### Scenario: Esquema de formato muestra la proporción
- **WHEN** el usuario abre el tooltip de una opción de Formato (4:5, 9:16, 1:1, 16:9)
- **THEN** la imagen muestra un esquema con la proporción correcta y la distribución descrita en el texto (titular/sujeto/aire), distinguible de las otras tres a simple vista

#### Scenario: Esquema de estilo distingue el movimiento
- **WHEN** el usuario abre el tooltip de una opción de Estilo (p. ej. Bauhaus frente a Swiss frente a Ukiyo-e)
- **THEN** la imagen muestra los rasgos definitorios del estilo (retícula/geometría/paleta/gesto tipográfico según el caso) y no repite una plantilla genérica común a varios estilos

#### Scenario: Sin placeholders genéricos en formato y estilo
- **WHEN** se revisan los 21 ficheros de `public/tooltips/formato-ej-*.svg` y `public/tooltips/estilo-ej-*.svg`
- **THEN** ninguno es un rectángulo genérico idéntico con solo cambio de label; cada uno representa visualmente su opción

## ADDED Requirements

### Requirement: Formato técnico de los esquemas de tooltip
El sistema SHALL servir cada esquema como SVG válido con viewBox 320x180, sin imágenes raster embebidas ni fuentes externas, y con peso que no degrade la apertura del tooltip.

#### Scenario: SVG válido y ligero
- **WHEN** el navegador carga cualquier esquema de Formato o Estilo
- **THEN** el archivo parsea como SVG, respeta el viewBox 320x180, no hace peticiones externas y abre dentro del tooltip existente sin cambiar su layout

#### Scenario: Rutas estables sin cambio de código
- **WHEN** se despliega el change con los 21 esquemas
- **THEN** `stepsData.ts` y `RecommendationTooltip.tsx` siguen referenciando las mismas rutas `/tooltips/*.svg` sin modificaciones

#### Scenario: Resto de grupos fuera de alcance
- **WHEN** el usuario abre tooltips de Qué es, Tema, Tipografía o Topics del paso 7
- **THEN** el comportamiento actual (texto + placeholder o fallback textual) se mantiene sin regresiones
