import { useState } from 'react';

const dataSets = {
  diaria: [
    { name: '00:00', nombreCompleto: '00:00', Actual: 100, Anterior: 80 },
    { name: '12:00', nombreCompleto: '12:00', Actual: 300, Anterior: 250 },
    { name: '16:00', nombreCompleto: '16:00', Actual: 200, Anterior: 210 },
    { name: '24:00', nombreCompleto: '24:00', Actual: 400, Anterior: 320 },
  ],
  semanal: [
    { name: 'Lun', nombreCompleto: 'Lunes', Actual: 4000, Anterior: 2400 },
    { name: 'Mar', nombreCompleto: 'Martes', Actual: 3000, Anterior: 1398 },
    { name: 'Mie', nombreCompleto: 'Miércoles', Actual: 2000, Anterior: 3800 },
    { name: 'Jue', nombreCompleto: 'Jueves', Actual: 2780, Anterior: 3908 },
    { name: 'Vie', nombreCompleto: 'Viernes', Actual: 1890, Anterior: 4800 },
    { name: 'Sáb', nombreCompleto: 'Sábado', Actual: 1500, Anterior: 2000 },
    { name: 'Dom', nombreCompleto: 'Domingo', Actual: 1200, Anterior: 1800 },
  ],
  mensual: [
    { name: 'Sem 1', nombreCompleto: 'Semana 1', Actual: 15000, Anterior: 12000 },
    { name: 'Sem 2', nombreCompleto: 'Semana 2', Actual: 12000, Anterior: 15000 },
    { name: 'Sem 3', nombreCompleto: 'Semana 3', Actual: 18000, Anterior: 11000 },
    { name: 'Sem 4', nombreCompleto: 'Semana 4', Actual: 21000, Anterior: 17000 },
  ],
};

export const useDashboardChart = () => {
  const [filtro, setFiltro] = useState('semanal');

  const dataActual = dataSets[filtro];

  return {
    filtro,
    setFiltro,
    dataActual
  };
};