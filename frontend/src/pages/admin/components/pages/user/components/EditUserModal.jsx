import { useState } from "react"
import Modal from "../../../../../../shared/ui/Modal"

const ROLES = ["Administrador", "Gerencia", "Director", "Supervisor"]
const ESTADOS = ["Activo", "Inactivo"]
const EMPTY = { nombre: "", email: "", rol: "Administrador", estado: "Activo" }

const inputClass = (error) =>
  `w-full bg-gray-50 border rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 transition-all ${
    error
      ? "border-red-400 focus:ring-red-300/20 focus:border-red-400"
      : "border-gray-300 focus:ring-gray-400/20 focus:border-gray-400"
  }`

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

export default function EditUserModal({ isOpen, onClose, onSave, usuario }) {
  const [form,   setForm]   = useState(() => ({ ...(usuario ?? EMPTY) }))
  const [errors, setErrors] = useState({})

  const [prevOpenId, setPrevOpenId] = useState(null)
  const openId = isOpen ? (usuario?.id ?? "__edit__") : null

  if (openId !== prevOpenId) {
    setPrevOpenId(openId)
    if (openId !== null) {
      setForm({ ...(usuario ?? EMPTY) })
      setErrors({})
    }
  }

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))
  const handleSubmit = () => { if (!form.nombre.trim() || !form.email.trim()) return; onSave(form) }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar usuario">
      <div className="space-y-4">
        <Field label="Nombre" error={errors.nombre}>
          <input type="text" value={form.nombre} onChange={(e) => handleChange("nombre", e.target.value)} className={inputClass(errors.nombre)} />
        </Field>
        <Field label="Correo electrónico" error={errors.email}>
          <input type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className={inputClass(errors.email)} />
        </Field>
        <Field label="Rol">
          <select value={form.rol} onChange={(e) => handleChange("rol", e.target.value)} className={inputClass()}>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </Field>
        <Field label="Estado">
          <select value={form.estado} onChange={(e) => handleChange("estado", e.target.value)} className={inputClass()}>
            {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </Field>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
        <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">Cancelar</button>
        <button onClick={handleSubmit} className="px-5 py-2 text-sm font-medium bg-amber-600 hover:bg-amber-700 text-white rounded-xl transition-all shadow-sm">Guardar cambios</button>
      </div>
    </Modal>
  )
}