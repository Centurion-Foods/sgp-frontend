export default function AuthLoading() {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#f3f4f6',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '2rem', zIndex: 9999,
    }}>

      <div style={{ position: 'relative', width: 64, height: 64 }}>
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: '3px solid #fee2e2',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: '3px solid transparent',
          borderTopColor: '#dc2626',
          animation: 'spin 0.8s linear infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 8,
          borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: '#ef4444',
          animation: 'spin 1.2s linear infinite reverse',
        }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}>
        <p style={{
          fontSize: 13, fontWeight: 600,
          color: '#374151', letterSpacing: '0.05em',
          animation: 'pulse 1.5s ease-in-out infinite',
        }}>
          VERIFICANDO SESIÓN
        </p>
        <div style={{ display: 'flex', gap: 4 }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              width: 5, height: 5, borderRadius: '50%',
              background: '#dc2626', display: 'block',
              animation: `bounce 0.8s ease-in-out ${i * 0.15}s infinite`,
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0);    opacity: 0.4; }
          50%       { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}