# Prompt History Specification

## Purpose

Persistir el trabajo del usuario en el navegador para retomar el cuestionario y mantener un historial reutilizable de prompts ya generados.

## Requirements

### Requirement: Persistencia del cuestionario actual
El sistema SHALL persistir en `localStorage` bajo clave neutra el proyecto activo, paso actual, respuestas, personalizadas, temáticas, nombre de proyecto, confirmaciones y tema, restaurándolos al recargar con fallback de lectura a la clave anterior en la primera migración.

#### Scenario: Recarga conserva el progreso
- **WHEN** el usuario con paso 4 respondido en el proyecto activo recarga la página
- **THEN** el sistema restaura proyecto activo, paso 4, valores y confirmados sin pérdida

### Requirement: Guardar prompt en historial
El sistema SHALL permitir guardar el prompt generado como registro con `id`, `createdAt`, `projectId`, `projectName`, `promptText`, `promptEnText` opcional y snapshot de respuestas.

#### Scenario: Guardado desde resultado
- **WHEN** el usuario pulsa Guardar en historial con proyecto `Festival Luz`
- **THEN** el historial contiene un nuevo registro con esos campos, `projectId` del activo y fecha actual

### Requirement: Listar historial
El sistema SHALL mostrar la lista de prompts guardados con proyecto, fecha y vista previa, con estado vacío explícito cuando no haya registros.

#### Scenario: Historial vacío
- **WHEN** no hay registros guardados
- **THEN** el sistema muestra mensaje de vacío en lugar de lista

### Requirement: Recargar prompt al cuestionario
El sistema SHALL permitir cargar un registro del historial al cuestionario, restaurando valores y marcando los 7 pasos como confirmados.

#### Scenario: Recargar registro
- **WHEN** el usuario elige Cargar en un registro guardado
- **THEN** el cuestionario muestra sus valores y los 7 pasos aparecen confirmados

### Requirement: Borrar registros del historial
El sistema SHALL permitir borrar un registro individual y vaciar todo el historial con confirmación previa.

#### Scenario: Borrar un registro
- **WHEN** el usuario confirma borrar el registro `abc123`
- **THEN** el registro desaparece del historial y persiste el borrado tras recarga

### Requirement: Editar registro recargado
El sistema SHALL permitir editar un registro recargado y guardar los cambios actualizando el mismo `id` en lugar de duplicarlo.

#### Scenario: Editar y actualizar
- **WHEN** el usuario recarga un registro, cambia el Tema y pulsa Guardar cambios
- **THEN** el registro con el mismo `id` refleja el nuevo prompt y `createdAt` original o fecha de actualización visible

### Requirement: Nombre de proyecto para historial y Markdown
El sistema SHALL usar el nombre del proyecto activo (por defecto `Mi primer proyecto` o `Proyecto Gráfico` migrado) tanto en el documento Markdown como en el item del historial, sin mostrar marca ajena.

#### Scenario: Nombre por defecto
- **WHEN** el usuario no escribe nombre de proyecto
- **THEN** el sistema usa el nombre por defecto neutro en el Markdown y en el historial

### Requirement: Historial filtrado por proyecto activo
El sistema SHALL filtrar el historial visible por `activeProjectId` con opción de ver todos, manteniendo cargar/editar/borrar por registro.

#### Scenario: Filtrado por proyecto
- **WHEN** existen registros de proyecto A y B y el activo es A
- **THEN** la lista muestra solo los de A salvo que se active `Ver todos`
