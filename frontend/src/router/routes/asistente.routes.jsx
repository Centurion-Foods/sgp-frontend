import Layout          from "../../pages/asistente/AsistenteLayout"
import Registros        from "../../pages/supervisor/components/pages/RegistroTurnos"
import DatosHistoricos  from "../../pages/gerencia/components/pages/DatosHistoricos"
import RegistrodeParadas from "../../pages/director/components/pages/RegistrodeParadas"

const asistenteRoutes = {
    path: "/asistente",
    element: <Layout />,
    children: [
        {
            index: true,
            element: <Registros />
        },
        {
            path: "historicos",
            element: <DatosHistoricos />
        },
        {
            path: "registro-paradas",
            element: <RegistrodeParadas />
        }
  ]
}

export default asistenteRoutes