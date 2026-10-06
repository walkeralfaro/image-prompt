# Prompt Questionnaire Specification

## Purpose

Guiar al usuario paso a paso en la captura de los 7 parámetros del método Beailabs, con navegación libre, confirmación explícita y revisión final antes del resultado.

## Requirements

### Requirement: Navegación por rutas del flujo
El sistema SHALL exponer las rutas `/`, `/cuestionario`, `/revision` y `/resultado` con redirección a `/` ante ruta desconocida, e indicar la ruta activa en el navbar con color de acento, negrita y `aria-current="page"`.

#### Scenario: Ruta desconocida redirige a inicio
- **WHEN** el usuario visita `/ruta-inexistente`
- **THEN** el sistema redirige a `/` sin error

#### Scenario: Acceso directo a cuestionario
- **WHEN** el usuario visita `/cuestionario`
- **THEN** el sistema muestra el paso actual persistido (por defecto paso 1)

#### Scenario: Página activa resaltada en el navbar
- **WHEN** el usuario visita `/`, `/cuestionario`, `/revision` o `/resultado`
- **THEN** solo el enlace correspondiente muestra color de acento y negrita con `aria-current="page"`

#### Scenario: Resaltado sigue a la navegación
- **WHEN** el usuario cambia de ruta dentro del flujo
- **THEN** el resaltado se mueve al nuevo enlace activo sin recarga completa

### Requirement: Navegación libre entre los 7 pasos
El sistema SHALL permitir moverse a cualquier paso 1-7 (anterior, siguiente o salto directo) sin exigir completar los anteriores.

#### Scenario: Salto directo al paso 5
- **WHEN** el usuario en paso 1 elige ir al paso 5
- **THEN** el sistema muestra el paso 5 y conserva lo ya respondido en otros pasos

### Requirement: Confirmación explícita por paso
El sistema SHALL exigir un botón "Confirmar paso" por cada paso 1-7 que actúe como toggle reversible; solo los pasos confirmados cuentan como vistos buenos en `confirmedSteps`, y desconfirmar revierte la marca y vuelve a bloquear el avance según las reglas de gateo existentes.

#### Scenario: Avanzar sin confirmar no marca visto bueno
- **WHEN** el usuario responde el paso 1 y navega al paso 2 sin pulsar Confirmar
- **THEN** el paso 1 sigue como no confirmado en el ProgressTracker

#### Scenario: Confirmar marca el paso
- **WHEN** el usuario pulsa Confirmar en el paso 3 con una opción o texto válido
- **THEN** el paso 3 queda confirmado y el progreso muestra 3/7 o equivalente

#### Scenario: Desconfirmar revierte la marca
- **WHEN** el usuario pulsa Desconfirmar en un paso con `confirmedSteps[i] = true`
- **THEN** el paso vuelve a no confirmado, el botón regresa a estado "Confirmar paso" y el conteo de pendientes se actualiza

#### Scenario: Desconfirmar re-bloquea revisión y resultado
- **WHEN** un paso pasa de confirmado a no confirmado
- **THEN** `/revision`, `/resultado` y el CTA `Ver prompt resultante` vuelven a exigir 7/7 y muestran los pasos pendientes

### Requirement: Opción predefinida o personalizada en cada paso
El sistema SHALL ofrecer en cada uno de los 7 pasos al menos una opción predefinida y una entrada libre personalizada.

#### Scenario: Respuesta personalizada
- **WHEN** el usuario elige "Personalizada" en Formato y escribe "Vertical 3:4 póster cine"
- **THEN** el sistema guarda ese texto como valor del paso y permite confirmarlo

### Requirement: Valores por defecto ante pasos sin respuesta
El sistema SHALL aplicar los defaults del engine al generar el prompt para todo paso no respondido o no confirmado.

#### Scenario: Generar con pasos vacíos usa defaults
- **WHEN** el usuario confirma pasos con valores vacíos y genera el prompt
- **THEN** el prompt usa `Vertical 4:5`, `Swiss / International Typographic Style` y demás defaults definidos sin fallar

### Requirement: Acceso guardado a revisión y resultado
El sistema SHALL bloquear `/revision` y `/resultado` hasta que los 7 pasos estén confirmados, mostrando indicación de pasos pendientes.

#### Scenario: Intento de ir a revisión incompleta
- **WHEN** el usuario con solo 5 pasos confirmados visita `/revision`
- **THEN** el sistema lo devuelve a `/cuestionario` e indica los 2 pasos pendientes

### Requirement: Paso 8 de revisión editable
El sistema SHALL mostrar en `/revision` el resumen de las 7 líneas generadas y permitir editar cada valor o volver al paso correspondiente antes de ir al resultado.

#### Scenario: Editar desde revisión invalida confirmación
- **WHEN** el usuario edita el valor del paso 4 en revisión
- **THEN** el paso 4 queda desconfirmado hasta pulsar Confirmar de nuevo y la vista previa se actualiza

### Requirement: Contenido base de los pasos 1 a 4
El sistema SHALL incluir como mínimo las opciones de `req.md`: Formato (4:5, 9:16, 1:1, 16:9), Qué es (cartelería + 8 tipos infográficos), Tema (4 composiciones) y Estilo (10 movimientos + 4 tradiciones + 3 técnicas).

#### Scenario: Opciones visibles
- **WHEN** el usuario abre cada paso 1-4
- **THEN** ve las opciones mínimas citadas más la entrada personalizada

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
