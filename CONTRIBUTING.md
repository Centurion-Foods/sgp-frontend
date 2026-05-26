# 🤝 Guía de contribución

Este documento define las convenciones de trabajo del repositorio **sgp-frontend**. Seguirlas garantiza un historial de cambios limpio y fácil de rastrear.

---

## Flujo de trabajo

El repositorio tiene dos ramas principales:

| Rama | Propósito |
|---|---|
| `main` | Código estable. Solo recibe merges desde `develop` vía Pull Request. |
| `develop` | Rama de desarrollo activa. Aquí se trabaja el día a día. |

El flujo es siempre:

```
rama de trabajo → develop → main
```

Nunca se hace push directo a `main`.

---

## Ramas de trabajo

Para cualquier cambio, se crea una rama desde `develop` con el siguiente formato:

```
<tipo>/<descripción-corta>
```

### Tipos de rama

| Tipo | Cuándo usarlo |
|---|---|
| `feature/` | Nueva funcionalidad o vista |
| `fix/` | Corrección de un bug |
| `docs/` | Cambios en documentación |
| `refactor/` | Reestructuración de código sin cambiar funcionalidad |
| `style/` | Cambios de estilos o UI sin lógica |
| `chore/` | Tareas de mantenimiento (dependencias, configuración) |

### Ejemplos

```bash
feature/registro-turnos-asistente
fix/login-redirect-error
docs/estructura-carpetas
refactor/shared-components
style/dashboard-gerencia
chore/actualizar-dependencias
```

### Crear una rama de trabajo

```bash
git checkout develop
git pull origin develop
git checkout -b feature/nombre-de-la-funcionalidad
```

---

## Commits

Se usa la convención **Conventional Commits**. El formato es:

```
<tipo>(<alcance opcional>): <descripción en minúsculas>
```

### Tipos de commit

| Tipo | Cuándo usarlo |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Cambios en documentación |
| `style` | Formato, estilos visuales (sin lógica) |
| `refactor` | Refactorización sin cambio de funcionalidad |
| `chore` | Mantenimiento, dependencias, configuración |
| `wip` | Trabajo en progreso (no usar en merge a develop) |

### Ejemplos

```bash
feat(supervisor): agregar vista de registro de turnos
fix(auth): corregir redirección al expirar sesión
docs(estructura): actualizar árbol de carpetas
style(dashboard): ajustar colores de tarjetas KPI
refactor(shared): mover DatosHistoricos a carpeta shared
chore: actualizar dependencias de tailwind
```

### Reglas

- La descripción va en **minúsculas** y en **español**
- Sin punto al final
- Máximo 72 caracteres en la primera línea
- Si el cambio necesita más contexto, agregar cuerpo después de una línea en blanco

---

## Integrar cambios a develop

Cuando el trabajo en una rama esté listo:

```bash
# 1. Asegurarse de que develop está actualizado
git checkout develop
git pull origin develop

# 2. Volver a la rama de trabajo y hacer merge
git checkout feature/nombre-de-la-funcionalidad
git merge develop

# 3. Resolver conflictos si los hay, luego subir
git push origin feature/nombre-de-la-funcionalidad
```

Luego abrir un **Pull Request** en GitHub de la rama hacia `develop`.

---

## Integrar develop a main

Solo cuando hay una versión estable lista:

1. Abrir Pull Request de `develop` → `main` en GitHub
2. Revisar que todo funcione correctamente
3. Hacer merge
4. Crear un tag de versión:

```bash
git tag -a v1.0.0 -m "Release v1.0.0 — frontend completo"
git push origin v1.0.0
```

---

## Convenciones de código

| Convención | Detalle |
|---|---|
| Componentes | PascalCase → `SupervisorCard.jsx` |
| Hooks | Prefijo `use` → `useAuth.js` |
| Servicios | Sufijo `Service` → `authService.js` |
| Archivos de rutas | Sufijo `.routes` → `supervisor.routes.jsx` |
| Variables y funciones | camelCase → `registroTurno`, `handleSubmit` |
| Estilos | Clases de Tailwind CSS — sin CSS inline salvo excepciones justificadas |

---

## Comandos útiles

```bash
# Ver estado del repositorio
git status

# Ver historial de commits
git log --oneline

# Actualizar rama local desde remoto
git pull origin develop

# Ver ramas disponibles
git branch -a
```
