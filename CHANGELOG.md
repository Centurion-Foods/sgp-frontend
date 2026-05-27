# Changelog

Todos los cambios relevantes del proyecto **Producción Centurión** se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/) y el proyecto sigue [Semantic Versioning](https://semver.org/lang/es/).

---

## [Sin publicar] — En desarrollo

### Agregado
- Estructura base del proyecto con React + Vite + Tailwind CSS
- Sistema de autenticación con Context API (Guards, AuthContext, useAuth)
- Módulo de Gerencia: dashboard con KPIs y datos históricos de producción
- Módulo de Director: dashboard, asignación de supervisores, registro de paradas y gestión de productos
- Módulo de Supervisor: registro de turnos, gestión de productos e histórico
- Módulo de Asistente: registro de turnos, histórico y registro de paradas
- Panel de administración (uso interno): gestión de usuarios, roles y permisos
- Componentes compartidos: `Card`, `Tab`, `TabsContainer`
- Configuración de rutas protegidas por rol con React Router 6
- Datos mock temporales en `src/data/` para desarrollo sin backend
- Documentación técnica: README, estructura, rutas y roles, guía de contribución

### Pendiente
- Módulo de Supervisor de Planeación (vistas y rutas)
- Integración con backend y API REST
- Autenticación real (reemplaza mock actual)
- Exportación de reportes

---

## [1.0.0] — Por publicar

> Esta versión se cerrará cuando el frontend esté completo y listo para integrarse con el backend.

---

## Cómo actualizar este archivo

Cada vez que se mergea algo relevante a `develop` o `main`, agregar la entrada correspondiente bajo la sección `[Sin publicar]` usando estas categorías:

| Categoría | Cuándo usarla |
|---|---|
| `Agregado` | Nueva funcionalidad |
| `Cambiado` | Cambio en funcionalidad existente |
| `Corregido` | Bug corregido |
| `Eliminado` | Funcionalidad removida |
<<<<<<< HEAD
| `Deprecado` | Funcionalidad que será removida próximamente |
=======
| `Deprecado` | Funcionalidad que será removida próximamente |
>>>>>>> 824a5e0d4cce307f3be623e3389d23502d1eb27d
