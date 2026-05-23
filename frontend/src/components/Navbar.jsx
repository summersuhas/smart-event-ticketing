import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const desktopNavLink = ({ isActive }) =>
  `text-sm font-medium ${
    isActive ? 'text-primary' : 'text-muted hover:text-foreground'
  }`

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        
        <Link
          to="/"
          className="text-lg font-semibold text-foreground"
        >
          MyTicket
        </Link>

        <nav className="flex items-center gap-6">
          <NavLink to="/" className={desktopNavLink} end>
            Home
          </NavLink>

          <NavLink to="/events" className={desktopNavLink}>
            Events
          </NavLink>

          {isAuthenticated && (
            <>
              <NavLink to="/bookings" className={desktopNavLink}>
                Bookings
              </NavLink>

              {user?.role === 'organizer' && (
                <NavLink to="/organizer" className={desktopNavLink}>
                  Organizer
                </NavLink>
              )}
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="text-sm text-muted hover:text-foreground"
              >
                {user?.name}
              </Link>

              <button
                type="button"
                onClick={logout}
                className="rounded-lg border px-3 py-1.5 text-sm"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-muted hover:text-foreground"
              >
                Log in
              </Link>

              <Link
                to="/signup"
                className="rounded-lg bg-black px-4 py-2 text-sm text-white"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}