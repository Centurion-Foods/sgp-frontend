import { FilePenLine } from 'lucide-react'

export default function RegistroCard({ lugar, responsable, fecha, onEdit }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-1 hover:border-gray-300 hover:shadow-sm hover:scale-98 transition-all duration-200 group">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-gray-800 leading-snug">{lugar}</p>
        <button onClick={onEdit} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-red-600 p-0.5 rounded shrink-0 hover:cursor-pointer" aria-label="Editar registro">
          <FilePenLine className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-gray-500"><span className="text-gray-400">Responsable: </span>{responsable}</p>
      <p className="text-xs text-gray-500"><span className="text-gray-400">Fecha de registro: </span>{fecha}</p>
    </div>
  )
}