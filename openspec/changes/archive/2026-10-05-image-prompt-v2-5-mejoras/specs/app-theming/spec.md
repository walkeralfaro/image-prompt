# Spec Delta

## Purpose

Ofrecer tema claro y oscuro conmutables desde el header, persistentes y legibles en toda la interfaz, respetando la preferencia del sistema en el primer arranque.

## ADDED Requirements

### Requirement: Toggle claro/oscuro en header
El sistema SHALL exponer en el header un botón accesible que alterna entre tema claro y oscuro mostrando icono Sol en modo oscuro y Luna en modo claro, con `aria-label` y `aria-pressed`.

#### Scenario: Alternar a claro
- **WHEN** el usuario en tema oscuro pulsa el toggle del header
- **THEN** la interfaz pasa a tema claro, el icono cambia a Luna y el foco permanece operable por teclado

#### Scenario: Toggle visible en móvil y escritorio
- **WHEN** el usuario abre la app en viewport móvil o escritorio
- **THEN** el toggle es visible junto a la navegación sin ocultar enlaces existentes

### Requirement: Persistencia y preferencia del sistema
El sistema SHALL persistir el tema elegido en `localStorage` y, sin elección previa, usar `prefers-color-scheme` (oscuro por defecto si no hay señal), restaurándolo al recargar.

#### Scenario: Recarga conserva tema claro
- **WHEN** el usuario elige tema claro y recarga
- **THEN** la app arranca en tema claro sin destello a oscuro

### Requirement: Legibilidad global en ambos temas
El sistema SHALL aplicar variantes claras/oscuras a fondo, tarjetas, tooltips con imagen, viewer de Markdown e historial, manteniendo contraste AA y sin texto invisible.

#### Scenario: Tooltip legible en claro
- **WHEN** el usuario abre un tooltip con imagen en tema claro
- **THEN** texto e imagen son legibles con borde y fondo adaptados al tema
