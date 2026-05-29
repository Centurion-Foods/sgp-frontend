import { useState } from 'react'
import { Plus, MapPin, CalendarDays, Search } from 'lucide-react'
import RegistroModal from '../RegistroModal'
import { HISTORICOS, HOY, MAX_HOY, LUGARES } from '../../../../data/supervisor/mock-registroturnos'
import RegistroCard from '../subcomponents/RegistroCard'
import FilterInput from '../../../../shared/ui/FilterInput'

export default function RegistroTurnos() {
  const [lugarFiltro,       setLugarFiltro]       = useState('')
  const [fechaFiltro,       setFechaFiltro]       = useState('')
  const [busquedaHoy,       setBusquedaHoy]       = useState('')
  const [isModalOpen,       setIsModalOpen]       = useState(false)
  const [registroParaModal, setRegistroParaModal] = useState(null)

  const abrirModal = (registro = null) => {
    setRegistroParaModal(registro)
    setIsModalOpen(true)
  }

  const cerrarModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setRegistroParaModal(null), 200)
  }

  const historicasFiltradas = HISTORICOS.filter(r => {
    const matchLugar = !lugarFiltro || lugarFiltro === 'Todos' || r.lugar === lugarFiltro
    const matchFecha = !fechaFiltro || r.fecha === fechaFiltro
    return matchLugar && matchFecha
  })

  const hoyFiltrados = HOY.filter(r =>
    !busquedaHoy || r.lugar.toLowerCase().includes(busquedaHoy.toLowerCase())
  )

  const placeholders = Math.max(0, MAX_HOY - hoyFiltrados.length)

  const fechasUnicas = [...new Set(HISTORICOS.map(r => r.fecha))]

  return (
    <div className="flex flex-col gap-6">

      <div className="flex items-center justify-between">
        <h1 className="text-[26px] font-bold text-gray-900 pt-2 tracking-tight">Datos guardados</h1>
        <button onClick={() => abrirModal()} className="inline-flex items-center gap-2 bg-red-700/90 hover:bg-red-800 text-white font-medium px-4 py-2 rounded-xl transition-all text-sm shadow-sm shrink-0 hover:scale-98">
          <Plus className="w-3.5 h-3.5" />
          Agregar registro
        </button>
      </div>

      <div className="flex gap-6 items-start h-145">

        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <p className="text-sm font-semibold text-gray-500 tracking-wide">Registros históricos</p>
          <div className="flex gap-3">
            <FilterInput
              icon={MapPin}
              placeholder="Lugar de producción"
              value={lugarFiltro}
              desplegable
              options={["Todos", ...LUGARES]}
              onChange={setLugarFiltro}
              onClear={() => setLugarFiltro("")}
            />
            <FilterInput
              icon={CalendarDays}
              placeholder="Fecha"
              value={fechaFiltro}
              desplegable
              options={fechasUnicas}
              onChange={setFechaFiltro}
              onClear={() => setFechaFiltro("")}
            />
          </div>
          <div className="grid grid-cols-3 gap-3 max-h-120 overflow-y-auto pr-1">
            {historicasFiltradas.length > 0
              ? historicasFiltradas.map(r => <RegistroCard key={r.id} {...r} onEdit={() => abrirModal(r)} />)
              : <p className="col-span-3 text-xs text-gray-400 text-center py-8">Sin resultados</p>
            }
          </div>
        </div>

        <div className="w-px bg-gray-200 self-stretch mx-1 shrink-0" />

        <div className="w-74 flex flex-col gap-4 shrink-0">
          <p className="text-sm font-semibold text-gray-500 tracking-wide">Registros de hoy</p>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Lugar de producción"
              value={busquedaHoy}
              onChange={e => setBusquedaHoy(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-xs text-gray-600 placeholder-gray-300 focus:outline-none focus:border-gray-300 transition-all duration-200"
            />
          </div>
          <div className="flex flex-col gap-3">
            {hoyFiltrados.map(r => <RegistroCard key={r.id} {...r} onEdit={() => abrirModal(r)} />)}
            {Array.from({ length: placeholders }).map((_, i) => (
              <div key={`ph-${i}`} className="border-2 border-dashed border-gray-200 rounded-xl p-4 min-h-22" />
            ))}
          </div>
        </div>

      </div>

      <RegistroModal
        isOpen={isModalOpen}
        onClose={cerrarModal}
        onGuardar={(data) => console.log('Registro procesado:', data)}
        registroEditable={registroParaModal}
      />

    </div>
  )
}