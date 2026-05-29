import { useState } from "react"
import { Binary } from "lucide-react"
import { totalesPorMes } from "../../../data/paradasData"
import Modal from "../../../shared/ui/Modal"

export default function ParadasTotalesModal({ isOpen, onClose, mesSeleccionado }) {
  const [filtroCodigo, setFiltroCodigo] = useState("")

  const datosOrigen = totalesPorMes || {
    Mayo: Array(12).fill({ codigo: "10023P", horas: "00:05:00" }),
    Abril: [
      { codigo: "20455P", horas: "01:15:00" },
      { codigo: "15767P", horas: "00:42:10" }
    ]
  }

  const datosTotales = (mesSeleccionado && datosOrigen[mesSeleccionado]) || []
  const datosFiltrados = datosTotales.filter((item) =>
    item.codigo.toLowerCase().includes(filtroCodigo.toLowerCase())
  )

  return (
    <Modal isOpen={isOpen} title={`Horas totales de paradas - ${mesSeleccionado || '...'}`} onClose={onClose}>
      <div className="space-y-4">
        {mesSeleccionado ? (
          <>
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

            <div className="w-full overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
              <div className="overflow-y-auto max-h-80 custom-scrollbar"> 
                <table className="w-full text-center border-collapse table-auto">
                  <thead>
                    <tr className="bg-[#f8f9fa] border-b border-gray-200 sticky top-0 z-10 text-[13px] font-bold text-gray-700">
                      <th className="p-3 border-r border-gray-200/60">Código</th>
                      <th className="p-3">Horas totales</th>
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
          </>
        ) : (
          <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
            Selecciona un mes para ver los totales
          </div>
        )}
      </div>
    </Modal>
  )
}