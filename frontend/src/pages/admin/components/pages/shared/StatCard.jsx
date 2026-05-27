export default function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
          <Icon className="w-6 h-6 text-slate-800" />
        </div>
      </div>
    </div>
  )
}