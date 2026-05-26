import { useState } from 'react'
import { FilePenLine, ChevronDown, Search, Plus, MapPin, CalendarDays } from 'lucide-react'
import RegistroModal from '../RegistroModal'

const HISTORICOS = [
  { id: 1, lugar: 'Tajado 1',     responsable: 'Carlos Mendoza', fecha: '12/05/2025' },
  { id: 2, lugar: 'Miele',        responsable: 'Laura Gómez',    fecha: '11/05/2025' },
  { id: 3, lugar: 'Tajado 2',     responsable: 'Pedro Ríos',     fecha: '10/05/2025' },
  { id: 4, lugar: 'Miele',        responsable: 'Carlos Mendoza',     fecha: '09/05/2025' },
  { id: 5, lugar: 'Tajado 2',     responsable: 'Carlos Mendoza',   fecha: '08/05/2025' },
  { id: 6, lugar: 'Tajado 1',     responsable: 'Pedro Ríos', fecha: '07/05/2025' },
  { id: 7, lugar: 'Tajado 3',     responsable: 'Laura Gómez',  fecha: '06/05/2025' },
  { id: 8, lugar: 'Tajado 3',     responsable: 'Pedro Ríos',    fecha: '05/05/2025' },
  { id: 9, lugar: 'Miele',        responsable: 'Pedro Ríos',  fecha: '04/05/2025' },
  { id: 10, lugar: 'Tajado 3',    responsable: 'Carlos Mendoza', fecha: '12/05/2025' },
  { id: 11, lugar: 'Miele',       responsable: 'Laura Gómez',    fecha: '11/05/2025' },
  { id: 12, lugar: 'Tajado 1',    responsable: 'Pedro Ríos',     fecha: '10/05/2025' },
  { id: 13, lugar: 'Tajado 2',    responsable: 'Pedro Ríos',     fecha: '09/05/2025' },
  { id: 14, lugar: 'Miele',       responsable: 'Laura Gómez',   fecha: '08/05/2025' },
  { id: 15, lugar: 'Tajado 1',    responsable: 'Laura Gómez', fecha: '07/05/2025' },
  { id: 16, lugar: 'Tajado 2',    responsable: 'Pedro Ríos',  fecha: '06/05/2025' },
  { id: 17, lugar: 'Tajado 1',    responsable: 'Laura Gómez',    fecha: '05/05/2025' },
  { id: 18, lugar: 'Miele',       responsable: 'Pedro Ríos',  fecha: '04/05/2025' },
]

const HOY = [
  { id: 1, lugar: 'Tajado 1', responsable: 'Carlos Mendoza', fecha: '13/05/2025' },
  { id: 2, lugar: 'Tajado 2',   responsable: 'Laura Gómez',    fecha: '13/05/2025' },
  { id: 3, lugar: 'Tajado 1',   responsable: 'Laura Gómez',    fecha: '13/05/2025' },
]

const MAX_HOY = 4
const LUGARES = ['Todos', 'Tajado 1', 'Tajado 2', 'Tajado 3', 'Miele' ]

function RegistroCard({ lugar, responsable, fecha, onEdit }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-1
                    hover:border-gray-300 hover:shadow-sm hover:scale-99 transition-all duration-200 group">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-gray-800 leading-snug">{lugar}</p>
        <button
          onClick={onEdit}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
                     text-gray-400 hover:text-red-600 p-0.5 rounded shrink-0 hover:cursor-pointer"
          aria-label="Editar registro"
        >
          <FilePenLine className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-gray-500"><span className="text-gray-400">Responsable: </span>{responsable}</p>
      <p className="text-xs text-gray-500"><span className="text-gray-400">Fecha de registro: </span>{fecha}</p>
    </div>
  )
}

function PlaceholderCard() {
  return <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 min-h-22" />
}

function SelectFiltro({ icon: Icon, placeholder, options, value, onChange }) {
  return (
    <div className="relative">
      {/* Icono izquierdo */}
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      )}
      
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full appearance-none bg-white border border-gray-200 rounded-lg pl-9
                  pr-8 py-2 text-xs text-gray-600 focus:outline-none focus:border-gray-300
                  transition-all duration-200 cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      
      {/* Icono derecho (Chevron) */}
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
    </div>
  )
}

export default function RegistroTurnos() {
  const [lugarFiltro,  setLugarFiltro]  = useState('')
  const [fechaFiltro,  setFechaFiltro]  = useState('')
  const [busquedaHoy,  setBusquedaHoy]  = useState('')
  const [modalAbierto, setModalAbierto] = useState(false)
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null)

  const abrirModalEdicion = (registro) => {
    setRegistroSeleccionado(registro)
    setModalAbierto(true)
  }

  const cerrarModal = () => {
    setModalAbierto(false)
    setRegistroSeleccionado(null)
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

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[26px] font-bold text-gray-900 pt-2 tracking-tight">Datos guardados</h1>
        <button
          onClick={() => { setRegistroSeleccionado(null); setModalAbierto(true); }}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 active:scale-[0.98]
                     text-white text-xs font-semibold px-4 py-2.5 rounded-lg
                     shadow-sm hover:shadow-md hover:cursor-pointer
                     transition-all duration-200"
        >
          <Plus className="w-3.5 h-3.5" />
          Agregar registro
        </button>
      </div>

      <div className="flex gap-6 items-start h-145">

        {/* ── Registros históricos ── */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <p className="text-sm font-semibold text-gray-500 tracking-wide">Registros históricos</p>

          <div className="flex gap-3">
            <div className="flex-1">
              <SelectFiltro 
                icon={MapPin} 
                placeholder="Lugar de producción" 
                options={LUGARES} 
                value={lugarFiltro} 
                onChange={setLugarFiltro} 
              />
            </div>
            <div className="flex-1">
              <SelectFiltro 
                icon={CalendarDays} 
                placeholder="Fecha" 
                options={[...new Set(HISTORICOS.map(r => r.fecha))]} 
                value={fechaFiltro} 
                onChange={setFechaFiltro} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 max-h-120 overflow-y-auto pr-1">
            {historicasFiltradas.length > 0
              ? historicasFiltradas.map(r => (
                  <RegistroCard key={r.id} {...r} onEdit={() => abrirModalEdicion(r)} />
                ))
              : <p className="col-span-3 text-xs text-gray-400 text-center py-8">Sin resultados</p>
            }
          </div>
        </div>

        <div className="w-px bg-gray-200 self-stretch mx-1 shrink-0" />

        {/* ── Registros de hoy ── */}
        <div className="w-74 flex flex-col gap-4 shrink-0">
          <p className="text-sm font-semibold text-gray-500 tracking-wide">Registros de hoy</p>

          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Lugar de producción"
              value={busquedaHoy}
              onChange={e => setBusquedaHoy(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg
                         pl-8 pr-3 py-2 text-xs text-gray-600 placeholder-gray-300
                         focus:outline-none focus:border-gray-300 transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-3">
            {hoyFiltrados.map(r => (
              <RegistroCard key={r.id} {...r} onEdit={() => abrirModalEdicion(r)} />
            ))}
            {Array.from({ length: placeholders }).map((_, i) => (
              <PlaceholderCard key={`ph-${i}`} />
            ))}
          </div>
        </div>

      </div>

      {modalAbierto && (
        <RegistroModal
          onClose={cerrarModal}
          onGuardar={(data) => console.log('Registro procesado:', data)}
          registroEditable={registroSeleccionado}
        />
      )}

    </div>
  )
}