import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronDown, MapPin, Binary, Tag, Info, X, Plus } from "lucide-react"; // + Plus
import MiniCalendar from "../../../gerencia/components/MiniCalendar";
import ParadasTotalesModal from "../ParadasTotalesModal";
import RegistrarParadaModal from "../../../asistente/components/RegistrarParadaModal";
import { COLUMNAS_TABLA, registroHistorico } from "../../../../data/paradasData";
import { useAuth } from "../../../../auth/useAuth";

const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

const estilos = {
  filtros: "outline-none block w-full rounded-xl text-gray-500 max-w-xs text-xs border border-gray-200 bg-white pl-9 pr-9 py-2.5 appearance-none placeholder:text-gray-400 focus:outline-none focus:border-gray-300 transition-colors"
};

export default function RegistrodeParadas() {

  const { user } = useAuth();
  const esAsistente = user?.role === "asistente";

  const [registros, setRegistros] = useState(registroHistorico);
  const [filtroLinea, setFiltroLinea] = useState("");
  const [filtroCodigo, setFiltroCodigo] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [anoAbierto, setAnoAbierto] = useState("2026");
  const [mesAbierto, setMesAbierto] = useState(null);

  const [mesParaModal, setMesParaModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistrarOpen, setIsRegistrarOpen] = useState(false);

  const calendarRef = useRef(null);

  const toggleAno = (ano) => setAnoAbierto(anoAbierto === ano ? null : ano);
  const toggleMes = (month) => setMesAbierto(mesAbierto === month ? null : month);

  const abrirModal = (mes) => { setMesParaModal(mes); setIsModalOpen(true); };
  const cerrarModal = () => { setIsModalOpen(false); setTimeout(() => setMesParaModal(null), 200); };

  const handleRegistrar = (data) => {
    const [, mes, ano] = data.fecha.split("/");
    const monthKey = `${MESES[parseInt(mes) - 1]} ${ano}`;
    setRegistros(prev => {
      const existe = prev.find(m => m.month === monthKey);
      if (existe) return prev.map(m => m.month === monthKey ? { ...m, registros: [...m.registros, data] } : m);
      return [...prev, { month: monthKey, registros: [data] }];
    });
    setIsRegistrarOpen(false);
  };

  const registrosFiltrados = registros.map((mes) => { // registroHistorico → registros
    const filasFiltradas = mes.registros.filter((reg) => {
      const cumpleLinea     = filtroLinea     === "" || reg.linea     === filtroLinea;
      const cumpleCodigo    = filtroCodigo    === "" || reg.codigo.toLowerCase().includes(filtroCodigo.toLowerCase());
      const cumpleCategoria = filtroCategoria === "" || reg.categoria === filtroCategoria;
      let cumpleFecha = true;
      if (selectedDate) {
        const [dia, mesReg, anoReg] = reg.fecha.split("/");
        cumpleFecha = `${anoReg}-${mesReg}-${dia}` === selectedDate;
      }
      return cumpleLinea && cumpleCodigo && cumpleCategoria && cumpleFecha;
    });
    return { ...mes, registros: filasFiltradas };
  }).filter(mes => mes.registros.length > 0);

  const datosAgrupadosPorAno = registrosFiltrados.reduce((acc, item) => {
    const [, ano] = item.month.split(" ");
    if (!acc[ano]) acc[ano] = [];
    acc[ano].push(item);
    return acc;
  }, {});

  const anosOrdenados = Object.keys(datosAgrupadosPorAno).sort((a, b) => b - a);
  const resetFecha = (e) => { e.stopPropagation(); setSelectedDate(""); };

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target) && !event.target.closest('[data-calendar-button]'))
        setShowCalendar(false);
    }
    function handleKeyDown(e) { if (e.key === "Escape") setShowCalendar(false); }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => { document.removeEventListener("mousedown", handleClickOutside); document.removeEventListener("keydown", handleKeyDown); };
  }, []);

  return (
    <div className="h-full space-y-5 text-gray-800 p-1">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[13px] text-gray-500 font-bold mb-2">Filtros</p>
          <div className="flex flex-wrap gap-3">
            <div className="relative w-48">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              <select value={filtroLinea} onChange={(e) => setFiltroLinea(e.target.value)} className={estilos.filtros}>
                <option value="">Todas las Líneas</option>
                <option value="Tajado 1">Tajado 1</option>
                <option value="Porcionado">Porcionado</option>
                <option value="Azul">Azul</option>
                <option value="Normalización">Normalización</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="relative w-48">
              <Binary className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Código PT" value={filtroCodigo} onChange={(e) => setFiltroCodigo(e.target.value)} className={estilos.filtros} />
            </div>
            <div className="relative w-48">
              <Tag className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)} className={estilos.filtros}>
                <option value="">Todas las Categorías</option>
                <option value="Cambio de insumo">Cambio de insumo</option>
                <option value="Mantenimiento">Mantenimiento</option>
                <option value="Sanidad">Sanidad</option>
                <option value="Mecánica">Mecánica</option>
                <option value="Logística">Logística</option>
                <option value="Operación">Operación</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="relative w-48">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              <button type="button" data-calendar-button onClick={() => setShowCalendar((v) => !v)} className={`${estilos.filtros} text-left text-gray-400 pr-8`}>
                {selectedDate ? <span className="text-gray-700">{selectedDate}</span> : <span>Fecha</span>}
              </button>
              {selectedDate
                ? <X onClick={resetFecha} className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer" />
                : <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              }
              {showCalendar && (
                <div ref={calendarRef} className="absolute top-full mt-2 left-0 z-50">
                  <MiniCalendar value={selectedDate || undefined} onChange={(iso) => { setSelectedDate(iso); setShowCalendar(false); }} />
                </div>
              )}
            </div>
          </div>
        </div>
        {esAsistente && (
          <button
            onClick={() => setIsRegistrarOpen(true)}
            className="inline-flex items-center gap-2 bg-red-700/90 hover:bg-red-800 text-white font-medium px-4 py-2 rounded-xl transition-all text-sm shadow-sm"
          >
            <Plus className="w-4 h-4" /> Registrar parada
          </button>
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <h1 className="text-[26px] font-bold text-gray-900 tracking-tight">Registro histórico de paradas</h1>
      </div>

      <div className="w-full space-y-6 pt-2">
        {anosOrdenados.map((ano) => {
          const isAnoOpen = anoAbierto === ano;
          return (
            <div key={ano} className="transition-all">
              <div onClick={() => toggleAno(ano)} className="flex items-center gap-2 cursor-pointer select-none group border-b-2 border-gray-900/10 pb-1.5 mb-3">
                <h2 className="text-[22px] font-extrabold text-gray-800 tracking-tight group-hover:text-[#c92121] transition-colors">{ano}</h2>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isAnoOpen ? "rotate-180 text-gray-700" : "rotate-0"}`} />
              </div>
              <div className={`grid transition-all duration-300 ease-in-out ${isAnoOpen ? "grid-rows-[1fr] opacity-100 mb-2" : "grid-rows-[0fr] opacity-0 overflow-hidden pointer-events-none"}`}>
                <div className="overflow-hidden space-y-3 pl-1">
                  {datosAgrupadosPorAno[ano].map((mes) => {
                    const isMesOpen = mesAbierto === mes.month;
                    const [soloNombreMes] = mes.month.split(" ");
                    return (
                      <div key={mes.month}>
                        <div className="flex items-center justify-between w-full border-b border-gray-200/70 pb-1 mb-2">
                          <div onClick={() => toggleMes(mes.month)} className="flex items-center gap-1.5 cursor-pointer select-none group">
                            <h3 className="text-[15px] font-bold text-gray-400 group-hover:text-gray-600 transition-colors">
                              {soloNombreMes} <span className="text-[11px] font-normal text-gray-400/80">({mes.registros.length})</span>
                            </h3>
                            <ChevronDown className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${isMesOpen ? "rotate-180" : "rotate-0"}`} />
                          </div>
                          <button onClick={() => abrirModal(mes.month)} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 font-medium underline underline-offset-2">
                            <Info className="h-4 w-4" /> Totales {soloNombreMes}
                          </button>
                        </div>
                        <div className={`grid transition-all duration-300 ease-in-out ${isMesOpen ? "grid-rows-[1fr] opacity-100 mb-4" : "grid-rows-[0fr] opacity-0 overflow-hidden pointer-events-none"}`}>
                          <div className="overflow-hidden">
                            <div className="w-full overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-2xs max-h-120 overflow-y-auto custom-scrollbar">
                              <table className="w-full text-left border-collapse table-auto">
                                <thead>
                                  <tr className="bg-[#f8f9fa] border-b border-gray-200 sticky top-0 z-10">
                                    {COLUMNAS_TABLA.map((col, idx) => (
                                      <th key={col.llave} className={`${idx === 0 ? "pl-3" : "p-3"} text-[13px] font-semibold text-gray-700 tracking-wide whitespace-nowrap`}>
                                        {col.etiqueta}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                  {mes.registros.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                      {COLUMNAS_TABLA.map((col) => (
                                        <td key={col.llave} className={`p-3 text-[12px] text-gray-600 whitespace-nowrap ${col.esResaltado ? "font-medium" : ""}`}>
                                          {item[col.llave]}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
        {anosOrdenados.length === 0 && (
          <div className="text-center py-12 text-sm text-gray-400 font-medium">No se encontraron registros que coincidan con los filtros aplicados.</div>
        )}
      </div>

      <ParadasTotalesModal isOpen={isModalOpen} mesSeleccionado={mesParaModal} onClose={cerrarModal} />

      {esAsistente && (
        <RegistrarParadaModal isOpen={isRegistrarOpen} onClose={() => setIsRegistrarOpen(false)} onSave={handleRegistrar} />
      )}
    </div>
  );
}