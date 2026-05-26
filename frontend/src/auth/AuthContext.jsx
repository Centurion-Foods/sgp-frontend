import { useCallback, useEffect, useReducer } from "react"
import { AuthContext } from "./authContext"
import { login as loginService, logout as logoutService, validateToken, tokenStorage } from "./authService"

const initialState = {
  user:            null,
  isAuthenticated: false,
  isLoading: !!tokenStorage.get(),
  error:           null,
}

function authReducer(state, action) {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, isLoading: true, error: null }
    case "AUTH_SUCCESS":
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false, error: null }
    case "AUTH_FAILURE":
      return { ...state, user: null, isAuthenticated: false, isLoading: false, error: action.payload }
    case "AUTH_LOGOUT":
      return { ...initialState, isLoading: false }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    async function hydrate() {
      const token = tokenStorage.get()
      if (!token) { dispatch({ type: "AUTH_FAILURE", payload: null }); return }
      const user = await validateToken(token)
      if (user) {
        dispatch({ type: "AUTH_SUCCESS", payload: user })
      } else {
        tokenStorage.remove()
        dispatch({ type: "AUTH_FAILURE", payload: null })
      }
    }
    hydrate()
  }, [])

  const login = useCallback(async (email, password) => {
    dispatch({ type: "AUTH_START" })
    try {
      const { token, user } = await loginService(email, password)
      tokenStorage.set(token)
      dispatch({ type: "AUTH_SUCCESS", payload: user })
      return { success: true, role: user.role }
    } catch (err) {
      dispatch({ type: "AUTH_FAILURE", payload: err.message })
      return { success: false, error: err.message }
    }
  }, [])

  const logout = useCallback(async () => {
    await logoutService()
    dispatch({ type: "AUTH_LOGOUT" })
  }, [])

  const value = {
    user:            state.user,
    role:            state.user?.role ?? null,
    isAuthenticated: state.isAuthenticated,
    isLoading:       state.isLoading,
    error:           state.error,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}