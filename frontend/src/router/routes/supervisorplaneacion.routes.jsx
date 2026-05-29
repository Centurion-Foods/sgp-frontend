import Layout          from "../../pages/supervisor_planeacion/SupervisorPLayout"
import RegistrodeParadas from "../../pages/director/components/pages/RegistrodeParadas"
import InformacionProduccion from "../../pages/supervisor_planeacion/components/pages/InformacionProduccion"

const supervisorplaneacionRoutes = {
    path: "/supervisorplaneacion",
    element: <Layout />,
    children: [
        {
            index: true,
            element: <InformacionProduccion />
        },
        {
            path: "paradas",
            element: <RegistrodeParadas />
        }
  ]
}

export default supervisorplaneacionRoutes