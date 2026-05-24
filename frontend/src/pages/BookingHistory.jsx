import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import { useBooking } from '../context/BookingContext'
import { useEvents } from '../context/EventsContext'
import { useAuth } from '../context/AuthContext'

export default function BookingHistory() {
  const { isAuthenticated } = useAuth()
  const { bookings } = useBooking()
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
        <EmptyState
          className="mt-8"
          title="No bookings yet"
          description="When you complete checkout, your tickets will appear here."
          action={
            <Link to="/events" className="btn-primary">
              Browse events
            </Link>
          }
        />
      ) : (
        <ul className="mt-8 space-y-4">
          {bookings.map((booking) => {
            const event = getEvent(booking.eventId)
            return (
              <li
                key={booking.id}
                className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
              >
                <div className="min-w-0">
                  <p className="font-medium">{event?.title ?? 'Event'}</p>
                  <p className="mt-1 text-sm text-muted">
                    Seats {booking.seats.join(', ')} · ₹
                    {booking.total.toLocaleString('en-IN')}
                  </p>
                </div>
                <Link
                  to={`/tickets/${booking.id}`}
                  className="btn-secondary shrink-0 text-center"
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
