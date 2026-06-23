import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

const USER_KEY = 'auth_user'
const TOKEN_KEY = 'auth_token'

function readStoredUser() {
  const saved = localStorage.getItem(USER_KEY)
  return saved ? JSON.parse(saved) : null
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)
  const [loading, setLoading] = useState(() => !!localStorage.getItem(TOKEN_KEY))

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) return

    let active = true

    api.me()
      .then((profile) => {
        if (!active) return
        setUser(profile)
        localStorage.setItem(USER_KEY, JSON.stringify(profile))
      })
      .catch(() => {
        if (!active) return
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
        setUser(null)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const persistSession = useCallback((auth) => {
    localStorage.setItem(TOKEN_KEY, auth.token)
    localStorage.setItem(USER_KEY, JSON.stringify(auth.user))
    setUser(auth.user)
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    const auth = await api.login({ email, password })
    persistSession(auth)
    return auth.user
  }, [persistSession])

  const register = useCallback(async (fullName, email, password) => {
    const auth = await api.register({ fullName, email, password })
    persistSession(auth)
    return auth.user
  }, [persistSession])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setUser(null)
    setLoading(false)
  }, [])

  const value = useMemo(
    () => ({ user, loading, login, register, logout, isAuthenticated: !!user }),
    [user, loading, login, register, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
