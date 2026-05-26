import { Outlet, useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import { UserRound } from "lucide-react"
import { useAuth } from "../../../../auth/useAuth"

import TabsContainer from "../../../../shared/components/ui/TabsContainer"
import Tab from "../../../../shared/components/ui/Tab"

export default function AdminLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    setIsMenuOpen(false)
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto bg-gray-100 transition-all">
      <header className="relative flex items-end shrink-0 pl-6 px-16 bg-white text-white">
        <TabsContainer>
          <Tab to="/admin" label="Usuarios" />
          <Tab to="/admin/roles" label="Roles" />
          <Tab to="/admin/permisos" label="Permisos" />
        </TabsContainer>

        <div className="absolute right-10 top-3 flex items-center gap-3 z-30">
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="flex items-center justify-center w-9 h-9 bg-gray-100 border border-gray-300 rounded-md text-red-800 hover:bg-gray-200 transition-colors focus:outline-none"
            >
              <UserRound className="w-5 h-5" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 border border-gray-200 bg-white rounded-2xl shadow-lg py-2 z-50 text-gray-800">
                <div className="px-4 pb-2 flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center font-semibold">AD</div>
                  <div>
                    <p className="text-sm font-semibold truncate">Administrador</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 pt-3 pb-1 text-sm text-gray-700 border-t border-gray-200 hover:text-red-700 transition-colors"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="w-full border-t-2 border-gray-300 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  )
}