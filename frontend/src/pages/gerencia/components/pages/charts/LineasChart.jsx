import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LineasChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%" style={{ outline: 'none' }}>
    <AreaChart
      key={data.length}
      data={data}
    >
      <defs>
        <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.4} />
          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}   />
        </linearGradient>
        <linearGradient id="colorPasada" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.4} />
          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}   />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
      <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} tickMargin={10} tick={{ fill: '#9ca3af' }} />
      <YAxis axisLine={false} tickLine={false} fontSize={12} tickFormatter={(value) => (value === 0 ? '' : value)} tick={{ fill: '#9ca3af' }} />
      <Tooltip
        contentStyle={{
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        }}
        labelStyle={{ fontWeight: 'bold', color: '#333' }}
        labelFormatter={(value, payload) => {
          if (payload && payload.length > 0) return payload[0].payload.nombreCompleto
          return value
        }}
      />
      <Area type="linear" dataKey="Anterior" stroke="#f59e0b" fill="url(#colorPasada)" strokeWidth={2} />
      <Area type="linear" dataKey="Actual"   stroke="#ef4444" fill="url(#colorActual)" strokeWidth={2} />
    </AreaChart>
  </ResponsiveContainer>
)

export default LineasChart