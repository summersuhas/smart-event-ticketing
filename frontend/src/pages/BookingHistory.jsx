import { Link, useLocation } from 'react-router-dom'
import { mockBookings, mockEvents } from '../data/mockEvents'
import { useAuth } from '../context/AuthContext'

export default function BookingHistory() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const pending = location.state?.pending

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

      {pending && (
        <div className="mt-6 rounded-2xl border border-accent/30 bg-accent/10 p-5">
          <p className="font-medium text-accent-soft">Checkout preview (mock)</p>
          <p className="mt-2 text-sm text-zinc-300">
            Event: {mockEvents.find((e) => e.id === pending.eventId)?.title}
          </p>
          <p className="text-sm text-zinc-300">
            Seats: {pending.seats.join(', ')} · ₹
            {pending.total.toLocaleString('en-IN')}
          </p>
          <p className="mt-2 text-xs text-zinc-500">
            Razorpay integration comes in Phase 6.
          </p>
        </div>
      )}

      <ul className="mt-10 space-y-4">
        {mockBookings.map((booking) => {
          const event = mockEvents.find((e) => e.id === booking.eventId)
          return (
            <li
              key={booking.id}
              className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-panel p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold">{event?.title}</p>
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
    </div>
  )
}
