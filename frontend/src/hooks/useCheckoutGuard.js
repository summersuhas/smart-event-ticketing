import { useEffect } from 'react'
import { useBlocker } from 'react-router-dom'

export function useCheckoutGuard(active, message) {
  const blocker = useBlocker(active)

  useEffect(() => {
    if (!active) return undefined
    const onBeforeUnload = (e) => {
      e.preventDefault()
      e.returnValue = message
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [active, message])

  useEffect(() => {
    if (blocker.state !== 'blocked') return
    if (window.confirm(message)) {
      blocker.proceed()
    } else {
      blocker.reset()
    }
  }, [blocker, message])
}
