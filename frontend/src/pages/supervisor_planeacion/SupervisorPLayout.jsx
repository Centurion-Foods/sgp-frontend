import { Outlet, useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import { UserRound } from "lucide-react"
import { useAuth } from "../../auth/useAuth"

import TabsContainer from "../../shared/ui/TabsContainer"
import Tab from "../../shared/ui/Tab"
import UserMenu from "../../shared/ui/UserMenu"

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
          <Tab to="/supervisorplaneacion"             label="Informacion de producción" />
          <Tab to="/supervisorplaneacion/paradas"     label="Registros de paradas" />
        </TabsContainer>

        <div className="absolute right-10 top-3 flex items-center gap-3 z-30">
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className={`flex items-center justify-center w-9 h-9 border rounded-md transition-colors focus:outline-none ${
                isMenuOpen
                  ? "bg-red-800 border-red-800 text-white hover:bg-red-900"
                  : "bg-gray-100 border-gray-300 text-red-800 hover:bg-gray-200"
              }`}
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
            >
              <UserRound className="w-5 h-5 stroke-[1.8]" />
            </button>

            {isMenuOpen && (
              <UserMenu handleLogout={handleLogout} rol={"Supervisor Planeacion"} index={"SU"}/>
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