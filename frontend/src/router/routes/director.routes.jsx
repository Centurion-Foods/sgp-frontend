import DirectorLayout from "../../pages/director/DirectorLayout"
import Dashboard from "../../pages/gerencia/components/pages/Dashboard"
import DatosHistoricos from "../../pages/gerencia/components/pages/DatosHistoricos"
import AsignacionSupervisores from "../../pages/director/components/pages/AsignaciónSupervisores"
import RegistrodeParadas from "../../pages/director/components/pages/RegistrodeParadas"
import RegistroProductos from "../../pages/director/components/pages/RegistroProductos"

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