import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-bold">
            Seat<span className="text-accent">Flow</span>
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Realtime seat booking — frontend MVP
          </p>
        </div>
        <div className="flex gap-6 text-sm text-zinc-500">
          <Link to="/events" className="hover:text-white">
            Events
          </Link>
          <Link to="/login" className="hover:text-white">
            Login
          </Link>
        </div>
      </div>
    </footer>
  )
}
