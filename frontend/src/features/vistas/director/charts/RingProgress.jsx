import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

export default function RingProgress({ pct }) {
  const valor = Math.min(Math.max(pct, 0), 100)
  
  const data = [
    { value: valor }, 
    { value: 100 - valor }
  ]

  return (
    <div className="relative w-30 h-30 shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
        <defs>
            <linearGradient id="gradientObjetivo" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E34444" /> 
              <stop offset="100%" stopColor="#8A0E0E" /> 
            </linearGradient>
        </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="75%"
            outerRadius="94%"
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            <Cell fill="url(#gradientObjetivo)" />
            <Cell fill="#f3f4f6" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Porcentaje en el centro */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[22px] font-medium text-gray-800 tracking-tight">
          {valor}%
        </span>
      </div>
    </div>
  )
}