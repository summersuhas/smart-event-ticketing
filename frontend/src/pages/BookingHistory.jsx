import { Link } from 'react-router-dom'
import { useBookings } from '../context/BookingContext'
import { useEvents } from '../context/EventsContext'
import { useAuth } from '../context/AuthContext'

export default function BookingHistory() {
  const { isAuthenticated } = useAuth()
  const { bookings } = useBookings()
  const { getEvent } = useEvents()

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <p className="text-zinc-400">Please log in to view bookings.</p>
        <Link to="/login" className="mt-4 inline-block text-accent-soft">
          Log in
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold">
        My bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="mt-8 text-zinc-400">
          No bookings yet.{' '}
          <Link to="/events" className="text-accent-soft hover:text-white">
            Browse events
          </Link>
        </p>
      ) : (
        <ul className="mt-10 space-y-4">
          {bookings.map((booking) => {
            const event = getEvent(booking.eventId)
            return (
              <li
                key={booking.id}
                className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-panel p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold">{event?.title ?? 'Event'}</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Seats {booking.seats.join(', ')} · ₹
                    {booking.total.toLocaleString('en-IN')}
                  </p>
                </div>
                <Link
                  to={`/tickets/${booking.id}`}
                  className="rounded-full border border-white/10 px-4 py-2 text-center text-sm font-medium hover:border-accent/50"
                >
                  View ticket
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
