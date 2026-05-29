import { Outlet, useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import { UserRound } from "lucide-react"
import { useAuth } from "../../auth/useAuth"

import TabsContainer from "../../shared/ui/TabsContainer"
import Tab from "../../shared/ui/Tab"
import UserMenu from "../../shared/ui/UserMenu"

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
              <UserMenu handleLogout={handleLogout} rol={"Administrador"} index={"AD"}/>
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