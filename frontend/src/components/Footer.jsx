import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center sm:px-6">
        <p className="font-semibold text-foreground">MyTicket</p>
        <p className="mt-1 text-sm text-muted">
  © 2026 MyTicket. All rights reserved.
</p>
      </div>
    </footer>
  )
}