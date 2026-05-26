import { Search } from "lucide-react"
 
export default function UserSearch({ value, onChange }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar por nombre o correo..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-gray-400/10 focus:border-gray-300 transition-all"
        />
      </div>
    </div>
  )
}
 