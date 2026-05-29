import { useState } from "react"
import Modal from "../../../../../../shared/ui/Modal"

const ROLES = ["Administrador", "Gerencia", "Director", "Supervisor"]
const ESTADOS = ["Activo", "Inactivo"]
const EMPTY_FORM = { nombre: "", email: "", rol: "Operario", estado: "Activo" }

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

const inputClass = (error) => `w-full bg-gray-50 border rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 transition-all ${error ? "border-red-400 focus:ring-red-300/20 focus:border-red-400" : "border-gray-300 focus:ring-gray-400/20 focus:border-gray-400"}`

export default function CreateUserModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  const handleChange = (field, value) => { setForm(prev => ({ ...prev, [field]: value })); if (errors[field]) setErrors(prev => ({ ...prev, [field]: null })) }
  const validate = () => { const next = {}; if (!form.nombre.trim()) next.nombre = "El nombre es obligatorio"; if (!form.email.trim()) next.email = "El correo es obligatorio"; else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Correo no válido"; return next }
  const handleSubmit = () => { const next = validate(); if (Object.keys(next).length) { setErrors(next); return }; onSave(form); setForm(EMPTY_FORM); setErrors({}) }
  const handleClose = () => { setForm(EMPTY_FORM); setErrors({}); onClose() }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Nuevo usuario">
      <div className="space-y-4">
        <Field label="Nombre" error={errors.nombre}><input type="text" placeholder="Ej. Carlos Pérez" value={form.nombre} onChange={(e) => handleChange("nombre", e.target.value)} className={inputClass(errors.nombre)} /></Field>
        <Field label="Correo electrónico" error={errors.email}><input type="email" placeholder="correo@centurionfoods.com" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className={inputClass(errors.email)} /></Field>
        <Field label="Rol"><select value={form.rol} onChange={(e) => handleChange("rol", e.target.value)} className={inputClass()}>{ROLES.map(r => <option key={r} value={r}>{r}</option>)}</select></Field>
        <Field label="Estado"><select value={form.estado} onChange={(e) => handleChange("estado", e.target.value)} className={inputClass()}>{ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}</select></Field>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
        <button onClick={handleClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">Cancelar</button>
        <button onClick={handleSubmit} className="px-5 py-2 text-sm font-medium bg-red-700 hover:bg-red-800 text-white rounded-xl transition-all shadow-sm">Crear usuario</button>
      </div>
    </Modal>
  )
}