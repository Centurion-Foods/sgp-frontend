import { X } from "lucide-react"
import { useState } from "react"

const ROLES = ["Administrador", "Gerencia", "Director", "Supervisor"]
const ESTADOS = ["Activo", "Inactivo"]

const EMPTY_FORM = { nombre: "", email: "", rol: "Operario", estado: "Activo" }

export default function CreateUserModal({ open, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  if (!open) return null

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const validate = () => {
    const next = {}
    if (!form.nombre.trim())  next.nombre = "El nombre es obligatorio"
    if (!form.email.trim())   next.email  = "El correo es obligatorio"
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Correo no válido"
    return next
  }

  const handleSubmit = () => {
    const next = validate()
    if (Object.keys(next).length) { setErrors(next); return }
    onSave(form)
    setForm(EMPTY_FORM)
    setErrors({})
  }

  const handleClose = () => {
    setForm(EMPTY_FORM)
    setErrors({})
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Nuevo usuario</h2>
          <button
            onClick={handleClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <Field label="Nombre" error={errors.nombre}>
            <input
              type="text"
              placeholder="Ej. Carlos Pérez"
              value={form.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              className={inputClass(errors.nombre)}
            />
          </Field>

          <Field label="Correo electrónico" error={errors.email}>
            <input
              type="email"
              placeholder="correo@centurionfoods.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={inputClass(errors.email)}
            />
          </Field>

          <Field label="Rol">
            <select
              value={form.rol}
              onChange={(e) => handleChange("rol", e.target.value)}
              className={inputClass()}
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </Field>

          <Field label="Estado">
            <select
              value={form.estado}
              onChange={(e) => handleChange("estado", e.target.value)}
              className={inputClass()}
            >
              {ESTADOS.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </Field>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 text-sm font-medium bg-red-700 hover:bg-red-800 text-white rounded-xl transition-all shadow-sm"
          >
            Crear usuario
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
        {label}
      </label>
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