export default function UserMenu ({handleLogout, rol, index }) {
    return (
            <div role="menu" className="absolute right-0 mt-2 w-56 border border-gray-200 bg-white rounded-2xl shadow-lg py-2 z-50">
        <div className="px-4 pb-2 flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-semibold select-none">{index}</div>
            <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800 truncate">{rol}</p>
            </div>
        </div>
        <div className="mt-1">
            <button
            onClick={handleLogout}
            className="w-full text-left px-4 pt-3 pb-1 text-sm text-gray-700 border-t border-gray-200 hover:text-red-700/80 transition-colors duration-500 cursor-pointer"
            >
            Cerrar sesión
            </button>
        </div>
    </div>
    )
}       
              
