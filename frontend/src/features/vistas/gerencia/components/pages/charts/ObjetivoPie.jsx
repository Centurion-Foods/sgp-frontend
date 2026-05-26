import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ObjetivoPie = ({ porcentaje = 72 }) => {
  const valorSeguro = Math.min(Math.max(porcentaje, 0), 100);
  
  const data = [
    { name: 'Completado', value: valorSeguro },
    { name: 'Restante', value: 100 - valorSeguro },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            <linearGradient id="gradientObjetivo" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fde047" /> 
              <stop offset="100%" stopColor="#ea580c" /> 
            </linearGradient>
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="75%"
            outerRadius="95%"
            paddingAngle={0}
            dataKey="value"
            startAngle={90} 
            endAngle={-270}
            cornerRadius={0} 
            stroke="none"
          >
            <Cell fill="url(#gradientObjetivo)" />
            <Cell fill="#f3f4f6" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-gray-500 text-md font-medium">Completado</span>
        <span className="text-4xl font-bold text-gray-900 tracking-tight">{valorSeguro}%</span>
      </div>
    </div>
  );
};

export default ObjetivoPie;