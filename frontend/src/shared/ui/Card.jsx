export default function Card({ label, value, footerText, icon: Icon, isFirst, onFooterClick }) {
  return (
    <div className="bg-white p-4 h-48 rounded-xl shadow flex flex-col relative">
      <div className="border border-gray-400 rounded-lg h-10 w-10 flex items-center justify-center shrink-0">
        { Icon && <Icon className="h-6 w-6 text-red-700" /> }
      </div>

      <div className="mt-auto mb-2">
        <h2 className="text-[1.1rem] font-medium leading-tight text-gray-800 min-h-[2.8rem] flex items-end">
          {label}
        </h2>
        <p className="text-[1.6rem] font-bold mt-1 text-black">
          {value}
        </p>
      </div>

      {footerText && (
        onFooterClick ? (
          <button
            type="button"
            onClick={(e) => { console.log('Card footer internal click'); onFooterClick(e); }}
            className={`absolute bottom-3 right-4 text-[0.7rem] text-gray-400 ${isFirst ? 'cursor-pointer underline decoration-gray-400/50 hover:text-gray-600' : 'cursor-default hover:text-gray-600'} transition-colors`}
          >
            {footerText}
          </button>
        ) : (
          <span className={`absolute bottom-3 right-4 text-[0.7rem] text-gray-400 ${isFirst ? 'underline decoration-gray-400/50' : ''}`}>
            {footerText}
          </span>
        )
      )}
    </div>
  );
}