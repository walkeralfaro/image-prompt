# Spec Delta

## MODIFIED Requirements

### Requirement: Cambiar proyecto activo
El sistema SHALL permitir cambiar el proyecto activo desde la vista de inicio `/` además de cuestionario, revisión o resultado, persistiendo el progreso de cada proyecto por separado y restaurándolo al volver.

#### Scenario: Cambio conserva progreso por proyecto
- **WHEN** el usuario con paso 3 respondido en proyecto A cambia a proyecto B y vuelve a A
- **THEN** el proyecto A muestra paso 3 y sus respuestas intactas

#### Scenario: Gestionar proyecto desde inicio
- **WHEN** el usuario cambia, crea, renombra, duplica o elimina el proyecto desde `/`
- **THEN** se aplican las mismas reglas del selector (guardar/cargar borrador, confirmación previa al eliminar, impedir cero proyectos) y el historial visible se filtra al proyecto activo
