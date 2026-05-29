import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import { Calendar, UserRound } from "lucide-react"
import { useAuth } from "../../../auth/useAuth"
import MiniCalendar from "./MiniCalendar"

import TabsContainer from "../../../shared/ui/TabsContainer"
import Tab from "../../../shared/ui/Tab"
import UserMenu from "../../../shared/ui/UserMenu"

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split('T')[0]
  })

  const menuRef = useRef(null)
  const calendarRef = useRef(null)
  const [showCalendar, setShowCalendar] = useState(false)

  const { logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target) && !event.target.closest('[data-calendar-button]')) {
        setShowCalendar(false)
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
        setShowCalendar(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const isDashboardPath = location.pathname === "/gerencia" || location.pathname === "/director"
  const showCalendarInDashboard = isDashboardPath && showCalendar

  const openDatePicker = () => {
    if (!isDashboardPath) return
    setShowCalendar((v) => !v)
  }

  const handleLogout = async () => {
    setIsMenuOpen(false)
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto bg-gray-100 transition-all">

      <header className="relative flex items-end shrink-0 pl-6 px-16 bg-white">
        <TabsContainer>
          <Tab to="/gerencia" label="Dashboard" />
          <Tab to="/gerencia/historicos" label="Datos históricos" />
        </TabsContainer>

        <div className="absolute right-10 top-3 flex items-center gap-3 z-30">

          {isDashboardPath && (
            <div className="relative flex items-center">
              <button
                data-calendar-button
                onClick={openDatePicker}
                className={`flex items-center justify-center w-9 h-9 border rounded-md transition-colors focus:outline-none ${
                  showCalendar
                    ? "bg-red-800 border-red-800 text-white hover:bg-red-900"
                    : "bg-gray-100 border-gray-300 text-red-800 hover:bg-gray-200"
                }`}
                aria-label="Abrir calendario"
              >
                <Calendar className="w-5 h-5 stroke-[1.8]" />
              </button>

              {showCalendarInDashboard && (
                <div ref={calendarRef} className="absolute top-full mt-2 right-0 z-50">
                  <MiniCalendar
                    value={selectedDate}
                    onChange={(iso) => {
                      setSelectedDate(iso)
                      setShowCalendar(false)
                    }}
                  />
                </div>
              )}
            </div>
          )}

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
              <UserMenu handleLogout={handleLogout} rol={"Gerente"} index={"GE"}/>
            )}
          </div>

        </div>
      </header>

      <main className="w-full bg-gray-100 p-6 border-gray-300 border-t-2">
        <Outlet context={{ selectedDate }} />
      </main>

    </div>
  )
}