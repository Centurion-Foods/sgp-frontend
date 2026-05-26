# DOCUMENTACIÓN TÉCNICA - SISTEMA DE PRODUCCIÓN CENTURIÓN
## Módulo de Gerencia - Mejoras de UI/UX en Filtros y Calendario

**Versión:** 1.0  
**Fecha:** 20 de Mayo de 2026  
**Proyecto:** ProduccionCenturion  
**Estado:** Implementado y Validado

---

## TABLA DE CONTENIDOS

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Cambios Implementados](#cambios-implementados)
3. [Componentes Modificados](#componentes-modificados)
4. [Funcionalidades Detalladas](#funcionalidades-detalladas)
5. [Arquitectura Técnica](#arquitectura-técnica)
6. [Guía de Uso](#guía-de-uso)
7. [Consideraciones de Diseño](#consideraciones-de-diseño)

---

## RESUMEN EJECUTIVO

Se han realizado mejoras significativas en la interfaz de usuario del módulo de Gerencia, enfocadas en:

- **Personalización de controles de formulario:** Implementación de selects personalizados con iconografía de Lucide React
- **Mejora de experiencia de usuario:** Integración de dropdown de calendario reutilizable en el campo de fecha
- **Coherencia visual:** Estandarización de estilos y componentes a través de Tailwind CSS
- **Accesibilidad:** Mejora de placeholders y atributos HTML semánticos

**Alcance:** Módulo de Gerencia (Dashboard y Datos Históricos)

---

## CAMBIOS IMPLEMENTADOS

### 1. SELECTS PERSONALIZADOS CON ICONOS

**Objetivo:** Mejorar la identidad visual de los formularios eliminando la flecha nativa del navegador e implementando iconos personalizados.

#### Técnica Utilizada:
- **appearance-none:** Elimina la apariencia nativa del select
- **relative/absolute:** Posiciona iconos personalizados
- **pointer-events-none:** Evita interferencia con la interacción del usuario
- **Icons Lucide:** Librería de iconos vectoriales integrada

#### Iconos Implementados:
| Componente | Ícono | Propósito |
|-----------|-------|----------|
| Línea | MapPin | Identificar selector de línea de producción |
| Código PT | Search | Buscar por código de producto/tarea |
| Responsable | User | Seleccionar responsable del área |
| Fecha | Calendar | Selector de fecha con calendario integrado |

#### Código de Referencia:
```jsx
<div className="relative">
  <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
  <select defaultValue="" className="...appearance-none...">
    <option value="" disabled hidden>Línea</option>
    <option value="linea1">Línea 1</option>
    ...
  </select>
  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
</div>
```

### 2. CAMPOS DE ENTRADA CON PLACEHOLDERS

**Objetivo:** Proporcionar indicaciones claras del contenido esperado sin ocupar espacio visual.

#### Implementación:
- `Código PT:` Campo de búsqueda con ícono de lupa (Search)
- `Fecha:` Selector de fecha convertido en botón con dropdown de calendario

#### Estilos Aplicados:
```jsx
const estilos = {
    filtros: "outline-none block w-full rounded-xl text-gray-400 max-w-3xs text-sm 
              border border-gray-300 bg-white pl-10 pr-10 py-2 appearance-none 
              placeholder:text-gray-400 focus:outline-none"
}
```

### 3. SELECTOR DE FECHA INTERACTIVO

**Objetivo:** Reemplazar un input de fecha estándar con un componente visual más intuitivo y reutilizable.

#### Características Implementadas:
- **Reutilización de MiniCalendar:** Componente existente adaptado para el panel de filtros
- **Estado persistente:** Almacenamiento de fecha seleccionada en estado local
- **Cierre automático:** El dropdown se cierra al seleccionar una fecha
- **Cierre por escape:** Tecla ESC cierra el dropdown
- **Click outside:** Hace clic fuera del dropdown para cerrarlo

#### Lógica de Interacción:
```jsx
const [selectedDate, setSelectedDate] = useState("");
const [showCalendar, setShowCalendar] = useState(false);

const handleDateSelect = (iso) => {
  setSelectedDate(iso);
  setShowCalendar(false);
};
```

### 4. VISIBILIDAD CONDICIONAL DEL CALENDARIO DEL LAYOUT

**Objetivo:** Mostrar el calendario global del layout solo en la pestaña Dashboard, mejorando la experiencia en otras secciones.

#### Implementación:
- **useLocation Hook:** Detecta la ruta actual
- **isDashboardPath:** Validación condicional (`pathname === "/gerencia"`)
- **Renderizado condicional:** Solo renderiza el botón de calendario en Dashboard

#### Código:
```jsx
const location = useLocation();
const isDashboardPath = location.pathname === "/gerencia";

{isDashboardPath && (
  <div className="relative flex items-center">
    {/* Botón y dropdown del calendario */}
  </div>
)}
```

---

## COMPONENTES MODIFICADOS

### 1. **DatosHistoricos.jsx**
**Ubicación:** `frontend/src/features/vistas/gerencia/components/pages/`

**Cambios:**
- Importación de `MiniCalendar`, hooks de React (useState, useEffect, useRef)
- Importación de iconos Lucide: `Calendar`, `ChevronDown`, `MapPin`, `Search`, `User`
- Implementación de lógica de estado para el calendario
- Implementación de handlers para click-outside y ESC key
- Conversión del input de fecha a botón con dropdown

**Validación:** ✅ Sin errores de compilación

### 2. **Layout.jsx**
**Ubicación:** `frontend/src/features/vistas/gerencia/components/`

**Cambios:**
- Importación de `useLocation` desde react-router-dom
- Agregación de lógica condicional basada en ruta
- Renderizado condicional del botón de calendario
- Función `openDatePicker` mejorada con validación de ruta

**Validación:** ✅ Sin errores de compilación

### 3. **MiniCalendar.jsx**
**Ubicación:** `frontend/src/features/vistas/gerencia/components/`

**Estado:** Sin cambios (componente reutilizado tal cual)

**Descripción:** Componente existente que proporciona:
- Navegación entre meses
- Selección de fechas
- Formato ISO para fechas (YYYY-MM-DD)
- Estilos optimizados con Tailwind

---

## FUNCIONALIDADES DETALLADAS

### A. Panel de Filtros - Datos Históricos

**Ubicación Visual:** Encabezado de la página "Datos Históricos"

**Estructura del Grid:**
```
┌─────────────────────────────────────────────────────────┐
│ Filtros                                                   │
├─────────────┬──────────────┬───────────────┬────────────┤
│   Línea     │  Código PT   │  Responsable  │   Fecha    │
│ (MapPin)    │  (Search)    │   (User)      │ (Calendar) │
├─────────────┼──────────────┼───────────────┼────────────┤
│ [Dropdown]▼ │ [Búsqueda]   │ [Dropdown]▼   │ [Botón]▼   │
└─────────────┴──────────────┴───────────────┴────────────┘
```

**Distribución:** Grid de 4 columnas con espaciado uniforme

### B. Selector de Fecha Integrado

**Comportamiento:**
1. Usuario hace clic en el botón "Fecha"
2. Se despliega el calendario (MiniCalendar)
3. Usuario selecciona una fecha
4. La fecha se formatea y se muestra en el botón
5. El dropdown se cierra automáticamente

**Formato de Fecha:** ISO 8601 (YYYY-MM-DD)  
Ejemplo: `2026-05-20`

### C. Placeholders Inteligentes

**Selects:**
- Línea → "Línea" (deshabilitado, oculto)
- Responsable → "Responsable" (deshabilitado, oculto)

**Inputs:**
- Código PT → "Código PT"
- Fecha → "Fecha" (solo cuando no hay selección)

---

## ARQUITECTURA TÉCNICA

### Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| React | 19.2.6 | Framework principal |
| React Router | 7.15.0 | Enrutamiento |
| Tailwind CSS | 4.3.0 | Estilos |
| Lucide React | 1.3.0 | Iconografía |
| Vite | 8.0.12 | Build tool |

### Estructura de Directorios Relevante

```
frontend/
├── src/
│   ├── features/
│   │   └── vistas/
│   │       └── gerencia/
│   │           └── components/
│   │               ├── Layout.jsx (modificado)
│   │               ├── MiniCalendar.jsx (reutilizado)
│   │               └── pages/
│   │                   └── DatosHistoricos.jsx (modificado)
│   └── router/
│       └── routes/
│           └── gerencia.routes.jsx
```

### Flujo de Datos

```
Layout.jsx (padre)
    ↓
    ├── useLocation() → detecta ruta actual
    ├── selectedDate (estado compartido)
    └── showCalendar (estado condicional)
        ↓
        DatosHistoricos.jsx (hijo)
        ├── selectedDate (estado local)
        ├── showCalendar (estado local)
        └── MiniCalendar.jsx (componente)
```

---

## GUÍA DE USO

### Para el Usuario Final

#### Filtrar por Fecha:
1. Haz clic en el campo "Fecha" en el panel de filtros
2. Navega por los meses usando los botones `<` y `>`
3. Haz clic en el día deseado
4. El campo se actualizará automáticamente
5. Los datos se filtrarán según la fecha seleccionada

#### Seleccionar Línea o Responsable:
1. Haz clic en el dropdown correspondiente
2. Selecciona una opción de la lista
3. El dropdown se cerrará automáticamente

#### Buscar por Código PT:
1. Haz clic en el campo "Código PT"
2. Escribe el código a buscar
3. Los resultados se actualizarán en tiempo real (si está implementado el backend)

### Para Desarrolladores

#### Agregar un Nuevo Filtro:
```jsx
<div className="relative">
  <IconComponent className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
  <select defaultValue="" className={estilos.filtros}>
    <option value="" disabled hidden>Etiqueta</option>
    <option value="opcion1">Opción 1</option>
  </select>
  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
</div>
```

#### Personalizar Estilos:
Modificar la constante `estilos.filtros` en DatosHistoricos.jsx

#### Conectar con Backend:
```jsx
const [selectedDate, setSelectedDate] = useState("");

useEffect(() => {
  if (selectedDate) {
    // Llamar API con fecha seleccionada
    fetchData({ date: selectedDate });
  }
}, [selectedDate]);
```

---

## CONSIDERACIONES DE DISEÑO

### 1. Coherencia Visual
- **Color Scheme:** Grises (texto/bordes), rojo (acciones/énfasis)
- **Iconografía:** Lucide React para consistencia
- **Espaciado:** Grid de 4 columnas con gap-6
- **Redondeado:** Todos los componentes con rounded-xl

### 2. Accesibilidad
- **Placeholders descriptivos:** Claros e informativos
- **Atributos HTML:** `aria-label`, `aria-haspopup`, `aria-expanded`
- **Navegación por teclado:** ESC cierra dropdowns
- **Indicadores visuales:** Chevron down para dropdowns

### 3. Usabilidad
- **Click-outside:** Cierra dropdowns al hacer clic fuera
- **Autoclose:** Los dropdowns se cierran al seleccionar
- **Feedback visual:** Hover states en botones
- **Responsive:** Grid layout que se adapta al contenedor

### 4. Rendimiento
- **pointer-events-none:** Evita interacciones innecesarias
- **Renderizado condicional:** Solo renderiza el calendario cuando es necesario
- **Optimización de estado:** Uso de useState para estado local

---

## PRUEBAS REALIZADAS

### Validación de Compilación
✅ DatosHistoricos.jsx — Sin errores  
✅ Layout.jsx — Sin errores  
✅ MiniCalendar.jsx — Sin cambios, funcional

### Validación Funcional
✅ Selects muestran placeholders correctamente  
✅ Iconos se posicionan y renderizan correctamente  
✅ Calendario se abre/cierra al hacer clic  
✅ Fecha seleccionada se muestra en el botón  
✅ ESC key cierra el dropdown  
✅ Click-outside cierra el dropdown  
✅ Calendario solo visible en ruta `/gerencia`  

---

## PRÓXIMAS MEJORAS SUGERIDAS

1. **Integración con Backend:** Conectar filtros con API
2. **Persistencia de Filtros:** Guardar filtros en localStorage
3. **Exportación de Datos:** Agregar botón para exportar resultados filtrados
4. **Validación de Inputs:** Agregar validación en campo "Código PT"
5. **Rango de Fechas:** Permitir seleccionar rango de fechas (desde-hasta)
6. **Reseteo de Filtros:** Botón para limpiar todos los filtros

---

## CONCLUSIÓN

Los cambios implementados mejoran significativamente la experiencia de usuario en el módulo de Gerencia, proporcionando una interfaz más intuitiva, coherente y profesional. La reutilización de componentes existentes (MiniCalendar) y la implementación de patrones estándar (appearance-none, pointer-events-none) garantizan un código mantenible y escalable.

**Responsable:** Equipo de Desarrollo  
**Período:** Mayo 2026  
**Status:** ✅ Implementado y Validado

---

*Esta documentación es válida a partir del 20 de mayo de 2026 y está sujeta a cambios conforme evolucione el proyecto.*
