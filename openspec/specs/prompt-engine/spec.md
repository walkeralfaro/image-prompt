# Prompt Engine Specification

## Purpose

Transformar las respuestas del cuestionario en el bloque estricto de 7 líneas del método Beailabs y en un documento Markdown exportable, aplicando sufijos y anti-guías obligatorios.

## Requirements

### Requirement: Orden estricto de 7 líneas
El sistema SHALL generar el prompt en el orden exacto Formato, Qué es, Tema, Estilo, Texto exacto, Tipografía y paleta, Evita, una línea por parámetro.

#### Scenario: Orden del bloque final
- **WHEN** el sistema genera el prompt con todos los valores
- **THEN** la salida tiene 7 líneas en ese orden con prefijos `Formato:`, `Qué es:`, `Tema:`, `Estilo:`, `Texto exacto:`, `Tipografía y paleta:`, `Evita:`

### Requirement: Línea 5 desde lista dinámica con sufijo anti-basura
El sistema SHALL construir la línea 5 desde una lista dinámica de textos (cero o más) formateados entre comillas y añadir el sufijo `y ningún otro texto` cuando haya texto.

#### Scenario: Dos textos con sufijo automático
- **WHEN** la lista es `["Noche Sonar", "12 OCT 2026"]`
- **THEN** la línea 5 es `Texto exacto: "Noche Sonar", "12 OCT 2026" y ningún otro texto`

#### Scenario: Sin duplicar sufijo
- **WHEN** el texto ya contiene `y ningún otro texto`
- **THEN** el sistema no lo duplica

### Requirement: Opción sin texto en imagen base
El sistema SHALL permitir marcar "sin texto" y generar la línea 5 como texto de maquetación posterior en lugar del sufijo.

#### Scenario: Sin texto seleccionado
- **WHEN** el usuario marca sin texto
- **THEN** la línea 5 es `Texto exacto: Sin texto en la imagen base (se maquetará en editor externo)`

### Requirement: Línea 6 con paleta predefinida o personalizada
El sistema SHALL ofrecer paletas predefinidas (recta rojo/negro/crema, serif cobalto/blanco/dorado mate, bold blanco/negro/amarillo chicle, propia del estilo) y un constructor personalizado de tipografía más 2-3 colores.

#### Scenario: Paleta personalizada
- **WHEN** el usuario define tipografía `Grotesk Bold` y colores `violeta, crema, negro`
- **THEN** la línea 6 es `Tipografía y paleta: Grotesk Bold; violeta, crema y negro`

### Requirement: Línea 7 con antiguía fija obligatoria
El sistema SHALL terminar siempre la línea 7 con el bloque fijo `Textura desgastada, pinceladas secas, líneas de velocidad, rayos decorando elementos y subrayados de pincel`.

#### Scenario: Antiguía presente sin personalización
- **WHEN** no hay evita personalizado ni temáticas
- **THEN** la línea 7 es exactamente `Evita: Textura desgastada, ... y subrayados de pincel`

### Requirement: Línea 7 multi-temática acumulable
El sistema SHALL permitir seleccionar múltiples temáticas (Arte, Libros, Fiestas, Deportes, Verano, Concierto, Tech) y combinar sus tópicos con el texto libre del usuario antes de la antiguía fija.

#### Scenario: Dos temáticas más texto libre
- **WHEN** el usuario escribe `degradados extra` y selecciona Arte y Tech
- **THEN** la línea 7 contiene `degradados extra`, los tópicos de Arte y Tech y finaliza con la antiguía fija

### Requirement: Advertencia ante adjetivos vacíos
El sistema SHALL advertir cuando un texto libre contenga `bonito`, `moderno`, `profesional` o `impactante` y sugerir usar un estilo con nombre propio, sin bloquear la confirmación.

#### Scenario: Adjetivo vacío detectado
- **WHEN** el usuario escribe `un cartel moderno y bonito` en Tema
- **THEN** el sistema muestra advertencia visible y mantiene el texto para que el usuario lo corrija

### Requirement: Documento Markdown exportable
El sistema SHALL generar un documento Markdown con título neutro sin marca ajena, `## Proyecto: <nombre>`, bloque `text` con el prompt y sección de recomendaciones (chat nuevo, imagen de referencia, control tipográfico, cero palabras vacías).

#### Scenario: Markdown con nombre de proyecto
- **WHEN** el proyecto se llama `Festival Luz` y se genera el documento
- **THEN** el Markdown contiene `## Proyecto: Festival Luz` y el prompt dentro de bloque ```text sin mencionar `Beailabs` en título ni recomendaciones

### Requirement: Bloque Prompt optimizado en inglés para agentes de imagen
El sistema SHALL ofrecer en `/resultado` un bloque `Prompt optimizado (EN)` derivado del prompt ES de 7 líneas, traducido al inglés con keywords de calidad, estilo y parámetros por target (`DALL-E`, `Midjourney`, `ChatGPT Images`), con copiar independiente.

#### Scenario: Generar EN optimizado Midjourney
- **WHEN** el usuario con prompt ES completo pulsa `Prompt optimizado` con target `Midjourney`
- **THEN** el sistema muestra texto EN con sujeto, estilo, paleta y evita traducidos más flags `--ar`, `--style` o equivalentes y respeta el modo sin-texto

#### Scenario: Copiar EN sin alterar ES
- **WHEN** el usuario pulsa Copiar en el bloque EN
- **THEN** el portapapeles contiene solo el texto EN optimizado y el bloque ES permanece intacto

#### Scenario: Sin texto adapta el EN
- **WHEN** el modo sin texto está activo
- **THEN** el EN indica `no text, clean base artwork for later typography` en lugar de literales entre comillas

### Requirement: Exportación sin referencias a Beailabs
El sistema SHALL no incluir la cadena `Beailabs` en el Markdown descargado, el prompt copiado ni el nombre de archivo por defecto.

#### Scenario: Descarga sin marca
- **WHEN** el usuario descarga `prompt_cartel_7_lineas.md`
- **THEN** el contenido no contiene `Beailabs` en ningún apartado

### Requirement: Copiar prompt plano al portapapeles
El sistema SHALL copiar el prompt de 7 líneas en texto plano al portapapeles y mostrar confirmación visual de éxito o error.

#### Scenario: Copiado exitoso
- **WHEN** el usuario pulsa Copiar en resultado
- **THEN** el portapapeles contiene las 7 líneas y aparece un toast de confirmación

### Requirement: Descargar archivo Markdown
El sistema SHALL descargar el documento como `prompt_cartel_7_lineas.md` con codificación UTF-8.

#### Scenario: Descarga del archivo
- **WHEN** el usuario pulsa Descargar Markdown
- **THEN** el navegador descarga `prompt_cartel_7_lineas.md` con el contenido generado
