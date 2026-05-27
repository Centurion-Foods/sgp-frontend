# 🔌 Integración con Backend

Este documento describe los puntos de conexión entre el frontend de **Producción Centurión** y la API REST que se desarrollará en versiones futuras.

---

## Estado actual

El frontend está construido para funcionar de forma independiente mientras el backend no existe. Los datos se sirven desde archivos mock en `src/data/`. Al integrar el backend, estos archivos serán reemplazados por llamadas reales desde `src/services/`.

| Capa | Estado |
|---|---|
| `src/data/` | Activo — datos mock temporales |
| `src/services/` | Vacío — pendiente de implementar |
| `src/auth/authService.js` | Preparado — pendiente de conectar |

---

## URL base de la API

Al integrar el backend, definir la URL base en un archivo `.env`:

```
VITE_API_URL=https://api.produccioncenturion.com
```

Y consumirla en los servicios así:

```js
const BASE_URL = import.meta.env.VITE_API_URL
```

---

## Endpoints planeados

### Autenticación

| Endpoint | Método | Descripción |
|---|---|---|
| `/api/auth/login` | `POST` | Iniciar sesión — retorna token y datos del usuario |
| `/api/auth/logout` | `POST` | Cerrar sesión |
| `/api/auth/me` | `GET` | Obtener datos del usuario autenticado |

**Body esperado — login:**
```json
{
  "usuario": "string",
  "password": "string"
}
```

**Respuesta esperada — login:**
```json
{
  "token": "string",
  "usuario": {
    "id": "string",
    "nombre": "string",
    "rol": "gerencia | director | supervisor | supervisor_planeacion | asistente"
  }
}
```

---

### Producción

| Endpoint | Método | Descripción |
|---|---|---|
| `/api/produccion/registros` | `GET` | Listar registros de producción |
| `/api/produccion/registros` | `POST` | Crear nuevo registro de producción |

---

### Planeación

| Endpoint | Método | Descripción |
|---|---|---|
| `/api/planeacion/ordenes` | `GET` | Listar órdenes de producción |
| `/api/planeacion/ordenes` | `POST` | Crear nueva orden de producción |

---

### Director

| Endpoint | Método | Descripción |
|---|---|---|
| `/api/director/asignaciones` | `GET` | Listar asignaciones de supervisores |
| `/api/director/asignaciones` | `POST` | Crear nueva asignación |
| `/api/director/asignaciones` | `PUT` | Actualizar asignación existente |
| `/api/supervisores` | `GET` | Listar supervisores disponibles |
| `/api/lugares-trabajo` | `GET` | Listar lugares de trabajo activos |

---

### Gerencia

| Endpoint | Método | Descripción |
|---|---|---|
| `/api/gerente/kpis` | `GET` | Obtener indicadores del dashboard |

---

## Estructura sugerida de `src/services/`

Al desarrollar el backend, organizar los servicios por módulo:

```
services/
├── auth.service.js             # Login, logout, validación de sesión
├── produccion.service.js       # Registros de producción
├── planeacion.service.js       # Órdenes de producción
├── director.service.js         # Asignaciones y lugares de trabajo
└── gerencia.service.js         # KPIs y dashboard
```

---

## Datos mock a reemplazar

Al integrar el backend, estos archivos de `src/data/` deben reemplazarse por llamadas reales:

| Archivo mock | Módulo que lo consume | Servicio que lo reemplaza |
|---|---|---|
| `productosData.js` | Director, Supervisor | `produccion.service.js` |
| `paradasData.js` | Director, Asistente | `produccion.service.js` |
| `historicoData.js` | Gerencia, Director, Supervisor, Asistente | `gerencia.service.js` |
| `estilosFiltros.js` | Gerencia | Puede mantenerse en frontend |

---

## Autenticación

El backend debe retornar un **token JWT** al hacer login. El frontend lo almacenará y lo enviará en cada petición mediante el header:

```
Authorization: Bearer <token>
```

La lógica de almacenamiento y envío del token está preparada en `src/auth/authService.js`.