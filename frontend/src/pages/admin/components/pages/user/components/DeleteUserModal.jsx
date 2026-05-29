import { AlertTriangle } from "lucide-react"
import Modal from "../../../../../../shared/ui/Modal"

export default function DeleteUserModal({ isOpen, onClose, onConfirm, usuario }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Eliminar usuario">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600">
            ¿Estás seguro de que deseas eliminar a{" "}
            <span className="font-semibold text-gray-900">{usuario?.nombre}</span>?
            Esta acción no se puede deshacer.
          </p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-700">
          {usuario?.email}
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
        <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">Cancelar</button>
        <button onClick={() => onConfirm(usuario?.id)} className="px-5 py-2 text-sm font-medium bg-red-700 hover:bg-red-800 text-white rounded-xl transition-all shadow-sm">Sí, eliminar</button>
      </div>
    </Modal>
  )
}