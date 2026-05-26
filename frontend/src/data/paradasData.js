export const COLUMNAS_TABLA = [
  { llave: "linea", etiqueta: "Línea de producción" },
  { llave: "fecha", etiqueta: "Fecha" },
  { llave: "turno", etiqueta: "Turno" },
  { llave: "codigo", etiqueta: "Código", esResaltado: true },
  { llave: "producto", etiqueta: "Producto" },
  { llave: "descripcion", etiqueta: "Descripción" },
  { llave: "categoria", etiqueta: "Categoría" },
  { llave: "estado", etiqueta: "Estado" },
  { llave: "inicio", etiqueta: "Hora de inicio" },
  { llave: "fin", etiqueta: "Hora de fin" },
  { llave: "total", etiqueta: "Total" },
  { llave: "responsable", etiqueta: "Responsable" },
];

export const registroHistorico = [
  {
    month: "Mayo 2026",
    registros: [
      { linea: "Tajado 1", fecha: "22/05/2026", turno: "Día", codigo: "15767P", producto: "Muenster x 150 Ghalia", descripcion: "Cambio de orden", categoria: "Cambio de insumo", estado: "Estándar", inicio: "14:00", fin: "14:18", total: "00:18:00", responsable: "Producción" },
      { linea: "Porcionado", fecha: "18/05/2026", turno: "Noche", codigo: "110255", producto: "Azul Cuña 250g", descripcion: "Falla eléctrica moldes", categoria: "Mantenimiento", estado: "Crítico", inicio: "23:10", fin: "00:40", total: "01:30:00", responsable: "Mantenimiento" },
      { linea: "Azul", fecha: "05/05/2026", turno: "Tarde", codigo: "110052", producto: "Azul x Kg", descripcion: "Limpieza programada", categoria: "Sanidad", estado: "Estándar", inicio: "16:00", fin: "16:45", total: "00:45:00", responsable: "Calidad" }
    ]
  },
  {
    month: "Abril 2026",
    registros: [
      { linea: "Normalización", fecha: "28/04/2026", turno: "Día", codigo: "90020", producto: "Bolitas de Chorizo", descripcion: "Ajuste de dosificadora", categoria: "Mecánica", estado: "Estándar", inicio: "08:30", fin: "08:55", total: "00:25:00", responsable: "Mantenimiento" },
      { linea: "Tajado 1", fecha: "15/04/2026", turno: "Tarde", codigo: "10006", producto: "Cheddar 160 Taj Vertical", descripcion: "Falta de película plástica", categoria: "Logística", estado: "Crítico", inicio: "15:20", fin: "16:40", total: "01:20:00", responsable: "Logística" },
      { linea: "Porcionado", fecha: "02/04/2026", turno: "Noche", codigo: "10014", producto: "Cheddar Análogo Bloque", descripcion: "Atasco en cinta de salida", categoria: "Operación", estado: "Estándar", inicio: "02:15", fin: "02:30", total: "00:15:00", responsable: "Producción" }
    ]
  },
  {
    month: "Marzo 2026",
    registros: [
      { linea: "Tajado 1", fecha: "25/03/2026", turno: "Noche", codigo: "10012", producto: "Cheddar Fundido Centurión", descripcion: "Falta de mezcla base", categoria: "Logística", estado: "Crítico", inicio: "22:00", fin: "23:45", total: "01:45:00", responsable: "Logística" },
      { linea: "Azul", fecha: "14/03/2026", turno: "Día", codigo: "110053", producto: "Azul 100g x Und", descripcion: "Fuga de agua en enfriador", categoria: "Infraestructura", estado: "Crítico", inicio: "10:15", fin: "12:00", total: "01:45:00", responsable: "Mantenimiento" },
      { linea: "Normalización", fecha: "09/03/2026", turno: "Tarde", codigo: "110234", producto: "Briette Dulce de Leche", descripcion: "Calibración de balanza", categoria: "Metrología", estado: "Estándar", inicio: "17:40", fin: "17:55", total: "00:15:00", responsable: "Calidad" }
    ]
  },
  {
    month: "Febrero 2026",
    registros: [
      { linea: "Porcionado", fecha: "20/02/2026", turno: "Tarde", codigo: "10014", producto: "Cheddar Análogo Bloque", descripcion: "Cambio de formato cuchillas", categoria: "Cambio de insumo", estado: "Estándar", inicio: "13:00", fin: "13:42", total: "00:42:00", responsable: "Producción" },
      { linea: "Normalización", fecha: "11/02/2026", turno: "Día", codigo: "110235", producto: "Briette Smoky 125g", descripcion: "Inspección de seguridad", categoria: "Auditoría", estado: "Estándar", inicio: "09:00", fin: "09:30", total: "00:30:00", responsable: "Seguridad" },
      { linea: "Tajado 1", fecha: "03/02/2026", turno: "Noche", codigo: "15767P", producto: "Muenster x 150 Ghalia", descripcion: "Falla de vacío en termoformadora", categoria: "Mecánica", estado: "Crítico", inicio: "04:10", fin: "05:30", total: "01:20:00", responsable: "Mantenimiento" }
    ]
  },
  {
    month: "Enero 2026",
    registros: [
      { linea: "Azul", fecha: "27/01/2026", turno: "Día", codigo: "110052", producto: "Azul x Kg", descripcion: "Mantenimiento preventivo bimensual", categoria: "Mantenimiento", estado: "Estándar", inicio: "08:00", fin: "11:00", total: "03:00:00", responsable: "Mantenimiento" },
      { linea: "Normalización", fecha: "15/01/2026", turno: "Noche", codigo: "110406", producto: "Briette Creamy Mild 125g", descripcion: "Bloqueo de paletizadora", categoria: "Automatización", estado: "Estándar", inicio: "01:05", fin: "01:25", total: "00:20:00", responsable: "Mantenimiento" },
      { linea: "Porcionado", fecha: "08/01/2026", turno: "Tarde", codigo: "10014", producto: "Cheddar Análogo Bloque", descripcion: "Inducción de nuevo operador", categoria: "Capacitación", estado: "Estándar", inicio: "14:30", fin: "15:15", total: "00:45:00", responsable: "Producción" }
    ]
  },
  {
    month: "Diciembre 2025",
    registros: [
      { linea: "Tajado 1", fecha: "23/12/2025", turno: "Tarde", codigo: "10012", producto: "Cheddar Fundido Centurión", descripcion: "Limpieza profunda fin de año", categoria: "Sanidad", estado: "Estándar", inicio: "16:00", fin: "19:00", total: "03:00:00", responsable: "Calidad" },
      { linea: "Normalización", fecha: "16/12/2025", turno: "Día", codigo: "90020", producto: "Bolitas de Chorizo", descripcion: "Sobrecalentamiento de motor", categoria: "Eléctrica", estado: "Crítico", inicio: "11:15", fin: "12:45", total: "01:30:00", responsable: "Mantenimiento" },
      { linea: "Azul", fecha: "04/12/2025", turno: "Noche", codigo: "110255", producto: "Azul Cuña 250g", descripcion: "Espera de validación de lote", categoria: "Calidad", estado: "Estándar", inicio: "03:40", fin: "04:10", total: "00:30:00", responsable: "Calidad" }
    ]
  },
  {
    month: "Noviembre 2025",
    registros: [
      { linea: "Porcionado", fecha: "26/11/2025", turno: "Día", codigo: "10006", producto: "Cheddar 160 Taj Vertical", descripcion: "Ajuste de guías de arrastre", categoria: "Operación", estado: "Estándar", inicio: "10:00", fin: "10:20", total: "00:20:00", responsable: "Producción" },
      { linea: "Tajado 1", fecha: "12/11/2025", turno: "Noche", codigo: "15767P", producto: "Muenster x 150 Ghalia", descripcion: "Rotura de resistencia de sellado", categoria: "Mecánica", estado: "Crítico", inicio: "21:30", fin: "22:45", total: "01:15:00", responsable: "Mantenimiento" },
      { linea: "Normalización", fecha: "05/11/2025", turno: "Tarde", codigo: "110234", producto: "Briette Dulce de Leche", descripcion: "Purga de tuberías de dosificado", categoria: "Sanidad", estado: "Estándar", inicio: "15:00", fin: "15:35", total: "00:35:00", responsable: "Producción" }
    ]
  },
  {
    month: "Octubre 2025",
    registros: [
      { linea: "Azul", fecha: "29/10/2025", turno: "Noche", codigo: "110052", producto: "Azul x Kg", descripcion: "Falta de operarios (Ausentismo)", categoria: "Recursos Humanos", estado: "Crítico", inicio: "22:00", fin: "00:00", total: "02:00:00", responsable: "Producción" },
      { linea: "Porcionado", fecha: "14/10/2025", turno: "Día", codigo: "10014", producto: "Cheddar Análogo Bloque", descripcion: "Cambio de película inferior", categoria: "Cambio de insumo", estado: "Estándar", inicio: "08:15", fin: "08:33", total: "00:18:00", responsable: "Producción" },
      { linea: "Tajado 1", fecha: "07/10/2025", turno: "Tarde", codigo: "10012", producto: "Cheddar Fundido Centurión", descripcion: "Baja presión de aire comprimido", categoria: "Servicios Auxiliares", estado: "Crítico", inicio: "14:40", fin: "15:55", total: "01:15:00", responsable: "Mantenimiento" }
    ]
  },
  {
    month: "Septiembre 2025",
    registros: [
      { linea: "Normalización", fecha: "22/09/2025", turno: "Tarde", codigo: "110235", producto: "Briette Smoky 125g", descripcion: "Pruebas de nuevo empaque experimental", categoria: "Desarrollo", estado: "Estándar", inicio: "16:10", fin: "17:10", total: "01:00:00", responsable: "Calidad" },
      { linea: "Azul", fecha: "17/09/2025", turno: "Día", codigo: "110255", producto: "Azul Cuña 250g", descripcion: "Atasco en el sinfín de alimentación", categoria: "Mecánica", estado: "Estándar", inicio: "11:30", fin: "12:05", total: "00:35:00", responsable: "Mantenimiento" },
      { linea: "Porcionado", fecha: "03/09/2025", turno: "Noche", codigo: "10006", producto: "Cheddar 160 Taj Vertical", descripcion: "Falta de cajas Master", categoria: "Logística", estado: "Estándar", inicio: "04:50", fin: "05:15", total: "00:25:00", responsable: "Logística" }
    ]
  },
  {
    month: "Agosto 2025",
    registros: [
      { linea: "Tajado 1", fecha: "26/08/2025", turno: "Día", codigo: "15767P", producto: "Muenster x 150 Ghalia", descripcion: "Error de software en etiquetadora", categoria: "Sistemas", estado: "Estándar", inicio: "09:15", fin: "09:45", total: "00:30:00", responsable: "Mantenimiento" },
      { linea: "Normalización", fecha: "19/08/2025", turno: "Noche", codigo: "90020", producto: "Bolitas de Chorizo", descripcion: "Rotura de banda transportadora principal", categoria: "Mecánica", estado: "Crítico", inicio: "23:00", fin: "01:30", total: "02:30:00", responsable: "Mantenimiento" },
      { linea: "Azul", fecha: "06/08/2025", turno: "Tarde", codigo: "110053", producto: "Azul 100g x Und", descripcion: "Limpieza intermedia de tolvas", categoria: "Sanidad", estado: "Estándar", inicio: "15:30", fin: "16:05", total: "00:35:00", responsable: "Producción" }
    ]
  },
  {
    month: "Julio 2025",
    registros: [
      { linea: "Porcionado", fecha: "29/07/2025", turno: "Tarde", codigo: "10014", producto: "Cheddar Análogo Bloque", descripcion: "Corte de energía externo (Planta)", categoria: "Servicios Auxiliares", estado: "Crítico", inicio: "17:20", fin: "18:50", total: "01:30:00", responsable: "Mantenimiento" },
      { linea: "Tajado 1", fecha: "15/07/2025", turno: "Día", codigo: "10012", producto: "Cheddar Fundido Centurión", descripcion: "Cambio de lote de bobina externa", categoria: "Cambio de insumo", estado: "Estándar", inicio: "11:00", fin: "11:15", total: "00:15:00", responsable: "Producción" },
      { linea: "Normalización", fecha: "02/07/2025", turno: "Noche", codigo: "110406", producto: "Briette Creamy Mild 125g", descripcion: "Descalibración del sensor óptico", categoria: "Automatización", estado: "Estándar", inicio: "05:10", fin: "05:35", total: "00:25:00", responsable: "Mantenimiento" }
    ]
  },
  {
    month: "Junio 2025",
    registros: [
      { linea: "Azul", fecha: "24/06/2025", turno: "Día", codigo: "110052", producto: "Azul x Kg", descripcion: "Fallo en compresor de frío de cámaras", categoria: "Infraestructura", estado: "Crítico", inicio: "07:45", fin: "10:15", total: "02:30:00", responsable: "Mantenimiento" },
      { linea: "Normalización", fecha: "17/06/2025", turno: "Tarde", codigo: "110234", producto: "Briette Dulce de Leche", descripcion: "Ajuste menor de boquillas neumáticas", categoria: "Operación", estado: "Estándar", inicio: "14:15", fin: "14:35", total: "00:20:00", responsable: "Producción" },
      { linea: "Porcionado", fecha: "05/06/2025", turno: "Noche", codigo: "10006", producto: "Cheddar 160 Taj Vertical", descripcion: "Desborde en tolva de dosificación", categoria: "Operación", estado: "Estándar", inicio: "01:10", fin: "01:40", total: "00:30:00", responsable: "Producción" }
    ]
  }
];

export const totalesPorMes = {
  "Mayo 2026": [
    { codigo: "15767P", horas: "00:18:00" },
    { codigo: "110255", horas: "01:30:00" },
    { codigo: "110052", horas: "00:45:00" }
  ],
  "Abril 2026": [
    { codigo: "90020", horas: "00:25:00" },
    { codigo: "10006", horas: "01:20:00" },
    { codigo: "10014", horas: "00:15:00" }
  ],
  "Marzo 2026": [
    { codigo: "10012", horas: "01:45:00" },
    { codigo: "110053", horas: "01:45:00" },
    { codigo: "110234", horas: "00:15:00" }
  ],
  "Febrero 2026": [
    { codigo: "10014", horas: "00:42:00" },
    { codigo: "110235", horas: "00:30:00" },
    { codigo: "15767P", horas: "01:20:00" }
  ],
  "Enero 2026": [
    { codigo: "110052", horas: "03:00:00" },
    { codigo: "110406", horas: "00:20:00" },
    { codigo: "10014", horas: "00:45:00" }
  ],
  "Diciembre 2025": [
    { codigo: "10012", horas: "03:00:00" },
    { codigo: "90020", horas: "01:30:00" },
    { codigo: "110255", horas: "00:30:00" }
  ],
  "Noviembre 2025": [
    { codigo: "10006", horas: "00:20:00" },
    { codigo: "15767P", horas: "01:15:00" },
    { codigo: "110234", horas: "00:35:00" }
  ],
  "Octubre 2025": [
    { codigo: "110052", horas: "02:00:00" },
    { codigo: "10014", horas: "00:18:00" },
    { codigo: "10012", horas: "01:15:00" }
  ],
  "Septiembre 2025": [
    { codigo: "110235", horas: "01:00:00" },
    { codigo: "110255", horas: "00:35:00" },
    { codigo: "10006", horas: "00:25:00" }
  ],
  "Agosto 2025": [
    { codigo: "15767P", horas: "00:30:00" },
    { codigo: "90020", horas: "02:30:00" },
    { codigo: "110053", horas: "00:35:00" }
  ],
  "Julio 2025": [
    { codigo: "10014", horas: "01:30:00" },
    { codigo: "10012", horas: "00:15:00" },
    { codigo: "110406", horas: "00:25:00" }
  ],
  "Junio 2025": [
    { codigo: "110052", horas: "02:30:00" },
    { codigo: "110234", horas: "00:20:00" },
    { codigo: "10006", horas: "00:30:00" }
  ]
};