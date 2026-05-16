import { Link } from 'react-router-dom'
import { useBookings } from '../../context/BookingContext'
import { useEvents } from '../../context/EventsContext'

export default function OrganizerAnalytics() {
  const { events } = useEvents()
  const { bookings } = useBookings()

  const byEvent = events.map((event) => {
    const eventBookings = bookings.filter((b) => b.eventId === event.id)
    const revenue = eventBookings.reduce((s, b) => s + b.total, 0)
    return {
      id: event.id,
      title: event.title,
      tickets: eventBookings.reduce((s, b) => s + b.seats.length, 0),
      revenue,
    }
  })

  const maxRevenue = Math.max(...byEvent.map((e) => e.revenue), 1)

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link to="/organizer" className="text-sm text-zinc-500 hover:text-white">
        ← Dashboard
      </Link>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold">
        Analytics
      </h1>
      <p className="mt-2 text-sm text-zinc-400">Demo charts from local booking data.</p>

      <ul className="mt-10 space-y-6">
        {byEvent.map((row) => (
          <li key={row.id} className="rounded-2xl border border-white/5 bg-panel p-5">
            <div className="flex flex-wrap justify-between gap-2 text-sm">
              <span className="font-medium">{row.title}</span>
              <span className="text-zinc-400">
                {row.tickets} tickets · ₹{row.revenue.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink">
              <div
                className="h-full rounded-full bg-accent transition-all"
                style={{ width: `${(row.revenue / maxRevenue) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
