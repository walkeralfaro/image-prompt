# Tasks

## 1. Datos de ejemplos por opción

- [x] 1.1 Extender `StepOption` con `example?: string` en `src/data/stepsData.ts` y verificar con `npx tsc --noEmit` que compila sin errores de tipo
- [x] 1.2 Poblar `example` para pasos 1-4 y 6 (~30 opciones, 1 línea cada uno estilo Beailabs) y verificar visualmente en `QuestionnairePage` que cada `OptionCard` recibe su ejemplo
- [x] 1.3 Añadir ejemplos por tópico en `src/data/antiTropesData.ts` (Arte, Libros, Fiestas, Deportes, Verano, Concierto, Tech) y verificar que `TopicMultiSelect` los muestra como tooltip

## 2. Tooltip reutilizable por opción

- [x] 2.1 Crear `RecommendationTooltip` (`role="tooltip"`, `group-hover` + `focus-within`, icono `Info` Lucide, `aria-describedby`) y verificar con teclado (Tab muestra tooltip) y hover
- [x] 2.2 Extender `OptionCard` con prop `example?` que renderiza el tooltip sin romper selección y verificar que click en card sigue seleccionando y el tooltip no bloquea el click
- [x] 2.3 Cablear tooltip en `QuestionnairePage` (pasos 1-4), `PaletteBuilder` (paso 6) y `TopicMultiSelect` (paso 7) y verificar en móvil que el tooltip no tapa la card y se cierra al perder foco

## 3. Edición inline del paso 5

- [x] 3.1 Implementar `editingIndex + editDraft` en `TextListInput` con Editar/Guardar/Cancelar, Enter guarda y Escape cancela, y verificar que editar el 2º ítem actualiza `textList` manteniendo el orden
- [x] 3.2 Bloquear guardado vacío (solo espacios) con indicación visible y verificar que el valor original se conserva
- [x] 3.3 Cancelar edición al activar `noText` y ocultar lista/acciones, y verificar que el engine genera la línea 5 de maquetación posterior

## 4. CTA gateado a resultado desde paso 7

- [x] 4.1 Añadir botón `Ver prompt resultante` (`Link to="/resultado"`) en `QuestionnairePage`, habilitado solo si `currentStep === 7 && confirmedSteps.every(Boolean)`, y verificar que con 6/7 muestra deshabilitado con conteo de pendientes
- [x] 4.2 Verificar navegación directa a `/resultado` con 7/7 lleva al prompt y sin 7/7 redirige a `/cuestionario` con mensaje de pendientes

## 5. Integración y verificación final

- [x] 5.1 Ejecutar `npm run build` (`tsc -b && vite build`) y verificar que compila sin errores
- [x] 5.2 Recorrido manual 1→7: editar texto paso 5, abrir tooltip en cada paso, confirmar 7/7, pulsar CTA a `/resultado` y verificar prompt de 7 líneas + descarga `.md`
