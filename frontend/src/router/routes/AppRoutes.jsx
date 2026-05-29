/**
 * AppRoutes.jsx
 * Rutas protegidas con guards de autenticación y rol.
 */

import { useRoutes, Navigate } from "react-router-dom"
import { PrivateRoute, PublicRoute } from "../../auth/Guards"

import adminRoutes    from "./admin.routes"
import loginRoutes    from "./login.routes"
import gerenciaRoutes from "./gerencia.routes"
import directorRoutes from "./director.routes"
import supervisorRoutes from "./supervisor.routes"
import asistenteRoutes from "./asistente.routes"
import supervisorplaneacionRoutes from "./supervisorplaneacion.routes"

export default function AppRoutes() {
  return useRoutes([
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },

    {
      element: <PublicRoute />,
      children: [loginRoutes],
    },

    {
      element: <PrivateRoute roles={["admin"]} />,
      children: [adminRoutes],
    },

    {
      element: <PrivateRoute roles={["gerencia"]} />,
      children: [gerenciaRoutes],
    },

    {
      element: <PrivateRoute roles={["director"]} />,
      children: [directorRoutes],
    },

    {
      element: <PrivateRoute roles={["supervisor"]} />,
      children: [supervisorRoutes],
    },

    {
      element: <PrivateRoute roles={["asistente"]} />,
      children: [asistenteRoutes],
    },

    {
      element: <PrivateRoute roles={["supervisorplaneacion"]} />,
      children: [supervisorplaneacionRoutes],
    },

    {
      path: "*",
      element: <Navigate to="/login" replace />,
    },
  ])
}