import { useEffect } from 'react'

/**
 * Warns when leaving checkout (tab close). In-app links use manual confirm in Checkout.
 * Note: useBlocker needs a data router; we use BrowserRouter, so we avoid it here.
 */
export function useCheckoutGuard(active, message) {
  useEffect(() => {
    if (!active) return undefined
    const onBeforeUnload = (e) => {
      e.preventDefault()
      e.returnValue = message
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [active, message])
}
