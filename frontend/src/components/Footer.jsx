import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-semibold text-foreground">MyTicket</p>
          <p className="mt-1 text-sm text-muted">Event seat booking · frontend demo</p>
        </div>
        <div className="flex gap-6 text-sm text-muted">
          <Link to="/events" className="hover:text-foreground">
            Events
          </Link>
          <Link to="/login" className="hover:text-foreground">
            Login
          </Link>
        </div>
      </div>
    </footer>
  )
}
