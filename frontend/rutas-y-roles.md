# 🔐 Rutas y roles

Este documento describe la estructura de rutas de **Producción Centurión**, los roles disponibles, sus accesos y cómo funciona la protección de rutas.

---

## Roles del sistema

| Rol | Clave en el sistema | Tipo |
|---|---|---|
| Administrador | `admin` | Interno — solo equipo de desarrollo |
| Gerencia | `gerencia` | Usuario de negocio |
| Director de Producción | `director` | Usuario de negocio |
| Supervisor de Producción | `supervisor` | Usuario de negocio |
| Supervisor de Planeación | `supervisor_planeacion` | Usuario de negocio — rutas pendientes |
| Asistente de Producción | `asistente` | Usuario de negocio |

---

## Protección de rutas

La protección está implementada en `src/auth/Guards.jsx` con dos componentes:

- **`PublicRoute`** — solo accesible si el usuario **no** está autenticado (ej: login). Si ya hay sesión activa, redirige al módulo correspondiente.
- **`PrivateRoute`** — requiere sesión activa y valida que el rol del usuario coincida con los roles permitidos en la ruta. Si no cumple, redirige a `/login`.

```
/           →  redirige a /login
*           →  redirige a /login
/login      →  PublicRoute
/admin      →  PrivateRoute (roles: admin)
/gerencia   →  PrivateRoute (roles: gerencia)
/director   →  PrivateRoute (roles: director)
/supervisor →  PrivateRoute (roles: supervisor)
/asistente  →  PrivateRoute (roles: asistente)
```

---

## Mapa completo de rutas

### 🔓 Rutas públicas

| Ruta | Componente | Descripción |
|---|---|---|
| `/login` | `Login.jsx` | Formulario de inicio de sesión |

---

### 🔧 Admin — Solo equipo de desarrollo

| Ruta | Componente | Descripción |
|---|---|---|
| `/admin` | `UsuariosPage.jsx` | Gestión de usuarios del sistema |
| `/admin/roles` | `RolesPage.jsx` | Gestión de roles |
| `/admin/permisos` | `PermisosPage.jsx` | Gestión de permisos |

---

### 📊 Gerencia

| Ruta | Componente | Descripción |
|---|---|---|
| `/gerencia` | `Dashboard.jsx` | Dashboard principal con KPIs de producción |
| `/gerencia/historicos` | `DatosHistoricos.jsx` | Histórico de producción con filtros |

---

### ⚙️ Director de Producción

| Ruta | Componente | Descripción |
|---|---|---|
| `/director` | `Dashboard.jsx` | Dashboard principal con KPIs de producción |
| `/director/historicos` | `DatosHistoricos.jsx` | Histórico de producción con filtros |
| `/director/asignacion-supervisores` | `AsignaciónSupervisores.jsx` | Asignación de supervisores a lugares de trabajo |
| `/director/registro-paradas` | `RegistrodeParadas.jsx` | Registro de paradas de producción |
| `/director/gestion-productos` | `RegistroProductos.jsx` | Gestión de productos (vista con totales) |

---

### 🔎 Supervisor de Producción

| Ruta | Componente | Descripción |
|---|---|---|
| `/supervisor` | `RegistroTurnos.jsx` | Registro y seguimiento de turnos |
| `/supervisor/gestion-productos` | `RegistroProductos.jsx` | Gestión de productos |
| `/supervisor/historicos` | `DatosHistoricos.jsx` | Histórico de producción |

---

### 📋 Supervisor de Planeación

> ⏳ **Pendiente** — El módulo existe en `pages/supervisor_planeacion/` pero aún no tiene rutas definidas ni está integrado en `AppRoutes.jsx`.

---

### 📝 Asistente de Producción

| Ruta | Componente | Descripción |
|---|---|---|
| `/asistente` | `RegistroTurnos.jsx` | Registro de producción del turno |
| `/asistente/historicos` | `DatosHistoricos.jsx` | Histórico de producción |
| `/asistente/registro-paradas` | `RegistrodeParadas.jsx` | Registro de paradas |

---

## Componentes compartidos entre roles

Algunos componentes de vista son reutilizados por varios roles, adaptando su comportamiento según el contexto:

| Componente | Usado por |
|---|---|
| `Dashboard.jsx` | Director, Gerencia |
| `DatosHistoricos.jsx` | Director, Gerencia, Supervisor, Asistente |
| `RegistroTurnos.jsx` | Supervisor, Asistente |
| `RegistrodeParadas.jsx` | Director, Asistente |
| `RegistroProductos.jsx` | Director (`mostrarTotal=true`), Supervisor |

---

## Pendientes

| Tarea | Descripción |
|---|---|
| `supervisor_planeacion.routes.jsx` | Crear archivo de rutas para el módulo de planeación |
| Integrar `supervisor_planeacion` en `AppRoutes.jsx` | Agregar `PrivateRoute` con rol `supervisor_planeacion` |