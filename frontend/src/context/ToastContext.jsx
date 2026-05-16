import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ToastContext = createContext(null)

let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback(
    (message, type = 'info') => {
      const id = ++toastId
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => dismiss(id), 4000)
      return id
    },
    [dismiss],
  )

  const value = useMemo(
    () => ({
      toasts,
      toast: {
        info: (msg) => addToast(msg, 'info'),
        success: (msg) => addToast(msg, 'success'),
        error: (msg) => addToast(msg, 'error'),
      },
      dismiss,
    }),
    [toasts, addToast, dismiss],
  )

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
