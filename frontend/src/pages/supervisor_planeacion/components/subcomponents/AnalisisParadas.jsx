import { ChevronDown } from "lucide-react"

export default function AnalisisParadas({ data, lineaAbierta, onToggle }) {
  return (
    <div className="w-72 shrink-0">
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Análisis de paradas</p>
      <div className="max-h-96 overflow-y-auto custom-scrollbar pr-1">
        <div className="space-y-2">
          {Object.entries(data).map(([linea, items]) => {
            const isOpen = lineaAbierta === linea
            return (
              <div key={linea} className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
                <div onClick={() => onToggle(linea)} className="flex items-center justify-between px-3 py-2.5 cursor-pointer select-none group border-b border-gray-100">
                  <span className="text-[13px] font-semibold text-gray-700 group-hover:text-[#c92121] transition-colors">{linea}</span>
                  <ChevronDown className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </div>
                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 overflow-hidden"}`}>
                  <div className="overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead className="sticky top-0 bg-[#f8f9fa] z-10">
                        <tr className="border-b border-gray-100">
                          <th className="px-3 py-2 text-[11px] font-semibold text-gray-600 whitespace-nowrap">Clasificación</th>
                          <th className="px-3 py-2 text-[11px] font-semibold text-gray-600 whitespace-nowrap text-right">Horas paradas totales</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {items.map((row, i) => (
                          <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-3 py-2 text-[11px] text-gray-600">{row.clasificacion}</td>
                            <td className="px-3 py-2 text-[11px] text-gray-500 text-right font-mono">{row.horas}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}