import AdminLayout from "../../features/vistas/admin/components/AdminLayout"
import UsuariosPage from "../../features/vistas/admin/components/pages/usuarios/UsuariosPage"
import RolesPage from "../../features/vistas/admin/components/pages/roles/RolesPage"
import Permisos from "../../features/vistas/admin/components/pages/permisos/PermisosPage"

const adminRoutes = {
    path: "/admin",
    element: <AdminLayout />,
    children: [
        {
            index: true,
            element: <UsuariosPage />
        },
        {
            path: "roles",
            element: <RolesPage />
        },
        {
            path: "permisos",
            element: <Permisos />
        }

    ]
} 

export default adminRoutes