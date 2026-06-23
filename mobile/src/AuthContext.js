import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api, clearSession, loadStoredUser, saveSession } from './api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStoredUser()
      .then(async (stored) => {
        if (!stored) return
        try {
          const profile = await api.me()
          setUser(profile)
        } catch {
          await clearSession()
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email, password) => {
    const auth = await api.login({ email, password })
    await saveSession(auth)
    setUser(auth.user)
    return auth.user
  }, [])

  const register = useCallback(async (fullName, email, password) => {
    const auth = await api.register({ fullName, email, password })
    await saveSession(auth)
    setUser(auth.user)
    return auth.user
  }, [])

  const logout = useCallback(async () => {
    await clearSession()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, loading, login, register, logout, isAuthenticated: !!user }),
    [user, loading, login, register, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
