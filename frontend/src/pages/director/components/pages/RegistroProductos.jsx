import { useState } from "react";
import { Search, Tag, User } from "lucide-react";
import { registrosProductosEjemplo } from "../../../../data/productosData";
import TablaProductos from "../TablaProductos";

export default function RegistroDeProductos({mostrarTotal = false}) {
  const [busqueda, setBusqueda] = useState("");
  const productosFiltrados = registrosProductosEjemplo.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    (producto.codigo && producto.codigo.includes(busqueda))
  );

  return (
    <div className="space-y-4 text-gray-800 p-1">
      
      {/* Contador de Registros */}
      <div className="text-[14px] text-slate-400 font-medium tracking-tight">
        {productosFiltrados.length} Registros detectados
      </div>

      {/* Barra de Búsqueda Superior */}
      <div className="w-full bg-white rounded-xl border border-gray-200 shadow-2xs p-3 space-y-2">
        <div className="relative w-full">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar..."
            className="outline-none block w-full rounded-xl text-sm text-gray-600 border border-gray-200 bg-gray-50/30 pl-10 pr-4 py-2 placeholder:text-gray-400 focus:bg-white focus:border-gray-300 transition-all"
          />
        </div>
        
        {/* Chips informativos debajo del buscador */}
        <div className="flex items-center gap-4 text-[11px] text-gray-400 pl-2 pt-0.5">
          <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> # Código</span>
          <span className="flex items-center gap-1"><User className="w-3 h-3" /> Nombre</span>
        </div>
      </div>

      <TablaProductos registros={productosFiltrados} mostrarTotal={mostrarTotal} />

    </div>
  );
}