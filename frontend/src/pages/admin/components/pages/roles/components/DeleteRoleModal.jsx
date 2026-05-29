import { AlertTriangle } from "lucide-react"
import Modal from "../../../../../../shared/ui/Modal"

export default function DeleteRoleModal({ isOpen, role, onClose, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Eliminar rol">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600">
            ¿Estás seguro de que deseas eliminar el rol{" "}
            <span className="font-semibold text-gray-900">{role?.rol}</span>?
            Esta acción no se puede deshacer.
          </p>
        </div>
        {role?.usuarios > 0 && (
          <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-700">
            Este rol tiene <span className="font-semibold">{role.usuarios} usuario(s)</span> asignados que quedarán sin rol.
          </div>
        )}
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
        >
          Cancelar
        </button>
        <button
          onClick={() => onConfirm(role?.id)}
          className="px-5 py-2 text-sm font-medium bg-red-700 hover:bg-red-800 text-white rounded-xl transition-all shadow-sm"
        >
          Sí, eliminar
        </button>
      </div>
    </Modal>
  )
}