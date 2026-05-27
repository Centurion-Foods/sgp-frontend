import { Edit2, Trash2 } from "lucide-react"

function PermisoRow({ permiso, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-gray-50/40 transition-colors">
      <td className="px-6 py-5">
        <p className="font-semibold text-gray-900">{permiso.permiso}</p>
      </td>

      <td className="px-6 py-5">
        <p className="text-gray-600 text-sm max-w-md">{permiso.descripcion}</p>
      </td>

      <td className="px-6 py-5">
        <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-medium border border-amber-200">
          {permiso.categoria}
        </span>
      </td>

      <td className="px-6 py-5">
        <div className="flex flex-wrap gap-2">
          {permiso.roles.map((rol, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200"
            >
              {rol}
            </span>
          ))}
        </div>
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onEdit(permiso)}
            className="p-2 text-gray-400 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-all"
            title="Editar permiso"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(permiso)}
            className="p-2 text-gray-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
            title="Eliminar permiso"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default function PermisosTable({ permisos, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-xs font-semibold text-gray-800 uppercase tracking-wider">
              <th className="px-6 py-4 text-left">Permiso</th>
              <th className="px-6 py-4 text-left">Descripción</th>
              <th className="px-6 py-4 text-left">Categoría</th>
              <th className="px-6 py-4 text-left">Roles Asociados</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {permisos.length > 0 ? (
              permisos.map((p) => (
                <PermisoRow key={p.id} permiso={p} onEdit={onEdit} onDelete={onDelete} />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-14 text-center text-sm text-gray-500">
                  No hay permisos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}