import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'

import {
  loginUser,
  signupUser,
} from '../api/auth'

const USER_KEY = 'myticket_user'

const AuthContext = createContext(null)

export function AuthProvider({
  children,
}) {
  const [user, setUser] = useState(() => {
    const saved =
      localStorage.getItem(USER_KEY)

    return saved
      ? JSON.parse(saved)
      : null
  })

  const login = async (data) => {
    try {
      const res = await loginUser(data)

      if (!res.data.success) {
        return false
      }

      localStorage.setItem(
        'token',
        res.data.token
      )

      localStorage.setItem(
        USER_KEY,
        JSON.stringify(res.data.user)
      )

      setUser(res.data.user)

      return true
    } catch (err) {
      console.error(err)

      return false
    }
  }

  const signup = async (data) => {
    try {
      const res = await signupUser(data)
  
      if (!res.data.success) {
        return res.data.message
      }
  
      localStorage.setItem(
        'token',
        res.data.token
      )
  
      localStorage.setItem(
        USER_KEY,
        JSON.stringify(res.data.user)
      )
  
      setUser(res.data.user)
  
      return true
    } catch (err) {
      console.error(err)
  
      return (
        err.response?.data?.message ||
        'Signup failed'
      )
    }
  }

  const logout = () => {
    localStorage.removeItem(USER_KEY)

    localStorage.removeItem('token')

    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
    }),
    [user]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    )
  }

  return ctx
}