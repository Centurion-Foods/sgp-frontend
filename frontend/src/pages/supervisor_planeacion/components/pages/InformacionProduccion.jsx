import { useMemo, useState } from "react"
import { Calendar, ChevronDown, Hash, Plus } from "lucide-react"
import MiniCalendar from "../../../gerencia/components/MiniCalendar"
import RegistrarOrdenModal from "../RegistrarOrdenModal"
import { PRODUCCION_DATA, ANALISIS_POR_LINEA } from "../../../../data/supervisorproduccion/mock-registros"
import FilterInput from "../../../../shared/ui/FilterInput"
import TablaOrdenes from "../subcomponents/TablaOrdenes"
import AnalisisParadas from "../subcomponents/AnalisisParadas"

const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

export default function InformacionProduccion() {
  const [produccion,      setProduccion]      = useState(PRODUCCION_DATA)
  const [filtroCodigo,    setFiltroCodigo]    = useState("")
  const [filtroMP,        setFiltroMP]        = useState("")
  const [selectedDate,    setSelectedDate]    = useState("")
  const [añoAbierto,      setAñoAbierto]      = useState("2026")
  const [mesAbierto,      setMesAbierto]      = useState(PRODUCCION_DATA[0].month)
  const [lineaAbierta,    setLineaAbierta]    = useState("Tajado 1")
  const [isRegistrarOpen, setIsRegistrarOpen] = useState(false)

  const toggleAño   = (año)   => setAñoAbierto(prev  => prev  === año   ? null : año)
  const toggleMes   = (month) => setMesAbierto(prev  => prev  === month ? null : month)
  const toggleLinea = (linea) => setLineaAbierta(prev => prev === linea ? null : linea)

  const handleGuardar = (data) => {
    const partes   = data.fecha.split("/")
    const mes      = partes[1] ?? "05"
    const año      = partes[2] ?? "2026"
    const monthKey = `${MESES[parseInt(mes) - 1]} ${año}`
    const newReg   = { ...data, id: Date.now() }

    setProduccion((prev) => {
      const existe = prev.find((m) => m.month === monthKey)
      if (existe) return prev.map((m) => m.month === monthKey ? { ...m, registros: [...m.registros, newReg] } : m)
      return [...prev, { month: monthKey, registros: [newReg] }]
    })
    setIsRegistrarOpen(false)
  }

  const produccionFiltrada = useMemo(() =>
    produccion.map((mes) => ({
      ...mes,
      registros: mes.registros.filter((reg) => {
        const cumpleCodigo = filtroCodigo === "" || reg.codigo.toLowerCase().includes(filtroCodigo.toLowerCase())
        const cumpleMP     = filtroMP     === "" || String(reg.codigoMP).toLowerCase().includes(filtroMP.toLowerCase())
        let cumpleFecha = true
        if (selectedDate) {
          const partes = reg.fecha.split("/")
          const iso    = partes.length === 3 ? `${partes[2]}-${partes[1].padStart(2,"0")}-${partes[0].padStart(2,"0")}` : ""
          cumpleFecha  = iso === selectedDate
        }
        return cumpleCodigo && cumpleMP && cumpleFecha
      }),
    })).filter((mes) => mes.registros.length > 0),
  [produccion, filtroCodigo, filtroMP, selectedDate])

  const agrupadosPorAño = useMemo(() =>
    produccionFiltrada.reduce((acc, item) => {
      const [, ano] = item.month.split(" ")
      if (!acc[ano]) acc[ano] = []
      acc[ano].push(item)
      return acc
    }, {}),
  [produccionFiltrada])

  const añosOrdenados = useMemo(() =>
    Object.keys(agrupadosPorAño).sort((a, b) => b - a),
  [agrupadosPorAño])

  return (
    <div className="h-full space-y-5 text-gray-800 p-1">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[13px] text-gray-500 font-bold mb-2">Filtros</p>
          <div className="flex flex-wrap gap-3">
            <FilterInput
              icon={Hash}
              placeholder="Código del Producto"
              value={filtroCodigo}
              onChange={setFiltroCodigo}
            />
            <FilterInput
              icon={Hash}
              placeholder="Código MP"
              value={filtroMP}
              onChange={setFiltroMP}
            />
            <FilterInput
              icon={Calendar}
              placeholder="Fecha"
              value={selectedDate}
              desplegable
              onClear={() => setSelectedDate("")}
            >
              <MiniCalendar
                value={selectedDate || undefined}
                onChange={(iso) => setSelectedDate(iso)}
              />
            </FilterInput>
          </div>
        </div>
        <button
          onClick={() => setIsRegistrarOpen(true)}
          className="inline-flex items-center gap-2 bg-red-700/90 hover:bg-red-800 text-white font-medium px-4 py-2 rounded-xl transition-all text-sm shadow-sm shrink-0 hover:scale-98"
        >
          <Plus className="w-4 h-4" /> Nuevo Registro
        </button>
      </div>

      <div className="pt-1">
        <h1 className="text-[26px] font-bold text-gray-900 tracking-tight">Información de producción</h1>
      </div>

      <div className="w-full space-y-6">
        {añosOrdenados.map((año) => {
          const isAnoOpen = añoAbierto === año
          return (
            <div key={año}>
              <div onClick={() => toggleAño(año)} className="flex items-center gap-2 cursor-pointer select-none group border-b-2 border-gray-900/10 pb-1.5 mb-3">
                <h2 className="text-[22px] font-extrabold text-gray-800 tracking-tight group-hover:text-[#c92121] transition-colors">{año}</h2>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isAnoOpen ? "rotate-180 text-gray-700" : ""}`} />
              </div>
              <div className={`grid transition-all duration-300 ease-in-out ${isAnoOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 overflow-hidden pointer-events-none"}`}>
                <div className="overflow-hidden space-y-3 pl-1">
                  {agrupadosPorAño[año].map((mes) => {
                    const isMesOpen      = mesAbierto === mes.month
                    const [soloNombreMes] = mes.month.split(" ")
                    return (
                      <div key={mes.month}>
                        <div onClick={() => toggleMes(mes.month)} className="flex items-center gap-1.5 cursor-pointer select-none group border-b border-gray-200/70 pb-1 mb-2 w-full">
                          <h3 className="text-[15px] font-bold text-gray-400 group-hover:text-gray-600 transition-colors">
                            {soloNombreMes} <span className="text-[11px] font-normal text-gray-400/80">({mes.registros.length})</span>
                          </h3>
                          <ChevronDown className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${isMesOpen ? "rotate-180" : ""}`} />
                        </div>
                        <div className={`grid transition-all duration-300 ease-in-out ${isMesOpen ? "grid-rows-[1fr] opacity-100 mb-4" : "grid-rows-[0fr] opacity-0 overflow-hidden pointer-events-none"}`}>
                          <div className="overflow-hidden">
                            <div className="flex gap-5 items-start">
                              <TablaOrdenes registros={mes.registros} />
                              <AnalisisParadas
                                data={ANALISIS_POR_LINEA}
                                lineaAbierta={lineaAbierta}
                                onToggle={toggleLinea}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
        {añosOrdenados.length === 0 && (
          <div className="text-center py-12 text-sm text-gray-400 font-medium">No se encontraron registros que coincidan con los filtros aplicados.</div>
        )}
      </div>

      <RegistrarOrdenModal isOpen={isRegistrarOpen} onClose={() => setIsRegistrarOpen(false)} onSave={handleGuardar} />
    </div>
  )
}