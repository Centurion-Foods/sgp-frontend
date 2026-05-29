import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Modal from "../../../shared/ui/Modal"

const CODIGOS_PRODUCCION = {
  "15767P": { linea: "Tajado 1",    fecha: "08/05/2026", turno: "Día",   producto: "Muenster x 150 Ghalla" },
  "15768P": { linea: "Porcionado",  fecha: "08/05/2026", turno: "Noche", producto: "Cheddar x 200g"         },
  "15769P": { linea: "Azul",        fecha: "09/05/2026", turno: "Día",   producto: "Azul x 100g"            },
  "15770P": { linea: "Normalización", fecha: "09/05/2026", turno: "Día", producto: "Edam x 250g"            },
}

const CATEGORIAS = ["Cambio de insumo", "Mantenimiento", "Sanidad", "Mecánica", "Logística", "Operación"]
const ESTADOS    = ["Estándar", "Crítico", "Pendiente", "Resuelto"]

const EMPTY = {
  codigo: "", linea: "", fecha: "", turno: "", producto: "",
  descripcion: "", categoria: "", estado: "",
  horaInicio: "", horaFin: "", responsable: ""
}

const calcTotal = (inicio, fin) => {
  if (!inicio || !fin) return ""
  const [h1, m1] = inicio.split(":").map(Number)
  const [h2, m2] = fin.split(":").map(Number)
  const mins = (h2 * 60 + m2) - (h1 * 60 + m1)
  if (mins <= 0) return ""
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
}

function Field({ label, error, children, span = 1 }) {
  return (
    <div className={span === 2 ? "col-span-2" : ""}>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>
        {children}
        {error && <p className="text-xs text-red-600 mt-0.5">{error}</p>}
      </div>
    </div>
  )
}

const inputBase = "w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
const inputNormal  = (error) => `${inputBase} bg-gray-50 text-gray-900 ${error ? "border-red-400 focus:ring-red-300/20 focus:border-red-400" : "border-gray-300 focus:ring-gray-400/20 focus:border-gray-400"}`
const inputAuto    = `${inputBase} bg-gray-100 border-gray-200 text-gray-500 cursor-default select-none`
const inputTime    = (error) => `${inputNormal(error)} [color-scheme:light]`

function SelectField({ value, onChange, options, placeholder, error }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputNormal(error)} appearance-none pr-9`}
      >
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </div>
  )
}

export default function RegistrarParadaModal({ isOpen, onClose, onSave }) {
  const [form,   setForm]   = useState(EMPTY)
  const [errors, setErrors] = useState({})

  const [prevOpenId, setPrevOpenId] = useState(null)
  const openId = isOpen ? "__new__" : null

  if (openId !== prevOpenId) {
    setPrevOpenId(openId)
    if (openId !== null) { setForm(EMPTY); setErrors({}) }
  }

  const handleCodigo = (value) => {
    const info = CODIGOS_PRODUCCION[value.toUpperCase()] ?? { linea: "", fecha: "", turno: "", producto: "" }
    setForm(prev => ({ ...prev, codigo: value, ...info }))
    if (errors.codigo) setErrors(prev => ({ ...prev, codigo: null }))
  }

  const handleField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }))
  }

  const total = calcTotal(form.horaInicio, form.horaFin)

  const validate = () => {
    const next = {}
    if (!form.codigo.trim())      next.codigo      = "Requerido"
    if (!form.descripcion.trim()) next.descripcion = "Requerido"
    if (!form.categoria)          next.categoria   = "Requerido"
    if (!form.estado)             next.estado      = "Requerido"
    if (!form.horaInicio)         next.horaInicio  = "Requerido"
    if (!form.horaFin)            next.horaFin     = "Requerido"
    else if (!total)              next.horaFin     = "Debe ser mayor a la hora de inicio"
    if (!form.responsable.trim()) next.responsable = "Requerido"
    return next
  }

  const handleSubmit = () => {
    const next = validate()
    if (Object.keys(next).length) { setErrors(next); return }
    onSave({ ...form, total })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registrar parada">
      <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 max-h-[58vh] overflow-y-auto pr-1">

        {/* Código */}
        <Field label="Código de producción" error={errors.codigo} span={2}>
          <input
            type="text"
            placeholder="Ej. 15767P"
            value={form.codigo}
            onChange={(e) => handleCodigo(e.target.value)}
            className={inputNormal(errors.codigo)}
          />
        </Field>

        {/* Auto-filled */}
        <Field label="Línea de producción">
          <input readOnly value={form.linea} placeholder="—" className={inputAuto} tabIndex={-1} />
        </Field>
        <Field label="Fecha">
          <input readOnly value={form.fecha} placeholder="—" className={inputAuto} tabIndex={-1} />
        </Field>
        <Field label="Turno">
          <input readOnly value={form.turno} placeholder="—" className={inputAuto} tabIndex={-1} />
        </Field>
        <Field label="Producto">
          <input readOnly value={form.producto} placeholder="—" className={inputAuto} tabIndex={-1} />
        </Field>

        {/* Descripción */}
        <Field label="Descripción" error={errors.descripcion} span={2}>
          <input
            type="text"
            placeholder="Describe brevemente la parada..."
            value={form.descripcion}
            onChange={(e) => handleField("descripcion", e.target.value)}
            className={inputNormal(errors.descripcion)}
          />
        </Field>

        {/* Categoría y Estado */}
        <Field label="Categoría" error={errors.categoria}>
          <SelectField
            value={form.categoria}
            onChange={(v) => handleField("categoria", v)}
            options={CATEGORIAS}
            placeholder="Seleccionar..."
            error={errors.categoria}
          />
        </Field>
        <Field label="Estado" error={errors.estado}>
          <SelectField
            value={form.estado}
            onChange={(v) => handleField("estado", v)}
            options={ESTADOS}
            placeholder="Seleccionar..."
            error={errors.estado}
          />
        </Field>

        {/* Horas */}
        <Field label="Hora de inicio" error={errors.horaInicio}>
          <input
            type="time"
            value={form.horaInicio}
            onChange={(e) => handleField("horaInicio", e.target.value)}
            className={inputTime(errors.horaInicio)}
          />
        </Field>
        <Field label="Hora de fin" error={errors.horaFin}>
          <input
            type="time"
            value={form.horaFin}
            onChange={(e) => handleField("horaFin", e.target.value)}
            className={inputTime(errors.horaFin)}
          />
        </Field>

        {/* Total */}
        <Field label="Total de horas" span={2}>
          <div className="relative">
            <input
              readOnly
              value={total}
              placeholder="Se calcula automáticamente"
              className={`${inputAuto} ${total ? "text-gray-700 font-medium" : ""}`}
              tabIndex={-1}
            />
            {total && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">hh:mm</span>
            )}
          </div>
        </Field>

        {/* Responsable */}
        <Field label="Responsable" error={errors.responsable} span={2}>
          <input
            type="text"
            placeholder="Nombre del responsable"
            value={form.responsable}
            onChange={(e) => handleField("responsable", e.target.value)}
            className={inputNormal(errors.responsable)}
          />
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
          className="px-5 py-2 text-sm font-medium bg-red-700/90 hover:bg-red-800 text-white rounded-xl transition-all shadow-sm"
        >
          Registrar parada
        </button>
      </div>
    </Modal>
  )
}