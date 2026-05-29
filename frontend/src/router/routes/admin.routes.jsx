import AdminLayout from "../../pages/admin/AdminLayout"
import UsuariosPage from "../../pages/admin/components/pages/user/UsuariosPage"
import RolesPage from "../../pages/admin/components/pages/roles/RolesPage"
import Permisos from "../../pages/admin/components/pages/permisos/PermisosPage"

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