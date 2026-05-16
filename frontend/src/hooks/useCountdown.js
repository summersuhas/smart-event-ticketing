import { useEffect, useState } from 'react'

export function useCountdown(expiresAt) {
  const [remaining, setRemaining] = useState(() =>
    expiresAt ? Math.max(0, expiresAt - Date.now()) : 0,
  )

  useEffect(() => {
    if (!expiresAt) return undefined

    const tick = () => {
      setRemaining(Math.max(0, expiresAt - Date.now()))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [expiresAt])

  const minutes = Math.floor(remaining / 60000)
  const seconds = Math.floor((remaining % 60000) / 1000)
  const expired = remaining <= 0

  return {
    expired,
    remaining,
    label: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
  }
}
