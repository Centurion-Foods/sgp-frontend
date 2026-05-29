import { useState } from "react"
import Modal from "../../../shared/ui/Modal"

export default function ObjetivoModal({ isOpen, onClose, supervisor, onGuardar }) {
  const [nuevoObjetivo, setNuevoObjetivo] = useState(supervisor?.objetivo || "")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!nuevoObjetivo || nuevoObjetivo <= 0) return
    onGuardar({ supervisorId: supervisor.id, objetivo: Number(nuevoObjetivo) })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} title="Objetivo Semanal" onClose={onClose}>
      <div className="space-y-4">
        <p className="text-xs text-gray-400 leading-normal">
          Modifica la meta en kilogramos asignada para <span className="font-semibold text-gray-700">{supervisor?.nombre}</span>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider font-bold text-gray-500">
              Meta Semanal (Kg)
            </label>
            <input
              type="number"
              min="1"
              step="any"
              value={nuevoObjetivo}
              onChange={(e) => setNuevoObjetivo(e.target.value)}
              placeholder="Ej. 5000"
              className="outline-none block w-full rounded-xl text-sm text-gray-700 border border-gray-200 bg-gray-50/50 px-4 py-2.5 focus:bg-white focus:border-gray-300 transition-all"
              autoFocus
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 text-xs font-semibold py-2.5 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#c92121] hover:bg-[#b01c1c] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
            >
              Guardar meta
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}