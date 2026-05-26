import DirectorLayout from "../../features/vistas/director/DirectorLayout"
import Dashboard from "../../features/vistas/gerencia/components/pages/Dashboard"
import DatosHistoricos from "../../features/vistas/gerencia/components/pages/DatosHistoricos"
import AsignacionSupervisores from "../../features/vistas/director/components/pages/AsignaciónSupervisores"
import RegistrodeParadas from "../../features/vistas/director/components/pages/RegistrodeParadas"
import RegistroProductos from "../../features/vistas/director/components/pages/RegistroProductos"

const directorRoutes = {
  path: "/director",
  element: <DirectorLayout />,
  children: [
    {
        index: true,
        element: <Dashboard />
    },
    {
        path: "historicos",
        element: <DatosHistoricos />
    },
    {
        path: "asignacion-supervisores",
        element: <AsignacionSupervisores />
    },
    {
        path: "registro-paradas",
        element: <RegistrodeParadas />
    },
    {
        path: "gestion-productos",
        element: <RegistroProductos mostrarTotal={true} />
    }
  ]
}

export default directorRoutes