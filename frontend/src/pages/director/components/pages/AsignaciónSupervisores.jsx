import SupervisorCard from "../SupervisorCard"

const LUGARES = ["Cárnicos", "Logika", "Quesos"]

const SUPERVISORES = [
  { id: 1, nombre: "Supervisor #1", porcentaje: 26, actual: 3312.4, objetivo: 12740, ultimoLugar: "Cárnicos" },
  { id: 2, nombre: "Supervisor #2", porcentaje: 31, actual: 3949.4, objetivo: 12740, ultimoLugar: "Logika"   },
  { id: 3, nombre: "Supervisor #3", porcentaje: 29, actual: 3694.6, objetivo: 12740, ultimoLugar: "Quesos"   },
]

export default function AsignacionSupervisores() {
  const handleAsignar = ({ supervisorId, lugar }) => {
    console.log(`Supervisor ${supervisorId} → ${lugar}`)
  }

  return (
    <div className="w-full max-w-9xl -mt-3 mx-auto p-6 max-h-140">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUPERVISORES.map((s) => (
          <SupervisorCard
            key={s.id}
            supervisor={{ ...s, onAsignar: handleAsignar }}
            lugares={LUGARES}
          />
        ))}
      </div>
    </div>
  )
}