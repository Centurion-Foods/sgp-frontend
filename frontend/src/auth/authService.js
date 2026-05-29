/**
 * authService.js
 * Capa de servicios de autenticación.
 * Swap the mock implementations for real fetch/axios calls cuando haya backend.
 */

const TOKEN_KEY = "app_token"
const USER_KEY  = "app_user"

// ─── Token helpers ────────────────────────────────────────────────────────────

export const tokenStorage = {
  get:    ()        => localStorage.getItem(TOKEN_KEY),
  set:    (token)   => localStorage.setItem(TOKEN_KEY, token),
  remove: ()        => localStorage.removeItem(TOKEN_KEY),
}

// ─── Mock users (eliminar cuando haya backend) ────────────────────────────────

const MOCK_USERS = [
  { id: 1, name: "Administrador",    email: "admin@centurionfoods.com",    password: "admin123",    role: "admin"    },
  { id: 2, name: "Gerente",   email: "gerencia@centurionfoods.com", password: "gerencia123", role: "gerencia" },
  { id: 3, name: "Director",  email: "director@centurionfoods.com", password: "director123", role: "director" },
  { id: 4, name: "Supervisor",  email: "supervisor@centurionfoods.com", password: "supervisor123", role: "supervisor" },
  { id: 5, name: "Asistente",  email: "asistente@centurionfoods.com", password: "asistente123", role: "asistente" },
  { id: 6, name: "Supervisor de planeación", email: "supervisorplaneacion@centurionfoods.com", password: "supervisorp123", role: "supervisorplaneacion"}
]   

// ─── Service methods ──────────────────────────────────────────────────────────

/**
 * Login
 * TODO: reemplazar con `return api.post('/auth/login', credentials)`
 */
export async function login(email, password) {
  // --- MOCK ---
  await delay(600) // simula latencia de red
  const user = MOCK_USERS.find(u => u.email === email && u.password === password)
  if (!user) throw new Error("Credenciales inválidas")
  const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role }
  const fakeToken = btoa(JSON.stringify({ sub: user.id, role: user.role, exp: Date.now() + 3_600_000 }))
  return { token: fakeToken, user: safeUser }
  // --- END MOCK ---

  // --- REAL (descomentar cuando haya backend) ---
  // const { data } = await api.post('/auth/login', { email, password })
  // return data // { token, user }
}

/**
 * Logout
 * TODO: opcionalmente llamar `api.post('/auth/logout')` para invalidar el token en el server
 */
export async function logout() {
  // await api.post('/auth/logout')   // opcional: blacklist en server
  tokenStorage.remove()
  sessionStorage.removeItem(USER_KEY)
}

/**
 * Valida el token actual contra el backend.
 * Devuelve el usuario si el token es válido, null si no.
 * TODO: reemplazar con `return api.get('/auth/me')`
 */
export async function validateToken(token) {
  if (!token) return null

  // --- MOCK ---
  try {
    const payload = JSON.parse(atob(token))
    if (payload.exp < Date.now()) return null          // token expirado
    const user = MOCK_USERS.find(u => u.id === payload.sub)
    if (!user) return null
    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role }
    return safeUser
  } catch {
    return null
  }
  // --- END MOCK ---

  // --- REAL ---
  // try {
  //   const { data } = await api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
  //   return data.user
  // } catch {
  //   return null
  // }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}