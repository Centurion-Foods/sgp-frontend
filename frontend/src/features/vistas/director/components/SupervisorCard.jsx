import { useState } from "react"
import { Settings, ChevronDown, ArrowDown } from "lucide-react"
import RingProgress from "../charts/RingProgress"
import ModalObjetivo from "./ObjetivoModal"

export default function SupervisorCard({ supervisor, lugares = [] }) {
  const [lugar, setLugar] = useState("")
  const [showModal, setShowModal] = useState(false)

  const handleAsignar = () => {
    if (!lugar) return
    supervisor.onAsignar?.({ supervisorId: supervisor.id, lugar })
    setLugar("")
  }

  const esBotonDeshabilitado = !lugar

  return (
    <div className="bg-white rounded-3xl border border-gray-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-6 flex flex-col gap-5 w-full h-160 relative">
      
      <h3 className="text-2xl font-bold text-gray-900 text-center tracking-tight pt-1">
        {supervisor.nombre}
      </h3>

      <div className="flex items-center justify-between gap-4 mt-2">
        <div className="flex flex-col gap-1.5 max-w-[70%]">
          <span className="text-[22px] font-medium text-gray-800 leading-tight">
            Progreso de Objetivo Individual
          </span>
          <span className="flex items-center mt-2 gap-1 text-md text-gray-400 font-normal">
            {supervisor.actual.toFixed(1)} / {supervisor.objetivo} Kg
            <button 
              type="button"
              onClick={() => setShowModal(true)}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors ml-1 group"
              title="Ajustar objetivo mensual"
            >
              <Settings className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors hover:cursor-pointer" strokeWidth={2} />
            </button>
          </span>
        </div>
        <RingProgress pct={supervisor.porcentaje} />
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <span className="text-[15px] font-light text-gray-800">
          Último lugar asignado
        </span>
        <div className="w-full bg-[#f8f9fa] border border-gray-200/80 px-4 py-3 rounded-lg text-[14px] text-gray-700 font-normal">
          {supervisor.ultimoLugar ?? "—"}
        </div>
      </div>

      <div className="flex justify-center my-1 text-[#c92121]">
        <ArrowDown className={`w-16 h-16 my-4 transition-opacity duration-300 ${esBotonDeshabilitado ? 'opacity-30 text-gray-400' : 'opacity-100 text-[#c92121]'}`} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[15px] font-light text-gray-800">
          Lugar a asignar
        </span>
        <div className="relative w-full">
          <select
            value={lugar}
            onChange={(e) => setLugar(e.target.value)}
            className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-lg pl-4 pr-10 py-3 text-[14px] text-gray-600 font-normal appearance-none hover:cursor-pointer focus:outline-none focus:border-gray-300 transition-colors"
          >
            <option value="" className="text-gray-400">Seleccione un lugar</option>
            {lugares.map((l) => (
              <option key={l} value={l} className="text-gray-800">{l}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="mt-auto pt-2">
        <button
          onClick={handleAsignar}
          disabled={esBotonDeshabilitado}
          className={`w-full text-[15px] font-semibold py-3.5 rounded-xl transition-all shadow-sm ${
            esBotonDeshabilitado
              ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              : "bg-[#c92121] hover:bg-[#b01c1c] text-white active:scale-[0.99]"
          }`}
        >
          Asignar
        </button>
      </div>

      <ModalObjetivo 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        supervisor={supervisor}
        onGuardar={supervisor.onUpdateObjetivo}
      />

    </div>
  )
}