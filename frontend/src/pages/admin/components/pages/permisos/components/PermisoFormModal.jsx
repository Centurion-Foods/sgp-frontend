import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import Modal from "../../../../../../shared/ui/Modal"

const CATEGORIAS        = ["Usuarios", "Reportes", "Producción", "Configuración", "Seguridad"]
const ROLES_DISPONIBLES = ["Administrador", "Gerente", "Director", "Supervisor", "Asistente"]

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

export default function PermisoFormModal({ isOpen, title, initialData, onClose, onSave, submitLabel, submitClass }) {
  const [form,   setForm]   = useState(initialData)
  const [newRol, setNewRol] = useState("")
  const [errors, setErrors] = useState({})

  const [prevOpenId, setPrevOpenId] = useState(null)
  const openId = isOpen ? (initialData?.id ?? "__new__") : null

  if (openId !== prevOpenId) {
    setPrevOpenId(openId)
    if (openId !== null) {
      setForm({ ...initialData })
      setNewRol("")
      setErrors({})
    }
  }

  const handleField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const addRol = (rol) => {
    const value = rol ?? newRol.trim()
    if (!value || form.roles.includes(value)) { setNewRol(""); return }
    setForm((prev) => ({ ...prev, roles: [...prev.roles, value] }))
    setNewRol("")
    if (errors.roles) setErrors((prev) => ({ ...prev, roles: null }))
  }

  const removeRol = (index) =>
    setForm((prev) => ({ ...prev, roles: prev.roles.filter((_, i) => i !== index) }))

  const validate = () => {
    const next = {}
    if (!form.permiso.trim())     next.permiso     = "El nombre del permiso es obligatorio"
    if (!form.descripcion.trim()) next.descripcion = "La descripción es obligatoria"
    if (!form.categoria)          next.categoria   = "Selecciona una categoría"
    if (form.roles.length === 0)  next.roles       = "Asocia al menos un rol"
    return next
  }

  const handleSubmit = () => {
    const next = validate()
    if (Object.keys(next).length) { setErrors(next); return }
    onSave(form)
  }

  const rolesDisponiblesFiltrados = ROLES_DISPONIBLES.filter((r) => !form.roles.includes(r))

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
        <Field label="Nombre del permiso" error={errors.permiso}>
          <input
            type="text"
            placeholder="Ej. Aprobar solicitudes"
            value={form.permiso}
            onChange={(e) => handleField("permiso", e.target.value)}
            className={inputClass(errors.permiso)}
          />
        </Field>

        <Field label="Descripción" error={errors.descripcion}>
          <input
            type="text"
            placeholder="Ej. Permite aprobar solicitudes pendientes"
            value={form.descripcion}
            onChange={(e) => handleField("descripcion", e.target.value)}
            className={inputClass(errors.descripcion)}
          />
        </Field>

        <Field label="Categoría" error={errors.categoria}>
          <select
            value={form.categoria}
            onChange={(e) => handleField("categoria", e.target.value)}
            className={inputClass(errors.categoria)}
          >
            <option value="">Seleccionar...</option>
            {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>

        <Field label="Roles asociados" error={errors.roles}>
          {rolesDisponiblesFiltrados.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {rolesDisponiblesFiltrados.map((r) => (
                <button
                  key={r}
                  onClick={() => addRol(r)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium border border-gray-200 transition-all"
                >
                  <Plus className="w-3 h-3" /> {r}
                </button>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="O escribe un rol personalizado..."
              value={newRol}
              onChange={(e) => setNewRol(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addRol()}
              className={inputClass()}
            />
            <button
              onClick={() => addRol()}
              className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {form.roles.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {form.roles.map((r, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200"
                >
                  {r}
                  <button onClick={() => removeRol(i)} className="text-gray-400 hover:text-gray-700 transition-colors">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </Field>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
        <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">Cancelar</button>
        <button onClick={handleSubmit} className={`px-5 py-2 text-sm font-medium text-white rounded-xl transition-all shadow-sm ${submitClass}`}>{submitLabel}</button>
      </div>
    </Modal>
  )
}