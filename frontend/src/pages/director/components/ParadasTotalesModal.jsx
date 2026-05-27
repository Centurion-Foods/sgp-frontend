import { useEffect, useState } from "react";
import { X, Binary } from "lucide-react";
import { totalesPorMes } from "../../../data/paradasData"; 

export default function ParadasTotalesModal({ title, mesSeleccionado, onClose }) {
  const [filtroCodigo, setFiltroCodigo] = useState("");

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // RESPALDO DE SEGURIDAD: Si por alguna razón totalesPorMes no llega, usamos estos datos locales
  const datosOrigen = totalesPorMes || {
    Mayo: Array(12).fill({ codigo: "10023P", horas: "00:05:00" }),
    Abril: [
      { codigo: "20455P", horas: "01:15:00" },
      { codigo: "15767P", horas: "00:42:10" }
    ]
  };

  // Obtener los datos usando el mes seleccionado dinámicamente
  const datosTotales = datosOrigen[mesSeleccionado] || [];

  // Filtrar los datos en base a lo que escriba el usuario en el buscador
  const datosFiltrados = datosTotales.filter((item) =>
    item.codigo.toLowerCase().includes(filtroCodigo.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden max-h-[90vh]">
        
        {/* Cabecera */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4">
          <h3 className="text-2xl font-bold text-[#c92121] tracking-tight">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#c92121] hover:opacity-80 p-1 transition"
            aria-label="Cerrar modal"
          >
            <X className="h-6 w-6" strokeWidth={2.5} />
          </button>
        </div>

        {/* Cuerpo */}
        <div className="px-8 pb-8 flex-1 flex flex-col min-h-0 space-y-4">
          
          {/* Input Buscador Interno */}
          <div className="border-b border-gray-200 -mx-8 px-8 pb-4 mb-6">
            <div className="relative w-48">
              <Binary className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input 
                type="text" 
                value={filtroCodigo}
                onChange={(e) => setFiltroCodigo(e.target.value)}
                placeholder="Código de producción" 
                className="outline-none block w-full rounded-xl text-gray-500 text-xs border border-gray-200 bg-white pl-9 pr-4 py-2.5 placeholder:text-gray-400 focus:border-gray-300 transition-colors"
              />
            </div>
          </div>

          {/* Contenedor de Tabla con Scroll Protegido */}
          <div className="w-full overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
            <div className="overflow-y-auto max-h-80 custom-scrollbar"> 
              <table className="w-full text-center border-collapse table-auto">
                <thead>
                  <tr className="bg-[#f8f9fa] border-b border-gray-200 sticky top-0 z-10 text-[13px] font-bold text-gray-700">
                    <th className="p-3 border-r border-gray-200/60">Código</th>
                    <th className="p-3">Horas totales ({mesSeleccionado})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[12px] text-gray-600">
                  {datosFiltrados.length > 0 ? (
                    datosFiltrados.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-3 font-normal border-r border-gray-100">{row.codigo}</td>
                        <td className="p-3 font-normal text-gray-500">{row.horas}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="p-8 text-gray-400 text-xs">
                        No se encontraron registros para "{filtroCodigo}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}