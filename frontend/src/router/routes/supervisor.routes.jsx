import Layout          from "../../features/vistas/supervisor/SupervisorLayout"
import GestionProductos from "../../features/vistas/director/components/pages/RegistroProductos"
import Registros        from "../../features/vistas/supervisor/components/pages/RegistroTurnos"
import DatosHistoricos  from "../../features/vistas/gerencia/components/pages/DatosHistoricos"

const supervisorRoutes = {
  path: "/supervisor",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Registros />
    },
    {
      path: "gestion-productos",
      element: <GestionProductos />
    },
    {
      path: "historicos",
      element: <DatosHistoricos />
    }
  ]
}

export default supervisorRoutes