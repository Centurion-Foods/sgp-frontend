import Layout from "../../features/vistas/gerencia/components/GerenciaLayout"
import Dashboard from "../../features/vistas/gerencia/components/pages/Dashboard"
import DatosHistoricos from "../../features/vistas/gerencia/components/pages/DatosHistoricos"

const gerenciaRoutes = {
    path: "/gerencia",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "historicos",
        element: <DatosHistoricos />
      }
  ]
}

export default gerenciaRoutes