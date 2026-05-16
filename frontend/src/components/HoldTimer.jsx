import { useEffect } from 'react'
import { useCountdown } from '../hooks/useCountdown'

export default function HoldTimer({ expiresAt, onExpired }) {
  const { expired, label } = useCountdown(expiresAt)

  useEffect(() => {
    if (expired && onExpired) onExpired()
  }, [expired, onExpired])

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium ${
        expired
          ? 'border-danger/30 bg-red-50 text-danger'
          : 'border-amber-200 bg-amber-50 text-warning'
      }`}
      role="timer"
      aria-live="polite"
    >
      {expired ? 'Hold expired' : `Held ${label}`}
    </div>
  )
}
