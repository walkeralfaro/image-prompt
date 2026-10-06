# Spec Delta

## Purpose

Guiar al usuario paso a paso en la captura de los 7 parámetros del método Beailabs, con navegación libre, confirmación explícita y revisión final antes del resultado.

## ADDED Requirements

### Requirement: Navegación por rutas del flujo
El sistema SHALL exponer las rutas `/`, `/cuestionario`, `/revision` y `/resultado` con redirección a `/` ante ruta desconocida.

#### Scenario: Ruta desconocida redirige a inicio
- **WHEN** el usuario visita `/ruta-inexistente`
- **THEN** el sistema redirige a `/` sin error

#### Scenario: Acceso directo a cuestionario
- **WHEN** el usuario visita `/cuestionario`
- **THEN** el sistema muestra el paso actual persistido (por defecto paso 1)

### Requirement: Navegación libre entre los 7 pasos
El sistema SHALL permitir moverse a cualquier paso 1-7 (anterior, siguiente o salto directo) sin exigir completar los anteriores.

#### Scenario: Salto directo al paso 5
- **WHEN** el usuario en paso 1 elige ir al paso 5
- **THEN** el sistema muestra el paso 5 y conserva lo ya respondido en otros pasos

### Requirement: Confirmación explícita por paso
El sistema SHALL exigir un botón "Confirmar paso" por cada paso 1-7; solo los pasos confirmados cuentan como vistos buenos en `confirmedSteps`.

#### Scenario: Avanzar sin confirmar no marca visto bueno
- **WHEN** el usuario responde el paso 1 y navega al paso 2 sin pulsar Confirmar
- **THEN** el paso 1 sigue como no confirmado en el ProgressTracker

#### Scenario: Confirmar marca el paso
- **WHEN** el usuario pulsa Confirmar en el paso 3 con una opción o texto válido
- **THEN** el paso 3 queda confirmado y el progreso muestra 3/7 o equivalente

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
