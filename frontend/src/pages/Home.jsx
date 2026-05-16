import { Link } from 'react-router-dom'
import EventCard from '../components/EventCard'
import { mockEvents } from '../data/mockEvents'

export default function Home() {
  const featured = mockEvents.slice(0, 3)

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-accent)_0%,_transparent_50%)] opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-medium uppercase tracking-widest text-accent-soft">
            Realtime event ticketing
          </p>
          <h1 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Book seats live.{' '}
            <span className="text-accent-soft">No double bookings.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-zinc-400">
            Discover concerts, comedy, and festivals. Pick your seats on an
            interactive map — locks and availability sync in realtime once the
            backend is connected.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/events"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-soft"
            >
              Browse events
            </Link>
            <Link
              to="/signup"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-zinc-200 hover:border-white/30"
            >
              Create account
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">
              Upcoming events
            </h2>
            <p className="mt-1 text-zinc-500">Mock data for frontend development</p>
          </div>
          <Link to="/events" className="text-sm font-medium text-accent-soft hover:text-white">
            View all →
          </Link>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </>
  )
}
