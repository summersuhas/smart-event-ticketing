import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const linkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive ? 'text-accent-soft' : 'text-zinc-400 hover:text-white'
  }`

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">
          Seat<span className="text-accent">Flow</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/events" className={linkClass}>
            Events
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/bookings" className={linkClass}>
                My Bookings
              </NavLink>
              {user?.role === 'organizer' && (
                <NavLink to="/organizer" className={linkClass}>
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
                className="hidden text-sm text-zinc-400 hover:text-white sm:block"
              >
                {user.name}
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:border-white/20 hover:text-white"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-zinc-400 hover:text-white"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-soft"
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
