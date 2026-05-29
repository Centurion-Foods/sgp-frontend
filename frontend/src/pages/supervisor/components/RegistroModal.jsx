import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Modal from '../../../shared/ui/Modal'

const MAQUINAS = ['Máquina 1', 'Máquina 2', 'Máquina 3', 'Línea A', 'Línea B']

const PRODUCTOS = [
  { codigo: '110052', nombre: 'AZUL X KG' },
  { codigo: '110053', nombre: 'AZUL 100 G X UND' },
  { codigo: '110255', nombre: 'AZUL CUÑA 250 G X UND' },
  { codigo: '90020',  nombre: 'BOLITAS DE CHORIZO' },
  { codigo: '110026', nombre: 'BRIE 125 G X UND' },
]

function Campo({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-500">{label}</label>
      {children}
    </div>
  )
}

const inputClass = `bg-white border border-gray-200 rounded-lg px-3 py-2
                    text-xs text-gray-700 placeholder-gray-300
                    focus:outline-none focus:border-gray-300 transition-all duration-200`

const defaultForm = {
  maquina: '', horaInicio: '', inicioAmPm: 'A.M.', horaFin: '', finAmPm: 'A.M.',
  unidades: '', horasParadas: '', producto: '', operarios: '', entrenamiento: '', observaciones: ''
}

// Función pura para crear el estado inicial del formulario
const createInitialForm = (registroEditable) => {
  if (registroEditable) {
    return {
      id: registroEditable.id,
      maquina: registroEditable.maquina || '',
      horaInicio: registroEditable.horaInicio || '',
      inicioAmPm: registroEditable.inicioAmPm || 'A.M.',
      horaFin: registroEditable.horaFin || '',
      finAmPm: registroEditable.finAmPm || 'A.M.',
      unidades: registroEditable.unidades || '',
      horasParadas: registroEditable.horasParadas || '',
      producto: registroEditable.producto || '',
      operarios: registroEditable.operarios || '',
      entrenamiento: registroEditable.entrenamiento || '',
      observaciones: registroEditable.observaciones || '',
    }
  }
  return { ...defaultForm }
}

export default function RegistroModal({ isOpen, onClose, onGuardar, registroEditable }) {
  // Inicializador perezoso: solo se ejecuta al montar el componente
  const [form, setForm] = useState(() => createInitialForm(registroEditable))

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))
  const handleProducto = (e) => setForm(f => ({ ...f, producto: e.target.value }))

  const productoSeleccionado = PRODUCTOS.find(p => p.nombre === form.producto)
  const codigoPT = productoSeleccionado?.codigo ?? '—'

  const handleGuardar = (e) => {
    e.preventDefault()
    onGuardar?.({ ...form, codigoPT })
    onClose()
  }

  const esEdicion = Boolean(registroEditable)

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={esEdicion ? 'Editar registro' : 'Agregar registro'}>
      <form key={registroEditable?.id || 'new'} onSubmit={handleGuardar} className="p-6">
        <div className="grid gap-x-8 gap-y-5" style={{ gridTemplateColumns: '2fr 3fr' }}>
          
          {/* Columna izquierda */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold text-gray-800">Ubicación</p>
              <Campo label="Máquina">
                <div className="relative">
                  <select value={form.maquina} onChange={set('maquina')} className={`${inputClass} w-full appearance-none pr-8 cursor-pointer`} required>
                    <option value="">Seleccione</option>
                    {MAQUINAS.map(m => <option key={m}>{m}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </Campo>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold text-gray-800">Horario de turno</p>
              <Campo label="Hora de Inicio">
                <div className="flex gap-2">
                  <input type="text" placeholder="H:MM" value={form.horaInicio} onChange={set('horaInicio')} className={`${inputClass} w-16 text-center`} />
                  <div className="relative flex-1">
                    <select value={form.inicioAmPm} onChange={set('inicioAmPm')} className={`${inputClass} w-full appearance-none pr-7 cursor-pointer`}>
                      <option>A.M.</option><option>P.M.</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </Campo>
              <Campo label="Hora de Fin">
                <div className="flex gap-2">
                  <input type="text" placeholder="H:MM" value={form.horaFin} onChange={set('horaFin')} className={`${inputClass} w-16 text-center`} />
                  <div className="relative flex-1">
                    <select value={form.finAmPm} onChange={set('finAmPm')} className={`${inputClass} w-full appearance-none pr-7 cursor-pointer`}>
                      <option>A.M.</option><option>P.M.</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </Campo>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold text-gray-800">Producción</p>
              <Campo label="Unidades Producidas">
                <input type="number" placeholder="#######" value={form.unidades} onChange={set('unidades')} className={`${inputClass} w-full`} />
              </Campo>
              <Campo label="Horas Paradas">
                <input type="number" placeholder="#######" value={form.horasParadas} onChange={set('horasParadas')} className={`${inputClass} w-full`} />
              </Campo>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold text-gray-800">Info de Producto</p>
              <Campo label="Producto">
                <div className="relative">
                  <select value={form.producto} onChange={handleProducto} className={`${inputClass} w-full appearance-none pr-8 cursor-pointer`}>
                    <option value="">Seleccione un producto</option>
                    {PRODUCTOS.map(p => (<option key={p.codigo} value={p.nombre}>{p.nombre}</option>))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </Campo>
              <Campo label="Código PT">
                <div className={`${inputClass} w-full bg-gray-50 text-gray-400 cursor-default select-none`}>{codigoPT}</div>
              </Campo>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold text-gray-800">Personal</p>
              <Campo label="Mano de Obra Empleada">
                <input type="number" placeholder="# de Operarios" value={form.operarios} onChange={set('operarios')} className={`${inputClass} w-full`} />
              </Campo>
              <Campo label="Personas en Entrenamiento">
                <input type="text" placeholder="Nombre" value={form.entrenamiento} onChange={set('entrenamiento')} className={`${inputClass} w-full`} />
              </Campo>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold text-gray-800">Observaciones</p>
              <textarea value={form.observaciones} onChange={set('observaciones')} rows={3} className={`${inputClass} w-full resize-none`} />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button type="submit" className="inline-flex items-center gap-2 bg-red-700/90 hover:bg-red-800 text-white font-medium px-4 py-2 rounded-xl transition-all text-sm shadow-sm shrink-0 hover:scale-98">
            {esEdicion ? 'Actualizar registro' : 'Guardar'}
          </button>
        </div>
      </form>
    </Modal>
  )
}