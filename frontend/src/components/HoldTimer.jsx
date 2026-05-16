import { useEffect } from 'react'
import { useCountdown } from '../hooks/useCountdown'

export default function HoldTimer({ expiresAt, onExpired }) {
  const { expired, label } = useCountdown(expiresAt)

  useEffect(() => {
    if (expired && onExpired) onExpired()
  }, [expired, onExpired])

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
        expired ? 'bg-danger/15 text-danger' : 'bg-warning/15 text-warning'
      }`}
      role="timer"
      aria-live="polite"
    >
      <span className="h-2 w-2 animate-pulse rounded-full bg-current" />
      {expired ? 'Hold expired' : `Seats held · ${label}`}
    </div>
  )
}
