# Spec Delta

## MODIFIED Requirements

### Requirement: Documento Markdown exportable
El sistema SHALL generar un documento Markdown con título neutro sin marca ajena, `## Proyecto: <nombre>`, bloque `text` con el prompt y sección de recomendaciones (chat nuevo, imagen de referencia, control tipográfico, cero palabras vacías).

#### Scenario: Markdown con nombre de proyecto
- **WHEN** el proyecto se llama `Festival Luz` y se genera el documento
- **THEN** el Markdown contiene `## Proyecto: Festival Luz` y el prompt dentro de bloque ```text sin mencionar `Beailabs` en título ni recomendaciones

## ADDED Requirements

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
