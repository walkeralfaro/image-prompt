# Prompt Projects Specification

## Purpose

Gestionar múltiples proyectos de prompts como contextos de trabajo independientes, cada uno con su cuestionario, nombre e historial propio.

## Requirements

### Requirement: Crear y listar proyectos
El sistema SHALL permitir crear proyectos con nombre no vacío y listarlos con fecha de actualización, mostrando un estado vacío explícito si solo existe el proyecto por defecto.

#### Scenario: Crear segundo proyecto
- **WHEN** el usuario crea el proyecto `Festival Luz` existiendo `Proyecto Gráfico`
- **THEN** la lista muestra ambos y el nuevo queda como activo con cuestionario vacío

#### Scenario: Nombre vacío rechazado
- **WHEN** el usuario intenta crear un proyecto con nombre vacío o solo espacios
- **THEN** el sistema rechaza la creación y mantiene la lista sin cambios con indicación visible

### Requirement: Cambiar proyecto activo
El sistema SHALL permitir cambiar el proyecto activo desde la vista de inicio `/` además de cuestionario, revisión o resultado, persistiendo el progreso de cada proyecto por separado y restaurándolo al volver.

#### Scenario: Cambio conserva progreso por proyecto
- **WHEN** el usuario con paso 3 respondido en proyecto A cambia a proyecto B y vuelve a A
- **THEN** el proyecto A muestra paso 3 y sus respuestas intactas

#### Scenario: Gestionar proyecto desde inicio
- **WHEN** el usuario cambia, crea, renombra, duplica o elimina el proyecto desde `/`
- **THEN** se aplican las mismas reglas del selector (guardar/cargar borrador, confirmación previa al eliminar, impedir cero proyectos) y el historial visible se filtra al proyecto activo

### Requirement: Renombrar, duplicar y eliminar proyecto
El sistema SHALL permitir renombrar, duplicar (copia de respuestas e historial) y eliminar un proyecto con confirmación previa, impidiendo dejar cero proyectos.

#### Scenario: Eliminar proyecto con confirmación
- **WHEN** el usuario confirma eliminar el proyecto secundario
- **THEN** el proyecto desaparece, su historial asociado se elimina y el activo pasa al proyecto por defecto

#### Scenario: No eliminar el último proyecto
- **WHEN** solo existe un proyecto y se intenta eliminarlo
- **THEN** el sistema bloquea la acción con indicación visible

### Requirement: Migración del estado monolitico
El sistema SHALL migrar una sola vez el estado existente (respuestas, `history`, `projectName`) al proyecto por defecto sin pérdida y con nueva clave de persistencia con fallback a la clave anterior.

#### Scenario: Primera carga tras actualización
- **WHEN** existe estado bajo la clave anterior y no hay proyectos
- **THEN** el sistema crea `Mi primer proyecto` o conserva `projectName` existente con sus respuestas e historial
