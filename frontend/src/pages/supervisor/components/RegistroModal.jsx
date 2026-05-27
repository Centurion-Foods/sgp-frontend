import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'

const MAQUINAS = ['Máquina 1', 'Máquina 2', 'Máquina 3', 'Línea A', 'Línea B']

const PRODUCTOS = [
  { codigo: '110052', nombre: 'AZUL X KG' },
  { codigo: '110053', nombre: 'AZUL 100 G X UND'   },
  { codigo: '110255', nombre: 'AZUL CUÑA 250 G X UND'      },
  { codigo: '90020',  nombre: 'BOLITAS DE CHORIZO' },
  { codigo: '110026', nombre: 'BRIE 125 G X UND'    },
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

export default function RegistroModal({ onClose, onGuardar, registroEditable }) {
  const [form, setForm] = useState(() => {
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
    return {
      maquina:       '',
      horaInicio:    '',
      inicioAmPm:    'A.M.',
      horaFin:       '',
      finAmPm:       'A.M.',
      unidades:      '',
      horasParadas:  '',
      producto:      '',
      operarios:     '',
      entrenamiento: '',
      observaciones: '',
    }
  })

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleProducto = (e) => {
    setForm(f => ({ ...f, producto: e.target.value }))
  }

  const productoSeleccionado = PRODUCTOS.find(p => p.nombre === form.producto)
  const codigoPT = productoSeleccionado?.codigo ?? '—'

  const handleGuardar = (e) => {
    e.preventDefault()
    onGuardar?.({ ...form, codigoPT })
    onClose()
  }

  const esEdicion = Boolean(registroEditable)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(2px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-100 overflow-hidden"
        style={{ animation: 'modalIn 0.2s ease both' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            {esEdicion ? 'Editar registro' : 'Agregar registro'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleGuardar} className="p-6">
          <div className="grid gap-x-8 gap-y-5" style={{ gridTemplateColumns: '2fr 3fr' }}>

            {/* ── Columna izquierda ── */}
            <div className="flex flex-col gap-5">

              <div className="flex flex-col gap-3">
                <p className="text-sm font-bold text-gray-800">Ubicación</p>
                <Campo label="Máquina">
                  <div className="relative">
                    <select
                      value={form.maquina}
                      onChange={set('maquina')}
                      className={`${inputClass} w-full appearance-none pr-8 cursor-pointer`}
                      required
                    >
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
                    <input 
                      type="text" 
                      placeholder="H:MM" 
                      value={form.horaInicio} 
                      onChange={set('horaInicio')} 
                      className={`${inputClass} w-16 text-center`} 
                    />
                    <div className="relative flex-1">
                      <select 
                        value={form.inicioAmPm} 
                        onChange={set('inicioAmPm')} 
                        className={`${inputClass} w-full appearance-none pr-7 cursor-pointer`}
                      >
                        <option>A.M.</option>
                        <option>P.M.</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </Campo>
                
                <Campo label="Hora de Fin">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="H:MM" 
                      value={form.horaFin} 
                      onChange={set('horaFin')} 
                      className={`${inputClass} w-16 text-center`} 
                    />
                    <div className="relative flex-1">
                      <select 
                        value={form.finAmPm} 
                        onChange={set('finAmPm')} 
                        className={`${inputClass} w-full appearance-none pr-7 cursor-pointer`}
                      >
                        <option>A.M.</option>
                        <option>P.M.</option>
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

            {/* ── Columna derecha ── */}
            <div className="flex flex-col gap-5">

              <div className="flex flex-col gap-3">
                <p className="text-sm font-bold text-gray-800">Info de Producto</p>

                <Campo label="Producto">
                  <div className="relative">
                    <select
                      value={form.producto}
                      onChange={handleProducto}
                      className={`${inputClass} w-full appearance-none pr-8 cursor-pointer`}
                    >
                      <option value="">Seleccione un producto</option>
                      {PRODUCTOS.map(p => (
                        <option key={p.codigo} value={p.nombre}>{p.nombre}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </Campo>

                <Campo label="Código PT">
                  <div className={`${inputClass} w-full bg-gray-50 text-gray-400 cursor-default select-none`}>
                    {codigoPT}
                  </div>
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
                <textarea
                  value={form.observaciones}
                  onChange={set('observaciones')}
                  rows={3}
                  className={`${inputClass} w-full resize-none`}
                />
              </div>

            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 hover:scale-99 text-white
                         text-xs font-semibold px-6 py-2.5 rounded-lg
                         shadow-sm hover:shadow-md hover:cursor-pointer
                         transition-all duration-200"
            >
              {esEdicion ? 'Actualizar registro' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.97) translateY(6px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </div>
  )
}