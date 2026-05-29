import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Modal from "../../../shared/ui/Modal"

const LINEAS    = ["Tajado 1", "Tajado 2", "Porcionado", "Azul", "Normalización"]
const PRODUCTOS = ["Queso Suizo Tajado Ghalla x 140G x Und", "Cheddar Tajado x 200G x Und", "Edam Porcionado x 250G", "Azul x 100G"]
const TURNOS    = ["Día", "Noche"]
const ESTADOS   = ["Activo", "Inactivo", "Pendiente"]

const EMPTY = { linea: "", cantidad: "", producto: "", codigoMP: "", turno: "", estado: "", fecha: "", codigoProduccion: "" }

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600 mt-0.5">{error}</p>}
    </div>
  )
}

const inputBase = "w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
const inputClass = (error) =>
  `${inputBase} bg-gray-50 text-gray-900 ${
    error
      ? "border-red-400 focus:ring-red-300/20 focus:border-red-400"
      : "border-gray-300 focus:ring-gray-400/20 focus:border-gray-400"
  }`

function SelectField({ value, onChange, options, placeholder, error }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass(error)} appearance-none pr-9`}
      >
        <option value="">{placeholder ?? "Seleccione"}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </div>
  )
}

export default function RegistrarOrdenModal({ isOpen, onClose, onSave }) {
  const [form,   setForm]   = useState(EMPTY)
  const [errors, setErrors] = useState({})

  const [prevOpenId, setPrevOpenId] = useState(null)
  const openId = isOpen ? "__new__" : null
  if (openId !== prevOpenId) {
    setPrevOpenId(openId)
    if (openId !== null) { setForm(EMPTY); setErrors({}) }
  }

  const handleField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const validate = () => {
    const next = {}
    if (!form.linea)              next.linea            = "Requerido"
    if (!form.cantidad)           next.cantidad         = "Requerido"
    if (!form.producto)           next.producto         = "Requerido"
    if (!form.codigoMP.trim())    next.codigoMP         = "Requerido"
    if (!form.turno)              next.turno            = "Requerido"
    if (!form.estado)             next.estado           = "Requerido"
    if (!form.fecha.trim())       next.fecha            = "Requerido"
    if (!form.codigoProduccion.trim()) next.codigoProduccion = "Requerido"
    return next
  }

  const handleSubmit = () => {
    const next = validate()
    if (Object.keys(next).length) { setErrors(next); return }
    onSave(form)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registrar orden de producción">
      <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 max-h-[58vh] overflow-y-auto pr-1">

        <Field label="Línea" error={errors.linea}>
          <SelectField value={form.linea} onChange={(v) => handleField("linea", v)} options={LINEAS} error={errors.linea} />
        </Field>

        <Field label="Cantidad" error={errors.cantidad}>
          <input
            type="number"
            placeholder="######"
            value={form.cantidad}
            onChange={(e) => handleField("cantidad", e.target.value)}
            className={inputClass(errors.cantidad)}
          />
        </Field>

        <Field label="Producto" error={errors.producto}>
          <SelectField value={form.producto} onChange={(v) => handleField("producto", v)} options={PRODUCTOS} error={errors.producto} />
        </Field>

        <Field label="Código de materia prima" error={errors.codigoMP}>
          <input
            type="text"
            placeholder="######"
            value={form.codigoMP}
            onChange={(e) => handleField("codigoMP", e.target.value)}
            className={inputClass(errors.codigoMP)}
          />
        </Field>

        <Field label="Turno" error={errors.turno}>
          <SelectField value={form.turno} onChange={(v) => handleField("turno", v)} options={TURNOS} error={errors.turno} />
        </Field>

        <Field label="Estado" error={errors.estado}>
          <SelectField value={form.estado} onChange={(v) => handleField("estado", v)} options={ESTADOS} error={errors.estado} />
        </Field>

        <Field label="Fecha" error={errors.fecha}>
          <input
            type="text"
            placeholder="Día/Mes/Año"
            value={form.fecha}
            onChange={(e) => handleField("fecha", e.target.value)}
            className={inputClass(errors.fecha)}
          />
        </Field>

        <Field label="Código de producción" error={errors.codigoProduccion}>
          <input
            type="text"
            placeholder="######"
            value={form.codigoProduccion}
            onChange={(e) => handleField("codigoProduccion", e.target.value)}
            className={inputClass(errors.codigoProduccion)}
          />
        </Field>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
        <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">Cancelar</button>
        <button onClick={handleSubmit} className="px-5 py-2 text-sm font-medium bg-red-700/90 hover:bg-red-800 text-white rounded-xl transition-all shadow-sm">Guardar</button>
      </div>
    </Modal>
  )
}