import { useRef, useState } from "react"
import { ChevronDown, X } from "lucide-react"

const estiloBase =
  "outline-none block w-full rounded-xl text-gray-500 max-w-xs text-xs border border-gray-200 bg-white pl-9 pr-3 py-2.5 placeholder:text-gray-400 focus:outline-none focus:border-gray-300 transition-colors"

export default function FilterInput({
  icon: Icon,
  placeholder = "",
  value = "",
  onChange,
  type = "text",
  desplegable = false,
  options,
  children,
  onClear,
}) {
  const [abierto, setAbierto] = useState(false)
  const ref = useRef(null)

  const handleBlur = (e) => {
    if (ref.current && !ref.current.contains(e.relatedTarget)) {
      setAbierto(false)
    }
  }

  if (!desplegable) {
    return (
      <div className="relative w-48">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={estiloBase}
        />
      </div>
    )
  }

  return (
    <div className="relative w-48" ref={ref} onBlur={handleBlur} tabIndex={-1}>
      {Icon && (
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 z-10" />
      )}
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        className={`${estiloBase} text-left pr-8`}
      >
        {value
          ? <span className="text-gray-700">{value}</span>
          : <span>{placeholder}</span>
        }
      </button>
      {value && onClear
        ? <X
            onClick={(e) => { e.stopPropagation(); onClear?.() }}
            className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer z-10"
          />
        : <ChevronDown
            className={`pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 transition-transform duration-200 z-10 ${abierto ? "rotate-180" : ""}`}
          />
      }
      {abierto && (
        <div className="absolute top-full mt-2 left-0 z-50">
          {options
            ? (
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden w-48">
                {options.map((o) => (
                  <div
                    key={o}
                    onClick={() => { onChange?.(o); setAbierto(false) }}
                    className="px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 cursor-pointer"
                  >
                    {o}
                  </div>
                ))}
              </div>
            )
            : children
          }
        </div>
      )}
    </div>
  )
}