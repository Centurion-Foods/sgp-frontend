const BASE_REGISTROS = Array.from({ length: 19 }, (_, i) => ({
  id: i + 1,
  fecha:    i < 11 ? "5/5/2026"  : "4/5/2026",
  turno:    i < 7  ? "Noche"     : "Día",
  codigo:   "11003",
  producto: "Queso Suizo Tajado Ghalla x 140G x Und",
  cantidad: 2500,
  linea:    "Tajado 1",
  codigoMP: "120013",
  mp:       165,
  estado:   "Activo",
}))

export const PRODUCCION_DATA = [
  { month: "Mayo 2026",  registros: BASE_REGISTROS },
  { month: "Abril 2026", registros: BASE_REGISTROS.slice(0, 8).map((r) => ({ ...r, fecha: "20/4/2026" })) },
]

export const ANALISIS_POR_LINEA = {
  "Tajado 1": [
    { clasificacion: "Actualización de licencia MV",      horas: "00:00:00" },
    { clasificacion: "Ajuste de parámetros de máquina",   horas: "01:15:00" },
    { clasificacion: "Ajuste de parámetro mecánico",      horas: "06:56:00" },
    { clasificacion: "Alistamiento",                       horas: "02:17:00" },
    { clasificacion: "Apoyo en otras líneas",              horas: "01:01:00" },
    { clasificacion: "Atascos",                            horas: "17:27:00" },
    { clasificacion: "Cambio de pieza",                    horas: "01:10:00" },
    { clasificacion: "Cambio de insumo",                   horas: "03:33:00" },
    { clasificacion: "Cuello de botella",                  horas: "02:34:00" },
    { clasificacion: "Falla general del sistema",          horas: "24:18:00" },
    { clasificacion: "Fallas de bandas",                   horas: "00:56:00" },
    { clasificacion: "Fallas de corte",                    horas: "00:52:00" },
    { clasificacion: "Fallas de gas o aire frecuentes",    horas: "00:40:00" },
    { clasificacion: "Falta de pieza",                     horas: "05:57:00" },
    { clasificacion: "Falta de materia prima",             horas: "07:12:00" },
    { clasificacion: "Fin de proceso",                     horas: "00:20:00" },
    { clasificacion: "Instrucciones de calidad",           horas: "00:04:00" },
    { clasificacion: "Liberación REF",                     horas: "01:59:00" },
  ],
  "Tajado 2": [
    { clasificacion: "Atascos",          horas: "05:30:00" },
    { clasificacion: "Cambio de insumo", horas: "02:15:00" },
    { clasificacion: "Mantenimiento",    horas: "03:00:00" },
    { clasificacion: "Falta de pieza",   horas: "01:45:00" },
  ],
  "Porcionado": [
    { clasificacion: "Falta de materia prima", horas: "04:00:00" },
    { clasificacion: "Sanidad",                horas: "01:30:00" },
    { clasificacion: "Atascos",                horas: "00:45:00" },
  ],
}

export const COLUMNAS = [
  { llave: "id",        etiqueta: "ID"        },
  { llave: "fecha",     etiqueta: "Fecha"     },
  { llave: "turno",     etiqueta: "Turno"     },
  { llave: "codigo",    etiqueta: "Código"    },
  { llave: "producto",  etiqueta: "Producto"  },
  { llave: "cantidad",  etiqueta: "Cantidad"  },
  { llave: "linea",     etiqueta: "Línea"     },
  { llave: "codigoMP",  etiqueta: "Código MP" },
  { llave: "mp",        etiqueta: "MP"        },
  { llave: "estado",    etiqueta: "Estado"    },
]