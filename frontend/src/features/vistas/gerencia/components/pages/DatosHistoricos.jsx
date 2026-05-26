import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronDown, MapPin, Binary, User, X } from "lucide-react";
import MiniCalendar from "../MiniCalendar";
import { registroHistorico } from "../../../../../data/historicoData"; 
import { estilosFiltros } from "../../../../../data/estilosFiltros";

function FiltrosDashboard({ 
  filtroLinea, setFiltroLinea,
  filtroCodigo, setFiltroCodigo,
  filtroResponsable, setFiltroResponsable,
  selectedDate, setSelectedDate 
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target) && !event.target.closest('[data-calendar-button]')) {
        setShowCalendar(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") setShowCalendar(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const resetFecha = (e) => {
    e.stopPropagation();
    setSelectedDate("");
  };

  return (
    <div>
      <p className="text-[13px] text-gray-500 font-bold mb-2">Filtros</p>
      <div className="flex flex-wrap gap-3">
        
        <div className="relative w-48">
          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          <select 
            value={filtroLinea} 
            onChange={(e) => setFiltroLinea(e.target.value)} 
            className={estilosFiltros.filtros}
          >
            <option value="">Todas las Líneas</option>
            <option value="Tajado 1">Tajado 1</option>
            <option value="Tajado 2">Tajado 2</option>
            <option value="Tajado 3">Tajado 3</option>
            <option value="Cárnicos">Cárnicos</option>
            <option value="Miele">Miele</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="relative w-48">
          <Binary className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Código PT" 
            value={filtroCodigo}
            onChange={(e) => setFiltroCodigo(e.target.value)}
            className={estilosFiltros.filtros} 
          />
        </div>

        <div className="relative w-48">
          <User className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          <select 
            value={filtroResponsable} 
            onChange={(e) => setFiltroResponsable(e.target.value)} 
            className={estilosFiltros.filtros}
          >
            <option value="">Todos los Responsables</option>
            <option value="Supervisor 1">Supervisor 1</option>
            <option value="Supervisor 2">Supervisor 2</option>
            <option value="Supervisor 3">Supervisor 3</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="relative w-48">
          <Calendar className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          <button
            type="button"
            data-calendar-button
            onClick={() => setShowCalendar((v) => !v)}
            className={`${estilosFiltros.filtros} text-left text-gray-400 pr-8 cursor-pointer`}
          >
            {selectedDate ? <span className="text-gray-700">{selectedDate}</span> : <span>Fecha</span>}
          </button>
          
          {selectedDate ? (
            <X onClick={resetFecha} className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer" />
          ) : (
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          )}

          {showCalendar && (
            <div ref={calendarRef} className="absolute top-full mt-2 left-0 z-50">
              <MiniCalendar
                value={selectedDate || undefined}
                onChange={(iso) => {
                  setSelectedDate(iso);
                  setShowCalendar(false);
                }}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function TarjetaDetalle({ registro, isDetailOpen, onToggleDetalle }) {
  return (
    <div className="mb-3 last:mb-0">
      <div 
        onClick={onToggleDetalle}
        className="bg-white rounded-lg border border-gray-200 text-sm p-4 py-2.5 cursor-pointer select-none flex items-center justify-between transition-colors hover:bg-gray-50/50 group/p"
      >
        <div>
          <span className="font-semibold text-red-800 block mb-0.5 text-xs tracking-wide">
            {registro.fecha}
          </span>
          <p className="text-gray-700 text-[15px] font-bold tracking-tight">
            Línea: {registro.linea}    
          </p>
        </div>
        
        <ChevronDown 
          className={`h-4 w-4 text-gray-400 transition-transform duration-300 group-hover/p:text-[#c92121] ${
            isDetailOpen ? "rotate-180 text-[#c92121]" : "rotate-0"
          }`}
        />
      </div>

      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isDetailOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden space-y-3">
          <div className="bg-white rounded-xl border border-gray-200 text-sm py-16">
          </div>
          <div className="bg-white rounded-xl border border-gray-200 text-sm py-16">
          </div>
          <div className="bg-white rounded-xl border border-gray-200 text-sm py-16">
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [filtroLinea, setFiltroLinea] = useState("");
  const [filtroCodigo, setFiltroCodigo] = useState("");
  const [filtroResponsable, setFiltroResponsable] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [anoAbierto, setAnoAbierto] = useState("2026"); 
  const [mesAbierto, setMesAbierto] = useState(null); 
  const [detalleAbierto, setDetalleAbierto] = useState(null);

  const toggleAno = (ano) => {
    setAnoAbierto(anoAbierto === ano ? null : ano);
  };

  const toggleMes = (month) => {
    setMesAbierto(mesAbierto === month ? null : month);
  };

  const handleToggleDetalle = (id) => {
    setDetalleAbierto(detalleAbierto === id ? null : id);
  };

  const datosAgrupadosPorAno = (registroHistorico || []).reduce((acc, item) => {
    if (!item.fecha) return acc;
    
    const parts = item.fecha.split("-");
    const ano = parts[0];

    const cumpleLinea = filtroLinea === "" || item.linea === filtroLinea;
    const cumpleCodigo = filtroCodigo === "" || (item.codigoPT && item.codigoPT.toLowerCase().includes(filtroCodigo.toLowerCase()));
    const cumpleResponsable = filtroResponsable === "" || item.responsable === filtroResponsable;
    const cumpleFecha = selectedDate === "" || item.fecha === selectedDate;

    if (cumpleLinea && cumpleCodigo && cumpleResponsable && cumpleFecha) {
      if (!acc[ano]) acc[ano] = {};
      if (!acc[ano][item.month]) {
        acc[ano][item.month] = {
          month: item.month,
          registros: []
        };
      }
      acc[ano][item.month].registros.push(item);
    }
    return acc;
  }, {});

  const anosOrdenados = Object.keys(datosAgrupadosPorAno).sort((a, b) => b - a);

  return (
    <div className="h-full space-y-5 text-gray-800 p-1">
      
      <FiltrosDashboard 
        filtroLinea={filtroLinea} setFiltroLinea={setFiltroLinea}
        filtroCodigo={filtroCodigo} setFiltroCodigo={setFiltroCodigo}
        filtroResponsable={filtroResponsable} setFiltroResponsable={setFiltroResponsable}
        selectedDate={selectedDate} setSelectedDate={setSelectedDate}
      />

      <h1 className="text-[26px] font-bold text-gray-900 pt-2 tracking-tight">
        Registro histórico de producción
      </h1>
      
      <div className="w-full space-y-6 pt-2">
        {anosOrdenados.map((ano) => {
          const isAnoOpen = anoAbierto === ano;
          const mesesDisponibles = Object.values(datosAgrupadosPorAno[ano]);
          
          return (
            <div key={ano} className="transition-all">
              
              <div 
                onClick={() => toggleAno(ano)}
                className="flex items-center gap-2 cursor-pointer select-none group border-b-2 border-gray-900/10 pb-1.5 mb-3"
              >
                <h2 className="text-[22px] font-extrabold text-gray-800 tracking-tight group-hover:text-[#c92121] transition-colors">
                  {ano}
                </h2>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isAnoOpen ? "rotate-180 text-gray-700" : "rotate-0"}`} />
              </div>

              <div className={`grid transition-all duration-300 ease-in-out ${isAnoOpen ? "grid-rows-[1fr] opacity-100 mb-2" : "grid-rows-[0fr] opacity-0 overflow-hidden pointer-events-none"}`}>
                <div className="overflow-hidden space-y-3 pl-1">
                  
                  {mesesDisponibles.map((mes) => {
                    const isMesOpen = mesAbierto === mes.month;
                    const [soloNombreMes] = mes.month.split(" ");

                    return (
                      <div key={mes.month}>
                        
                        <div className="flex items-center justify-between w-full border-b border-gray-200/70 pb-1 mb-2">
                          <div 
                            onClick={() => toggleMes(mes.month)}
                            className="flex items-center gap-1.5 cursor-pointer select-none group"
                          >
                            <h3 className="text-[15px] font-bold text-gray-400 group-hover:text-gray-600 transition-colors">
                              {soloNombreMes} <span className="text-[11px] font-normal text-gray-400/80">({mes.registros.length})</span>
                            </h3>
                            <ChevronDown className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${isMesOpen ? "rotate-180" : "rotate-0"}`} />
                          </div>
                        </div>
                        
                        <div className={`grid transition-all duration-300 ease-in-out ${isMesOpen ? "grid-rows-[1fr] opacity-100 mb-4" : "grid-rows-[0fr] opacity-0 overflow-hidden pointer-events-none"}`}>
                          <div className="overflow-hidden pb-1 space-y-2">
                            {mes.registros.map((reg, idx) => {
                              const uniqueId = reg.fecha + reg.linea + idx;
                              return (
                                <TarjetaDetalle 
                                  key={uniqueId}
                                  registro={reg}
                                  isDetailOpen={detalleAbierto === uniqueId}
                                  onToggleDetalle={() => handleToggleDetalle(uniqueId)}
                                />
                              );
                            })}
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
          <div className="text-center py-12 text-sm text-gray-400 font-medium">
            No se encontraron registros que coincidan con los filtros aplicados.
          </div>
        )}
      </div>

    </div>
  );
}