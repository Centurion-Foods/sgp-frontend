/**
 * authHelpers.js
 * Constantes y utilidades de autenticación.
 * Separado de guards.jsx para compatibilidad con Fast Refresh.
 */

export const ROLE_HOME = {
  admin:    "/admin",
  gerencia: "/gerencia",
  director: "/director",
  supervisor: "/supervisor",
  asistente: "/asistente",
}

export function getRoleHome(role) {
  return ROLE_HOME[role] ?? "/login"
}