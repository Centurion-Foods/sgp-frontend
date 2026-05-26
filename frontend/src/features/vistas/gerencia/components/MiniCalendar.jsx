import { useMemo, useState } from 'react'

const WEEK_DAYS = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']

function startOfMonth(year, month) {
  return new Date(year, month, 1)
}

function endOfMonth(year, month) {
  return new Date(year, month + 1, 0)
}

function formatISOFromParts(y, m, d) {
  const yS = String(y)
  const mS = String(m + 1).padStart(2, '0')
  const dS = String(d).padStart(2, '0')
  return `${yS}-${mS}-${dS}`
}

function formatISO(date) {
  return formatISOFromParts(date.getFullYear(), date.getMonth(), date.getDate())
}

function parseISOToLocal(iso) {
  if (!iso) return null
  if (typeof iso === 'string' && iso.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const [y, m, d] = iso.split('-').map(Number)
    return new Date(y, m - 1, d)
  }
  return new Date(iso)
}

export default function MiniCalendar({ value, onChange }) {
  const today = new Date()
  const parsed = parseISOToLocal(value) || today

  const [navOffset, setNavOffset] = useState(0)

  const base = parsed

  const displayDate = useMemo(() => new Date(base.getFullYear(), base.getMonth() + navOffset, 1), [base, navOffset])
  const displayYear = displayDate.getFullYear()
  const displayMonth = displayDate.getMonth()

  const monthName = useMemo(() => displayDate.toLocaleString('es-ES', { month: 'long' }), [displayDate])

  const firstDay = startOfMonth(displayYear, displayMonth)
  const lastDay = endOfMonth(displayYear, displayMonth)

  const firstWeekIndex = (firstDay.getDay() + 6) % 7

  const days = []
  for (let i = 0; i < firstWeekIndex; i++) days.push(null)
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(displayYear, displayMonth, d))

  const handlePrev = () => setNavOffset((n) => n - 1)
  const handleNext = () => setNavOffset((n) => n + 1)

  const handleSelect = (d) => {
    if (!d) return
    onChange(formatISO(d))
  }

  const isSameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

  const selected = parseISOToLocal(value)

  return (
    <div className="w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-3 text-gray-800">
      <div className="flex items-center justify-between px-1 mb-2">
        <button onClick={handlePrev} className="p-2 text-red-800">‹</button>
        <div className="text-sm font-semibold">{monthName.charAt(0).toUpperCase() + monthName.slice(1)}</div>
        <button onClick={handleNext} className="p-1 text-red-800">›</button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-[12px] text-center text-gray-600 mb-1">
        {WEEK_DAYS.map((w) => (
          <div key={w} className="py-1">{w}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm">
        {days.map((d, idx) => {
          const isToday = isSameDay(d, today)
          const isSelected = isSameDay(d, selected)
          return (
            <div
              key={idx}
              onClick={() => handleSelect(d)}
              className={`h-8 flex items-center justify-center rounded-md cursor-pointer ${d ? 'hover:bg-gray-100' : ''} ${isSelected ? 'bg-amber-100 text-amber-800 font-semibold' : isToday ? 'border-2 border-amber-700/50' : 'text-gray-700'}`}
            >
              {d ? d.getDate() : ''}
            </div>
          )
        })}
      </div>
    </div>
  )
}
