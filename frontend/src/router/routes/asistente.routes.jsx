import Layout          from "../../features/vistas/asistente/AsistenteLayout"
import Registros        from "../../features/vistas/supervisor/components/pages/RegistroTurnos"
import DatosHistoricos  from "../../features/vistas/gerencia/components/pages/DatosHistoricos"
import RegistrodeParadas from "../../features/vistas/director/components/pages/RegistrodeParadas"

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