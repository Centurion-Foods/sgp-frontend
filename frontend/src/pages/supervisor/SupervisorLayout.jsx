import { Outlet, useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import { UserRound } from "lucide-react"
import { useAuth } from "../../auth/useAuth"

import TabsContainer from "../../shared/ui/TabsContainer"
import Tab from "../../shared/ui/Tab"

export default function Layout() {
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
    
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const handleLogout = async () => {
    setIsMenuOpen(false)
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto bg-gray-100 transition-all">

      <header className="relative flex items-end shrink-0 pl-6 px-16 bg-white">
        <TabsContainer>
          <Tab to="/supervisor"                   label="Registros" />
          <Tab to="/supervisor/gestion-productos" label="Códigos de producto" />
          <Tab to="/supervisor/historicos"        label="Datos históricos" />
        </TabsContainer>

        <div className="absolute right-10 top-3 flex items-center gap-3 z-30">
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="flex items-center justify-center w-9 h-9 bg-gray-100 border border-gray-300 rounded-md text-red-800 hover:bg-gray-200 transition-colors focus:outline-none cursor-pointer"
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
            >
              <UserRound className="w-5 h-5 stroke-[1.8]" />
            </button>

            {isMenuOpen && (
              <div role="menu" className="absolute right-0 mt-2 w-56 border border-gray-200 bg-white rounded-2xl shadow-lg py-2 z-50">
                <div className="px-4 pb-2 flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-semibold select-none">SU</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 truncate">Supervisor</p>
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
            )}
          </div>
        </div>
      </header>

      <main className="w-full bg-gray-100 p-6 border-gray-300 border-t-2">
        <Outlet />
      </main>

    </div>
  )
}