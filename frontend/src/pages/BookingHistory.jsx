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
      <div className="page-wrap text-center">
        <p className="text-muted">Please log in to view bookings.</p>
        <Link to="/login" className="mt-4 inline-block text-sm font-medium text-primary">
          Log in
        </Link>
      </div>
    )
  }

  return (
    <div className="page-wrap">
      <h1 className="text-2xl font-semibold">My bookings</h1>

      {bookings.length === 0 ? (
        <p className="mt-8 text-muted">
          No bookings yet.{' '}
          <Link to="/events" className="font-medium text-primary">
            Browse events
          </Link>
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {bookings.map((booking) => {
            const event = getEvent(booking.eventId)
            return (
              <li
                key={booking.id}
                className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{event?.title ?? 'Event'}</p>
                  <p className="mt-1 text-sm text-muted">
                    Seats {booking.seats.join(', ')} · ₹
                    {booking.total.toLocaleString('en-IN')}
                  </p>
                </div>
                <Link to={`/tickets/${booking.id}`} className="btn-secondary shrink-0">
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
