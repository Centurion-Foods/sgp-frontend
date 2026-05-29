import { ShieldCheck, Edit2, Trash2 } from "lucide-react"
 
function UserRow({ usuario, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-gray-50/40 transition-colors">
      {/* USUARIO */}
      <td className="px-6 py-5">
        <div>
          <p className="font-semibold text-gray-900">{usuario.nombre}</p>
          <p className="text-sm text-gray-500 mt-0.5">{usuario.email}</p>
        </div>
      </td>
 
      {/* ROL */}
      <td className="px-6 py-5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          {usuario.rol}
        </span>
      </td>
 
      {/* ESTADO */}
      <td className="px-6 py-5">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
            usuario.estado === "Activo"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-gray-100 text-gray-600 border-gray-200"
          }`}
        >
          {usuario.estado}
        </span>
      </td>
 
      {/* ACCIONES */}
      <td className="px-6 py-5 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onEdit(usuario)}
            className="p-2 text-gray-400 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-all"
            title="Editar usuario"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(usuario)}
            className="p-2 text-gray-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
            title="Eliminar usuario"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}
 
export default function UserTable({ usuarios, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-xs font-semibold text-gray-800 uppercase tracking-wider">
              <th className="px-6 py-4">Usuario</th>
              <th className="px-6 py-4">Rol</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <UserRow
                  key={usuario.id}
                  usuario={usuario}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-14 text-center text-sm text-gray-500">
                  No se encontraron usuarios que coincidan con la búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}