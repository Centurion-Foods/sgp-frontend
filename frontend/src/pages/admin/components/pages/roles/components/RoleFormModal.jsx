import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import Modal from "../../../../../../shared/ui/Modal"

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

const inputClass = (error) =>
  `w-full bg-gray-50 border rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 transition-all ${
    error
      ? "border-red-400 focus:ring-red-300/20 focus:border-red-400"
      : "border-gray-300 focus:ring-gray-400/20 focus:border-gray-400"
  }`

export default function RoleFormModal({ isOpen, title, initialData, onClose, onSave, submitLabel, submitClass }) {
  const [form,    setForm]    = useState(initialData)
  const [newPerm, setNewPerm] = useState("")
  const [errors,  setErrors]  = useState({})

  // Estado derivado durante render: resetea cuando el modal abre o cambia de rol
  const [prevOpenId, setPrevOpenId] = useState(null)
  const openId = isOpen ? (initialData?.id ?? "__new__") : null

  if (openId !== prevOpenId) {
    setPrevOpenId(openId)
    if (openId !== null) {
      setForm({ ...initialData })
      setNewPerm("")
      setErrors({})
    }
  }

  const handleField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const addPermiso = () => {
    const trimmed = newPerm.trim()
    if (!trimmed) return
    if (form.permisos.includes(trimmed)) { setNewPerm(""); return }
    setForm((prev) => ({ ...prev, permisos: [...prev.permisos, trimmed] }))
    setNewPerm("")
  }

  const removePermiso = (index) =>
    setForm((prev) => ({ ...prev, permisos: prev.permisos.filter((_, i) => i !== index) }))

  const validate = () => {
    const next = {}
    if (!form.rol.trim())           next.rol         = "El nombre del rol es obligatorio"
    if (!form.descripcion.trim())   next.descripcion = "La descripción es obligatoria"
    if (form.permisos.length === 0) next.permisos    = "Agrega al menos un permiso"
    return next
  }

  const handleSubmit = () => {
    const next = validate()
    if (Object.keys(next).length) { setErrors(next); return }
    onSave(form)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
        <Field label="Nombre del rol" error={errors.rol}>
          <input
            type="text"
            placeholder="Ej. Supervisor"
            value={form.rol}
            onChange={(e) => handleField("rol", e.target.value)}
            className={inputClass(errors.rol)}
          />
        </Field>

        <Field label="Descripción" error={errors.descripcion}>
          <input
            type="text"
            placeholder="Ej. Control de operaciones"
            value={form.descripcion}
            onChange={(e) => handleField("descripcion", e.target.value)}
            className={inputClass(errors.descripcion)}
          />
        </Field>

        <Field label="Permisos" error={errors.permisos}>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Escribe un permiso y presiona +"
              value={newPerm}
              onChange={(e) => setNewPerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addPermiso()}
              className={inputClass()}
            />
            <button
              onClick={addPermiso}
              className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {form.permisos.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {form.permisos.map((p, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-medium border border-amber-200"
                >
                  {p}
                  <button
                    onClick={() => removePermiso(i)}
                    className="text-amber-500 hover:text-amber-800 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </Field>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          className={`px-5 py-2 text-sm font-medium text-white rounded-xl transition-all shadow-sm ${submitClass}`}
        >
          {submitLabel}
        </button>
      </div>
    </Modal>
  )
}