import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navLink = ({ isActive }) =>
  `text-sm font-medium ${isActive ? 'text-primary' : 'text-muted hover:text-foreground'}`

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="text-lg font-semibold text-foreground">
          MyTicket
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={navLink} end>
            Home
          </NavLink>
          <NavLink to="/events" className={navLink}>
            Events
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/bookings" className={navLink}>
                Bookings
              </NavLink>
              {user?.role === 'organizer' && (
                <NavLink to="/organizer" className={navLink}>
                  Organizer
                </NavLink>
              )}
            </>
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="link-muted hidden sm:inline">
                {user.name}
              </Link>
              <button type="button" onClick={logout} className="btn-secondary text-xs sm:text-sm">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="link-muted">
                Log in
              </Link>
              <Link to="/signup" className="btn-primary">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
