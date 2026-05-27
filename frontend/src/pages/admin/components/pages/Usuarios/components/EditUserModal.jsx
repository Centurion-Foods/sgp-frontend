import { X } from "lucide-react"
import { useState } from "react"
 
const ROLES = ["Administrador", "Gerencia", "Director", "Supervisor"]
const ESTADOS = ["Activo", "Inactivo"]
 
export default function EditUserModal({ usuario, onClose, onSave }) {
  const [form, setForm] = useState({ ...usuario })
 
  if (!usuario) return null
 
  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }))
 
  const handleSubmit = () => {
    if (!form.nombre.trim() || !form.email.trim()) return
    onSave(form)
  }
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Editar usuario</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
 
        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <Field label="Nombre">
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              className={inputClass}
            />
          </Field>
 
          <Field label="Correo electrónico">
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={inputClass}
            />
          </Field>
 
          <Field label="Rol">
            <select
              value={form.rol}
              onChange={(e) => handleChange("rol", e.target.value)}
              className={inputClass}
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
              className={inputClass}
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
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 text-sm font-medium bg-amber-600 hover:bg-amber-700 text-white rounded-xl transition-all shadow-sm"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  )
}
 
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  )
}
 
const inputClass =
  "w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400/30 focus:border-gray-400 transition-all"