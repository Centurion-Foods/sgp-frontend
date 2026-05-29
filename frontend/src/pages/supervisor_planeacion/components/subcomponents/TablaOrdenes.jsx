import { COLUMNAS } from "../../../../data/supervisorproduccion/mock-registros"

export default function TablaOrdenes({ registros }) {
  return (
    <div className="flex-1 min-w-0">
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Orden de producción</p>
      <div className="w-full overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-2xs max-h-96 overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="bg-[#f8f9fa] border-b border-gray-200 sticky top-0 z-10">
              {COLUMNAS.map((col, idx) => (
                <th key={col.llave} className={`${idx === 0 ? "pl-3 pr-2 py-3" : "p-3"} text-[12px] font-semibold text-gray-700 tracking-wide whitespace-nowrap`}>
                  {col.etiqueta}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {registros.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                {COLUMNAS.map((col) => (
                  <td key={col.llave} className="p-3 text-[12px] text-gray-600 whitespace-nowrap">
                    {item[col.llave]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}