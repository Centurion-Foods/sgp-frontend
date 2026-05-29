import { ChevronDown } from "lucide-react"
import Modal from "../../../../../shared/ui/Modal"

export default function LineSelectionModal({
  isOpen,
  selectedLine,
  draftLine,
  setDraftLine,
  options,
  onSave,
  onClose,
}) {
  return (
    <Modal isOpen={isOpen} title="Selecciona la línea de producción a visualizar" onClose={onClose}>
      <div className="space-y-6">
        <p className="text-sm text-gray-500">
          Línea actual: <span className="font-semibold text-gray-700">{selectedLine}</span>
        </p>

        <div className="relative">
          <select
            value={draftLine}
            onChange={(e) => setDraftLine(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition"
          >
            {options.map((line) => (
              <option key={line} value={line}>{line}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>

        <button
          type="button"
          onClick={onSave}
          className="inline-flex w-full items-center justify-center rounded-xl bg-red-700/90 hover:bg-red-800 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:scale-99 transition"
        >
          Guardar
        </button>
      </div>
    </Modal>
  )
}