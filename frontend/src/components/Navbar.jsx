import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navLink = ({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm font-medium ${
    isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-background'
  }`

const desktopNavLink = ({ isActive }) =>
  `text-sm font-medium ${isActive ? 'text-primary' : 'text-muted hover:text-foreground'}`

function NavItems({ user, isAuthenticated, logout, onNavigate }) {
  const close = () => onNavigate?.()

  return (
    <>
      <NavLink to="/" className={navLink} end onClick={close}>
        Home
      </NavLink>
      <NavLink to="/events" className={navLink} onClick={close}>
        Events
      </NavLink>
      {isAuthenticated && (
        <>
          <NavLink to="/bookings" className={navLink} onClick={close}>
            Bookings
          </NavLink>
          {user?.role === 'organizer' && (
            <NavLink to="/organizer" className={navLink} onClick={close}>
              Organizer
            </NavLink>
          )}
          <NavLink to="/profile" className={navLink} onClick={close}>
            Profile
          </NavLink>
        </>
      )}
    </>
  )
}

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" className="text-lg font-semibold text-foreground" onClick={closeMenu}>
          MyTicket
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
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

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex md:gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="link-muted hidden lg:inline">
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

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <span className="text-xl leading-none">×</span>
            ) : (
              <span className="flex flex-col gap-1">
                <span className="block h-0.5 w-5 bg-foreground" />
                <span className="block h-0.5 w-5 bg-foreground" />
                <span className="block h-0.5 w-5 bg-foreground" />
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-foreground/20 md:hidden"
            aria-label="Close menu overlay"
            onClick={closeMenu}
          />
          <div className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,280px)] flex-col border-l border-border bg-surface shadow-lg md:hidden">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="font-semibold">Menu</span>
              <button
                type="button"
                className="rounded-lg px-2 py-1 text-muted hover:bg-background"
                onClick={closeMenu}
              >
                Close
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
              <NavItems
                user={user}
                isAuthenticated={isAuthenticated}
                logout={() => {
                  logout()
                  closeMenu()
                }}
                onNavigate={closeMenu}
              />
            </nav>
            <div className="border-t border-border p-4">
              {isAuthenticated ? (
                <button
                  type="button"
                  className="btn-secondary w-full"
                  onClick={() => {
                    logout()
                    closeMenu()
                  }}
                >
                  Log out
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link to="/login" className="btn-secondary text-center" onClick={closeMenu}>
                    Log in
                  </Link>
                  <Link to="/signup" className="btn-primary text-center" onClick={closeMenu}>
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  )
}
