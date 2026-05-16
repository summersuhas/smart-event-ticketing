import { Link } from 'react-router-dom'
import { useBookings } from '../../context/BookingContext'
import { useEvents } from '../../context/EventsContext'

export default function OrganizerDashboard() {
  const { events } = useEvents()
  const { bookings } = useBookings()

  const totalRevenue = bookings.reduce((sum, b) => sum + b.total, 0)

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-accent-soft">
            Organizer
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold">
            Dashboard
          </h1>
        </div>
        <Link
          to="/organizer/events/new"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-soft"
        >
          + Create event
        </Link>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Events', value: events.length },
          { label: 'Bookings', value: bookings.length },
          { label: 'Revenue (demo)', value: `₹${totalRevenue.toLocaleString('en-IN')}` },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/5 bg-panel p-6"
          >
            <p className="text-sm text-zinc-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold">Your events</h2>
        <ul className="mt-4 divide-y divide-white/5 rounded-2xl border border-white/5 bg-panel">
          {events.slice(0, 6).map((event) => (
            <li
              key={event.id}
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
            >
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-zinc-500">{event.venue}</p>
              </div>
              <Link
                to={`/events/${event.id}`}
                className="text-sm text-accent-soft hover:text-white"
              >
                View →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Link
        to="/organizer/analytics"
        className="mt-6 inline-block text-sm text-accent-soft hover:text-white"
      >
        View analytics →
      </Link>
    </div>
  )
}
