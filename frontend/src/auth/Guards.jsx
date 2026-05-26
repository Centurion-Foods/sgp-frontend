import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "./useAuth"
import { getRoleHome } from "./authHelpers"
import AuthLoading from "./AuthLoading"

export function PrivateRoute({ roles, redirectTo = "/login" }) {
  const { isAuthenticated, isLoading, role } = useAuth()
  const location = useLocation()

  if (isLoading) return <AuthLoading />

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to={getRoleHome(role)} replace />
  }

  return <Outlet />
}

export function PublicRoute() {
  const { isAuthenticated, isLoading, role } = useAuth()
  const location = useLocation()

  if (isLoading) return <AuthLoading />

  if (isAuthenticated) {
    const destination = location.state?.from?.pathname ?? getRoleHome(role)
    return <Navigate to={destination} replace />
  }

  return <Outlet />
}