import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../auth/useAuth';
import { getRoleHome } from '../../../auth/authHelpers';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

import miniblobrojo from '../../../assets/icons/miniblobrojo.svg';
import blobrojo     from '../../../assets/icons/blobrojo.svg';
import blobblanco   from '../../../assets/icons/blobblanco.svg';
import Vector       from '../../../assets/icons/Vector.svg';
import logo         from '../../../assets/images/logo.png';

const Login = () => {
  const [email,           setEmail]           = useState('');
  const [password,        setPassword]        = useState('');
  const [submitting,      setSubmitting]      = useState(false);
  const [showPassword,    setShowPassword]    = useState(false);
  const [emailFocused,    setEmailFocused]    = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const { login, error } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await login(email.trim().toLowerCase(), password);
    if (result.success) {
      const destination = location.state?.from?.pathname ?? getRoleHome(result.role);
      navigate(destination, { replace: true });
    }
    setSubmitting(false);
  };

  const inputRing = (focused) =>
    focused
      ? 'shadow-sm border-2 border-gray-300/80'
      : 'border-gray-200 hover:border-gray-300';

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 relative">

      <img src={miniblobrojo} alt="" className='miniblobrojo' />
      <img src={blobrojo}     alt="" className='blobrojo'     />
      <img src={blobblanco}   alt="" className='blobblanco'   />
      <img src={Vector}       alt="" className='vector'       />

      <div
        className="mx-auto flex flex-col gap-6 max-w-md items-center justify-center"
        style={{ animation: 'fadeUp 0.5s ease both' }}
      >
        <img
          src={logo}
          alt="Logo"
          className='logo drop-shadow-md'
          style={{ animation: 'fadeDown 0.5s ease both' }}
          draggable="false"
        />

        <form
          onSubmit={handleSubmit}
          className="w-80 flex flex-col gap-5
                     bg-white/65 backdrop-blur-sm
                     border border-white/80
                     shadow-xl shadow-black/5
                     rounded-2xl px-8 py-7"
        >
          {/* Cabecera */}
          <div className="flex flex-col gap-0.5 mb-1">
            <h2 className="text-gray-800 text-base font-bold tracking-tight">
              Bienvenido de nuevo
            </h2>
            <p className="text-gray-400 text-xs font-normal">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-100
                            rounded-lg py-2.5 px-3 text-red-600"
                 style={{ animation: 'shake 0.3s ease' }}>
              <span className="text-xs mt-0.5">⚠</span>
              <p className="text-xs font-normal leading-snug">{error}</p>
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-gray-600 tracking-wide">
              Correo electrónico
            </label>
            <div className={`flex items-center gap-2 bg-white border rounded-lg px-3 py-2.5
                            ${inputRing(emailFocused)}`}>
              <Mail className="w-3.5 h-3.5 text-gray-300 shrink-0" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                required
                placeholder='usuario@centurionfoods.com'
                className='flex-1 text-xs text-gray-700 bg-transparent outline-none
                           placeholder-gray-300 font-normal'
              />
            </div>
          </div>

          {/* Contraseña */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-xs font-semibold text-gray-600 tracking-wide">
                Contraseña
              </label>
            </div>
            <div className={`flex items-center gap-2 bg-white border rounded-lg px-3 py-2.5
                            ${inputRing(passwordFocused)}`}>
              <Lock className="w-3.5 h-3.5 text-gray-300 shrink-0" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                required
                placeholder='••••••••'
                className='flex-1 text-xs text-gray-700 bg-transparent outline-none
                           placeholder-gray-300 font-normal'
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="text-gray-300 hover:text-gray-500 transition-colors
                           duration-200 focus:outline-none shrink-0"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword
                  ? <EyeOff className="w-3.5 h-3.5" />
                  : <Eye    className="w-3.5 h-3.5" />
                }
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="mt-1 bg-red-600 text-white text-xs font-semibold py-3 rounded-lg
                        uppercase
                       hover:bg-red-700 active:scale-[0.98]
                       transition-all duration-200
                       shadow-sm hover:shadow-md
                       disabled:opacity-60 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
          >
            {submitting
              ? <><span className="loader" /> Iniciando sesión…</>
              : 'Iniciar sesión'
            }
          </button>
        </form>

        <p className="text-xs text-gray-400 font-normal"
           style={{ animation: 'fadeUp 0.5s ease 0.2s both' }}>
          © {new Date().getFullYear()} Centurion Foods. Todos los derechos reservados.
        </p>
      </div>

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25%       { transform: translateX(-4px); }
          75%       { transform: translateX(4px); }
        }
        .loader {
          width: 12px; height: 12px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
          display: inline-block;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
};

export default Login;