export default function TablaProductos({ registros, mostrarTotal = true }) {
  return (
    <div className="w-full overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-col">
      <div className="overflow-y-auto max-h-[65vh] custom-scrollbar">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="bg-[#f8f9fa] border-b border-gray-200 sticky top-0 z-10 text-[13px] font-bold text-gray-700">
              <th className="p-3.5 pl-6 w-20">ID</th>
              <th className="p-3.5 w-36">Código</th>
              <th className="p-3.5">Nombre del Producto</th>
              <th className="p-3.5 w-28">U.M</th>
              <th className="p-3.5 w-44">Área</th>
              {mostrarTotal && <th className="p-3.5 pr-6 w-40 text-center">Producción total</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-[13px] text-gray-600">
            {registros.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-3.5 pl-6 font-normal text-gray-400">{row.id}</td>
                <td className="p-3.5 font-normal text-gray-700">{row.codigo || "110241"}</td>
                <td className="p-3.5 font-normal text-gray-800">{row.nombre}</td>
                <td className="p-3.5 font-normal text-gray-500">{row.um}</td>
                <td className="p-3.5 font-normal text-gray-500">{row.area}</td>
                {mostrarTotal && (
                  <td className="p-3.5 pr-6 font-semibold text-gray-700 text-center">
                    {row.total.toLocaleString()}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}