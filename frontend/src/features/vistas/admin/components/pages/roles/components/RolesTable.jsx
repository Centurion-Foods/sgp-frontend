import { Edit2, Trash2 } from "lucide-react"

function RoleRow({ role, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-gray-50/40 transition-colors">
      <td className="px-6 py-5">
        <p className="font-semibold text-gray-900">{role.rol}</p>
      </td>
      <td className="px-6 py-5">
        <p className="text-gray-600 text-sm">{role.descripcion}</p>
      </td>
      <td className="px-6 py-5">
        <div className="flex flex-wrap gap-2 max-w-lg">
          {role.permisos.map((permiso, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-medium border border-amber-200"
            >
              {permiso}
            </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-5 text-center">
        <span className="text-xs font-semibold text-gray-900">{role.usuarios}</span>
      </td>
      <td className="px-6 py-5">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onEdit(role)}
            className="p-2 text-gray-400 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-all"
            title="Editar rol"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(role)}
            className="p-2 text-gray-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
            title="Eliminar rol"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default function RolesTable({ roles, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-xs font-semibold text-gray-800 uppercase tracking-wider">
              <th className="px-6 py-4 text-left">Rol</th>
              <th className="px-6 py-4 text-left">Descripción</th>
              <th className="px-6 py-4 text-left">Permisos</th>
              <th className="px-6 py-4 text-center">Usuarios</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {roles.length > 0 ? (
              roles.map((role) => (
                <RoleRow key={role.id} role={role} onEdit={onEdit} onDelete={onDelete} />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-14 text-center text-sm text-gray-500">
                  No hay roles registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}