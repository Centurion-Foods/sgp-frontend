# 🏭 Producción Centurión

> Sistema de Gestión de Producción Industrial — Interfaz Web

![Estado](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow)
![Versión](https://img.shields.io/badge/Versión-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC?logo=tailwindcss)
![Licencia](https://img.shields.io/badge/Uso-Interno-red)

---

## 📋 Tabla de contenidos

- [¿Qué es Producción Centurión?](#-qué-es-producción-centurión)
- [Problema que resuelve](#-problema-que-resuelve)
- [Stack tecnológico](#-stack-tecnológico)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Instalación y ejecución local](#-instalación-y-ejecución-local)
- [Roles y accesos](#-roles-y-accesos)
- [Módulos de la aplicación](#-módulos-de-la-aplicación)
- [Integración con Backend](#-integración-con-backend)
- [Alcance de la versión actual](#-alcance-de-la-versión-actual)
- [Documentación adicional](#-documentación-adicional)
- [Contribuir al proyecto](#-contribuir-al-proyecto)

---

## 🏭 ¿Qué es Producción Centurión?

**Producción Centurión** es una aplicación web diseñada para digitalizar y centralizar la gestión de producción industrial de la empresa. Reemplaza el uso de hojas de cálculo dispersas en Excel y unifica en una sola plataforma el ingreso de órdenes de producción, el registro de producción por turno, la asignación de lugares de trabajo y el seguimiento gerencial en tiempo real.

La aplicación está construida como una **SPA (Single Page Application)** con React y Vite, con vistas diferenciadas por rol y preparada para conectarse a un backend REST en versiones futuras.

---

## 🔍 Problema que resuelve

Antes de esta solución, la operación enfrentaba los siguientes desafíos:

- Registro de producción manual y disperso en archivos Excel por área.
- Sin visibilidad consolidada para la gerencia sobre indicadores de producción.
- Proceso manual e ineficiente para que el Director asigne supervisores a los puestos de trabajo.
- Ausencia de un sistema centralizado que integre todos los roles del proceso productivo.

---

## 🛠️ Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| [React](https://react.dev/) | 18.x | Framework principal de UI |
| [Vite](https://vitejs.dev/) | Latest | Entorno de desarrollo y bundler |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x | Estilos y diseño responsivo |
| [React Router](https://reactrouter.com/) | 6.x | Navegación entre módulos |
| Node.js + npm | LTS | Gestión de dependencias |

---

## 📁 Estructura del proyecto

```
sgp-frontend/
└── frontend/
    ├── docs/                        # Documentación técnica del proyecto
    ├── public/
    └── src/
        ├── assets/                  # Imágenes, iconos y fuentes
        ├── auth/                    # Contextos, lógica y hooks de autenticación + Route Guards
        ├── data/                    # Datos mock estáticos (temporal hasta integración con backend)
        ├── pages/                   # Vistas principales organizadas por rol
        │   ├── asistente/           # Módulo Asistente de Producción
        │   ├── director/            # Módulo Director de Producción
        │   ├── gerencia/            # Dashboard Gerencial
        │   ├── login/               # Pantalla de inicio de sesión
        │   ├── supervisor/          # Módulo Supervisor de Producción
        │   └── supervisor_planeacion/ # Módulo Supervisor de Planeación
        ├── router/                  # Configuración de rutas con React Router
        ├── services/                # [Pendiente] Llamadas a la API REST
        └── shared/ui/               # Componentes reutilizables (Card, Tab, TabsContainer)
```

> Ver documentación detallada en [`frontend/docs/estructura.md`](./frontend/docs/estructura.md)

---

## 🚀 Instalación y ejecución local

### Requisitos previos

- [Node.js LTS](https://nodejs.org/) instalado
- npm

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Centurion-Foods/sgp-frontend.git
cd sgp-frontend/frontend

# 2. Instalar dependencias
npm install

# 3. Iniciar en modo desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:5173
```

### Construcción para producción

```bash
npm run build
```

---

## 👥 Roles y accesos

La aplicación define cinco roles con vistas y permisos diferenciados. La protección de rutas está gestionada mediante Route Guards en `src/auth/Guards.jsx`.

| Rol | Accesos y responsabilidades |
|---|---|
| **Asistente de Producción** | Registra la producción diaria por turno: línea, producto y unidades producidas. Consulta su historial de registros. |
| **Supervisor de Producción** | Monitorea los asistentes a su cargo, valida o rechaza registros de producción y reporta incidencias. Tiene un lugar de trabajo asignado por el Director. |
| **Supervisor de Planeación** | Ingresa las órdenes de producción que guían el trabajo de los asistentes. Rol independiente al Supervisor de Producción. |
| **Gerente** | Accede al dashboard ejecutivo con KPIs, gráficas comparativas y tendencias. Vista de solo lectura. |
| **Director de Producción** | Acceso total. Asigna y reasigna lugares de trabajo a supervisores y supervisa todos los módulos. |

> Ver detalle de rutas y permisos en [`frontend/docs/rutas-y-roles.md`](./frontend/docs/rutas-y-roles.md)

---

## 🧩 Módulos de la aplicación

### Supervisor de Planeación — Órdenes de producción
Permite ingresar las órdenes de producción que definen qué se debe producir, en qué línea y en qué cantidad. Es el punto de partida del flujo productivo. **[En desarrollo]**

### Asistente — Registro de producción
Permite ingresar los datos de producción por turno: línea, producto, unidades producidas y observaciones. Los registros quedan disponibles para validación del Supervisor de Producción.

### Supervisor de Producción — Panel de supervisión
Visualiza el avance de los asistentes asignados a su cargo. Permite aprobar o rechazar registros y reportar incidencias con impacto estimado.

### Gerente — Dashboard ejecutivo
Dashboard con KPIs de producción: totales por día, semana y mes, comparativas por línea y turno, y cumplimiento de metas. Gráficos interactivos con filtros por período y área.

### Director — Panel administrativo
Acceso global a todos los módulos. Incluye el módulo de asignación de supervisores: asignar o reasignar a cada supervisor un lugar de trabajo activo con confirmación inmediata.

---

## 🔌 Integración con Backend

La carpeta `src/services/` está reservada para conectarse a una API REST en una versión futura. Actualmente los datos de desarrollo se sirven desde `src/data/` como datos mock estáticos.

Los endpoints planeados son:

| Módulo | Endpoint | Método(s) |
|---|---|---|
| Autenticación | `/api/auth/login` | `POST` |
| Órdenes de producción | `/api/planeacion/ordenes` | `GET`, `POST` |
| Registro de producción | `/api/produccion/registros` | `GET`, `POST` |
| Asignación de supervisores | `/api/director/asignaciones` | `GET`, `POST`, `PUT` |
| Dashboard gerencial | `/api/gerente/kpis` | `GET` |
| Listado de supervisores | `/api/supervisores` | `GET` |
| Lugares de trabajo | `/api/lugares-trabajo` | `GET` |

> Ver documentación completa en [`frontend/docs/integracion-backend.md`](./frontend/docs/integracion-backend.md)

---

## 📦 Alcance de la versión actual

| | Descripción | Estado |
|---|---|---|
| ✅ | Interfaz de usuario completa (React + Vite + Tailwind) | Incluido en v1.0 |
| ✅ | Vistas diferenciadas por los 5 roles | Incluido en v1.0 |
| ✅ | Dashboard de producción (UI) | Incluido en v1.0 |
| ✅ | Módulo de asignación de lugares de trabajo (UI) | Incluido en v1.0 |
| ⏳ | Módulo Supervisor de Planeación | En desarrollo |
| ⏳ | Backend y API REST | Versión futura |
| ⏳ | Base de datos y persistencia | Versión futura |
| ⏳ | Autenticación y autorización real | Versión futura |
| ⏳ | Notificaciones y reportes automáticos | Versión futura |

---

## 📚 Documentación adicional

| Documento | Descripción |
|---|---|
| [`frontend/docs/estructura.md`](./frontend/docs/estructura.md) | Estructura de carpetas explicada |
| [`frontend/docs/rutas-y-roles.md`](./frontend/docs/rutas-y-roles.md) | Mapa de rutas y permisos por rol |
| [`frontend/docs/integracion-backend.md`](./frontend/docs/integracion-backend.md) | Puntos de integración con la API |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md) | Cómo contribuir al proyecto |
| [`CHANGELOG.md`](./CHANGELOG.md) | Historial de cambios |

---

## 🤝 Contribuir al proyecto

Para contribuir, por favor lee primero [`CONTRIBUTING.md`](./CONTRIBUTING.md) donde se detallan las convenciones de ramas, commits y pull requests del proyecto.

---

> **CONFIDENCIAL — USO INTERNO**
> Este proyecto es propiedad de Centurion Foods. No compartir fuera de los canales autorizados.