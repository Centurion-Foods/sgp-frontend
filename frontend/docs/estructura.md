# 📁 Estructura del proyecto

Este documento describe la organización de carpetas y archivos del frontend de **Producción Centurión**, explicando el propósito de cada sección.

---

## Árbol general

```
sgp-frontend/
└── frontend/
    ├── public/
    ├── docs/                        # Documentación técnica del proyecto
    └── src/
        ├── App.jsx                  # Componente raíz de la aplicación
        ├── main.jsx                 # Punto de entrada — monta App en el DOM
        ├── index.css                # Estilos globales (Tailwind base)
        │
        ├── assets/                  # Recursos estáticos
        ├── auth/                    # Autenticación, contexto y guards
        ├── data/                    # Datos mock temporales
        ├── pages/                   # Vistas organizadas por rol
        ├── router/                  # Configuración de rutas
        ├── services/                # [PENDIENTE] Llamadas a la API REST
        └── shared/                  # Componentes reutilizables
```

---

## Detalle por carpeta

### `assets/`
Recursos estáticos del proyecto.

```
assets/
├── fonts/                  # Tipografías personalizadas
├── icons/                  # Íconos SVG (blobblanco, blobrojo, miniblobrojo, Vector)
└── images/                 # Imágenes (logo.png)
```

---

### `auth/`
Todo lo relacionado con autenticación y control de acceso.

```
auth/
├── AuthContext.jsx         # Proveedor del contexto de autenticación (Context API)
├── authContext.js          # Configuración base del contexto
├── authHelpers.js          # Funciones auxiliares de auth (parseo de roles, tokens, etc.)
├── AuthLoading.jsx         # Componente de pantalla de carga durante validación de sesión
├── authService.js          # [PENDIENTE] Lógica de llamadas al backend para login/logout
├── Guards.jsx              # Route Guards — protege rutas según el rol del usuario
└── useAuth.js              # Hook personalizado para consumir el contexto de auth
```

---

### `data/`
Datos mock estáticos usados mientras no existe integración con backend. **Temporal.**

```
data/
├── estilosFiltros.js       # Estilos para componentes de filtrado
├── historicoData.js        # Datos históricos de producción (mock)
├── paradasData.js          # Datos de paradas de producción (mock)
└── productosData.js        # Catálogo de productos (mock)
```

> ⚠️ Esta carpeta será reemplazada por llamadas reales a la API en `services/` al integrar el backend.

---

### `pages/`
Vistas principales de la aplicación, organizadas por rol. Cada módulo contiene su propio layout, componentes y hooks.

```
pages/
├── admin/                          # Panel de administración — uso exclusivo del equipo de desarrollo
│   ├── components/
│   │   ├── AdminLayout.jsx         # Layout principal del módulo admin
│   │   └── pages/
│   │       ├── Usuarios/           # Gestión de usuarios
│   │       │   ├── UsuariosPage.jsx
│   │       │   └── components/
│   │       │       ├── CreateUserModal.jsx
│   │       │       ├── DeleteUserModal.jsx
│   │       │       ├── EditUserModal.jsx
│   │       │       ├── UserSearch.jsx
│   │       │       └── UserTable.jsx
│   │       ├── roles/              # Gestión de roles
│   │       │   ├── RolesPage.jsx
│   │       │   └── components/
│   │       │       ├── RoleFormModal.jsx
│   │       │       ├── DeleteRoleModal.jsx
│   │       │       └── RolesTable.jsx
│   │       ├── permisos/           # Gestión de permisos
│   │       │   ├── PermisosPage.jsx
│   │       │   └── components/
│   │       │       ├── PermisoFormModal.jsx
│   │       │       ├── DeletePermisoModal.jsx
│   │       │       └── PermisosTable.jsx
│   │       └── shared/
│   │           └── StatCard.jsx    # Tarjeta de estadísticas compartida en admin
│   └── hooks/
│
├── asistente/                      # Módulo Asistente de Producción
│   ├── AsistenteLayout.jsx         # Layout principal del módulo
│   ├── components/                 # [En desarrollo]
│   └── hooks/                      # [En desarrollo]
│
├── director/                       # Módulo Director de Producción
│   ├── DirectorLayout.jsx          # Layout principal del módulo
│   ├── charts/
│   │   └── RingProgress.jsx        # Gráfico de progreso circular
│   ├── components/
│   │   ├── ObjetivoModal.jsx       # Modal para definir objetivos
│   │   ├── ParadasTotalesModal.jsx # Modal de resumen de paradas
│   │   ├── SupervisorCard.jsx      # Tarjeta de supervisor asignado
│   │   ├── TablaProductos.jsx      # Tabla de productos
│   │   └── pages/
│   │       ├── AsignaciónSupervisores.jsx  # Asignación de supervisores a lugares de trabajo
│   │       ├── RegistroProductos.jsx       # Registro de productos
│   │       └── RegistrodeParadas.jsx       # Registro de paradas de producción
│   └── hooks/
│
├── gerencia/                       # Módulo Gerencia
│   ├── components/
│   │   ├── GerenciaLayout.jsx      # Layout principal del módulo
│   │   ├── MiniCalendar.jsx        # Componente de calendario
│   │   └── pages/
│   │       ├── Dashboard.jsx       # Dashboard principal con KPIs
│   │       ├── DatosHistoricos.jsx # Vista de histórico de producción
│   │       ├── charts/
│   │       │   ├── LineasChart.jsx # Gráfico de producción por líneas
│   │       │   └── ObjetivoPie.jsx # Gráfico de cumplimiento de objetivo
│   │       ├── components/
│   │       │   ├── DashboardFooter.jsx     # Pie del dashboard
│   │       │   ├── LineSelectionModal.jsx  # Modal de selección de línea
│   │       │   └── Modal.jsx               # Modal genérico
│   │       └── hooks/
│   │           └── useDashboardChart.js    # Hook para lógica del dashboard
│   └── hooks/
│
├── login/                          # Pantalla de inicio de sesión
│   ├── components/
│   │   └── Login.jsx               # Formulario de autenticación
│   └── hooks/
│
├── supervisor/                     # Módulo Supervisor de Producción
│   ├── SupervisorLayout.jsx        # Layout principal del módulo
│   ├── components/
│   │   ├── RegistroModal.jsx       # Modal de registro de turno
│   │   └── pages/
│   │       └── RegistroTurnos.jsx  # Vista de registro de turnos
│   └── hooks/
│
└── supervisor_planeacion/          # Módulo Supervisor de Planeación
    ├── components/                 # [En desarrollo]
    └── hooks/                      # [En desarrollo]
```

---

### `router/`
Configuración de rutas de la aplicación con React Router 6. Cada rol tiene su propio archivo de rutas.

```
router/
└── routes/
    ├── AppRoutes.jsx               # Enrutador principal — orquesta todas las rutas
    ├── login.routes.jsx                        # Rutas de autenticación
    ├── admin.routes.jsx                        # Rutas del panel de administración (dev)
    ├── asistente.routes.jsx                    # Rutas del módulo asistente
    ├── director.routes.jsx                     # Rutas del módulo director
    ├── gerencia.routes.jsx                     # Rutas del módulo gerencia
    ├── supervisor.routes.jsx                   # Rutas del módulo supervisor
    └── supervisor_planeacion.routes.jsx        # [PENDIENTE] Rutas del módulo supervisor de planeación
```

> 🔒 La protección de rutas por rol está gestionada por `Guards.jsx` en `auth/`.

---

### `services/`
Capa de comunicación con la API REST. **Actualmente vacía.**

```
services/                           # [PENDIENTE — se implementa con el backend]
```

Al integrar el backend, aquí vivirán los archivos de llamadas HTTP organizados por módulo (ej: `produccion.service.js`, `auth.service.js`).

---

### `shared/ui/`
Componentes de UI genéricos reutilizables en cualquier módulo de la aplicación.

```
shared/
└── ui/
    ├── Card.jsx                    # Componente de tarjeta genérica
    ├── Tab.jsx                     # Componente de pestaña individual
    └── TabsContainer.jsx           # Contenedor de pestañas
```

---

## Convenciones del proyecto

| Convención | Descripción |
|---|---|
| Cada módulo es autónomo | Cada rol tiene su propio layout, components y hooks dentro de `pages/` |
| Componentes en PascalCase | `SupervisorCard.jsx`, `RegistroModal.jsx` |
| Hooks con prefijo `use` | `useAuth.js`, `useDashboardChart.js` |
| Servicios con sufijo `Service` | `authService.js` (y futuros: `produccionService.js`) |
| Rutas con sufijo `.routes` | `supervisor.routes.jsx`, `gerencia.routes.jsx` |
| Mock data en `data/` | Temporal hasta integración con backend |