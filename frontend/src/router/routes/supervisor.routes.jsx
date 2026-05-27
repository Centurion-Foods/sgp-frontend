import Layout          from "../../pages/supervisor/SupervisorLayout"
import GestionProductos from "../../pages/director/components/pages/RegistroProductos"
import Registros        from "../../pages/supervisor/components/pages/RegistroTurnos"
import DatosHistoricos  from "../../pages/gerencia/components/pages/DatosHistoricos"

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