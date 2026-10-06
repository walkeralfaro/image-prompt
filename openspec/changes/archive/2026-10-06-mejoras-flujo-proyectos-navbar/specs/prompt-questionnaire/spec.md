# Spec Delta

## MODIFIED Requirements

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
