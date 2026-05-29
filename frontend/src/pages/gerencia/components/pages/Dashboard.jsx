import { useState } from "react"
import Card from "../../../../shared/ui/Card"
import Modal from "../../../../shared/ui/Modal"
import { Info, Clock, ClockAlert, PackageSearch, Settings } from "lucide-react"
import LineasChart from "../pages/charts/LineasChart"
import ObjetivoPie from "../pages/charts/ObjetivoPie"
import LineSelectionModal from "./components/LineSelectionModal"
import DashboardFooter from "./components/DashboardFooter"
import { useDashboardChart } from "./hooks/useDashboardChart"

export default function Dashboard() {
  const observaciones = [
    "Observación 1", "Observación 2", "Observación 3", "Observación 4",
    "Observación 5", "Observación 6", "Observación 7", "Observación 8",
  ]
  const lineOptions = ["Tajado 1", "Tajado 2", "Tajado 3", "Cárnicos", "Miele"]

  const { filtro, setFiltro, dataActual } = useDashboardChart()
  const [isQualityModalOpen, setIsQualityModalOpen] = useState(false)
  const [isLineModalOpen, setIsLineModalOpen] = useState(false)
  const [selectedLine, setSelectedLine] = useState(lineOptions[0])
  const [draftLine, setDraftLine] = useState(selectedLine)

  return (
    <main className="h-full min-h-0 flex flex-col space-y-4">
      <div className="grid lg:grid-cols-6 sm:grid-cols-2 gap-2 flex-1 min-h-0">
        
        <Card label="Observaciones de calidad" value="9" footerText="Más Información" isFirst={true} icon={Info}
          onFooterClick={() => setIsQualityModalOpen(true)} />
        <Card label="Horas efectivas" value="5" footerText="13/05/2026" icon={Clock} />
        <Card label="Horas paradas" value="1.5" footerText="13/05/2026" icon={ClockAlert} />
        <Card label="Kilos producidos" value="1837" footerText="13/05/2026" icon={PackageSearch} />

        <aside className="bg-white rounded-3xl shadow-sm border border-gray-100 col-span-2 row-span-2 flex flex-col h-full overflow-hidden">
          <div className="p-8 pb-0 flex justify-between items-start">
            <div>
              <h2 className="font-bold text-2xl text-gray-900">Objetivo Mensual</h2>
              <p className="text-gray-400 text-sm mt-1">Objetivo de producción establecido mensualmente.</p>
            </div>
            <button
              type="button"
              onClick={() => { setDraftLine(selectedLine); setIsLineModalOpen(true) }}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
              aria-label="Seleccionar línea de producción"
            >
              <Settings className="text-gray-400 hover:text-gray-700" size={20} />
            </button>
          </div>
          
          <div className="flex-1 px-8">
            <ObjetivoPie porcentaje={72} />
          </div>

          <div className="px-12 pb-8">
            <p className="text-gray-400 text-sm text-center leading-relaxed max-w-70 mx-auto">
              El día de hoy se han producido 2462 Kilos. Un poco más y llegamos al objetivo.
            </p>
          </div>

          <DashboardFooter />
        </aside>

        <Modal isOpen={isQualityModalOpen} title="Observaciones de calidad" onClose={() => setIsQualityModalOpen(false)}>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            {observaciones.map((item) => (
              <p key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-700/70 inline-block" />
                {item}
              </p>
            ))}
          </div>
        </Modal>

        <LineSelectionModal
          isOpen={isLineModalOpen}
          selectedLine={selectedLine}
          draftLine={draftLine}
          setDraftLine={setDraftLine}
          options={lineOptions}
          onClose={() => setIsLineModalOpen(false)}
          onSave={() => { setSelectedLine(draftLine); setIsLineModalOpen(false) }}
        />

        <section className="bg-white p-6 min-h-112.5 rounded-xl shadow col-span-4 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="font-medium text-2xl text-gray-800">Producción {filtro}</h2>
              <p className="text-gray-500 text-xs">
                Comparación entre periodo <span className="text-red-500 font-bold">actual</span> y <span className="text-amber-500 font-bold">anterior</span>
              </p>
            </div>

            <div className="flex bg-gray-100 p-1 font-medium rounded-lg">
              {['diaria', 'semanal', 'mensual'].map((op) => (
                <button
                  key={op}
                  onClick={() => setFiltro(op)}
                  className={`px-4 py-1.5 text-sm rounded-md capitalize transition-all ${
                    filtro === op ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full min-h-0 outline-none">
            <LineasChart data={dataActual} />
          </div>
        </section>
        
      </div>
    </main>
  )
}