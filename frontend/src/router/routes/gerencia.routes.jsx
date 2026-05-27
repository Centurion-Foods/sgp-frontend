import Layout from "../../pages/gerencia/components/GerenciaLayout"
import Dashboard from "../../pages/gerencia/components/pages/Dashboard"
import DatosHistoricos from "../../pages/gerencia/components/pages/DatosHistoricos"

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