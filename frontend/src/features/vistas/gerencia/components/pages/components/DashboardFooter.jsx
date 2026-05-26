import { AlertCircle, TrendingUp } from "lucide-react";

const EstiloFooter = "text-2xl font-medium text-gray-800 flex items-center justify-center gap-1";

export default function DashboardFooter() {
  return (
    <div className="grid grid-cols-3 border-t border-gray-100 bg-gray-50/30">
      <div className="p-6 text-center border-r border-gray-100">
        <p className="text-xs text-gray-500 mb-1">Progreso</p>
        <p className={EstiloFooter}>
          36K <TrendingUp size={18} className="text-green-300" />
        </p>
            </div>
            <div className="p-6 text-center border-r border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Restante</p>
            <p className={EstiloFooter}>
                4K <AlertCircle size={18} className="text-orange-300" />
            </p>
            </div>
            <div className="p-6 text-center">
            <p className="text-xs text-gray-500 mb-1">Producido hoy</p>
            <p className={EstiloFooter}>
                2K <TrendingUp size={18} className="text-green-300" />
            </p>
            </div>
        </div>
    )
}