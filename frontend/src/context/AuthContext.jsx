import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('seatflow_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = (email, password) => {
    const demoUser = {
      id: 'usr-1',
      name: email.split('@')[0] || 'Guest',
      email,
      role: email.includes('admin') ? 'organizer' : 'user',
    }
    localStorage.setItem('seatflow_user', JSON.stringify(demoUser))
    setUser(demoUser)
    return demoUser
  }

  const signup = (name, email) => {
    const newUser = { id: 'usr-new', name, email, role: 'user' }
    localStorage.setItem('seatflow_user', JSON.stringify(newUser))
    setUser(newUser)
    return newUser
  }

  const logout = () => {
    localStorage.removeItem('seatflow_user')
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
