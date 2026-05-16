import { createContext, useContext, useMemo, useState } from 'react'
import { migrateStorageKey } from '../utils/storage'

const USER_KEY = 'myticket_user'
const AuthContext = createContext(null)

migrateStorageKey('seatflow_user', USER_KEY)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(USER_KEY)
    return saved ? JSON.parse(saved) : null
  })

  const login = (email, password) => {
    const demoUser = {
      id: 'usr-1',
      name: email.split('@')[0] || 'Guest',
      email,
      role: email.includes('admin') ? 'organizer' : 'user',
    }
    localStorage.setItem(USER_KEY, JSON.stringify(demoUser))
    setUser(demoUser)
    return demoUser
  }

  const signup = (name, email) => {
    const newUser = { id: 'usr-new', name, email, role: 'user' }
    localStorage.setItem(USER_KEY, JSON.stringify(newUser))
    setUser(newUser)
    return newUser
  }

  const logout = () => {
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, login, signup, logout, isAuthenticated: !!user }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
