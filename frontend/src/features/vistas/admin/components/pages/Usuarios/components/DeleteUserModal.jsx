import { AlertTriangle, X } from "lucide-react"
 
export default function DeleteUserModal({ usuario, onClose, onConfirm }) {
  if (!usuario) return null
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Eliminar usuario</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
 
        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-sm text-gray-600">
            ¿Estás seguro de que deseas eliminar a{" "}
            <span className="font-semibold text-gray-900">{usuario.nombre}</span>?
            Esta acción no se puede deshacer.
          </p>
          <div className="mt-4 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-700">
            {usuario.email}
          </div>
        </div>
 
        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(usuario.id)}
            className="px-5 py-2 text-sm font-medium bg-red-700 hover:bg-red-800 text-white rounded-xl transition-all shadow-sm"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  )
}