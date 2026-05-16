import { Link, useParams } from 'react-router-dom'
import { useBookings } from '../context/BookingContext'
import { useEvents } from '../context/EventsContext'

export default function TicketView() {
  const { bookingId } = useParams()
  const { getBooking } = useBookings()
  const { getEvent } = useEvents()
  const booking = getBooking(bookingId)
  const event = getEvent(booking?.eventId)

  if (!booking || !event) {
    return (
      <div className="page-wrap max-w-lg text-center">
        <p className="text-muted">Ticket not found.</p>
        <Link to="/bookings" className="mt-4 inline-block text-sm font-medium text-primary">
          Back to bookings
        </Link>
      </div>
    )
  }

  return (
    <div className="page-wrap max-w-md">
      <div className="card overflow-hidden">
        <div className="border-b border-border bg-background px-6 py-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            MyTicket
          </p>
          <h1 className="mt-1 text-lg font-semibold">{event.title}</h1>
        </div>
        <div className="space-y-2 px-6 py-5 text-sm">
          <p>
            <span className="text-muted">Venue · </span>
            {event.venue}
          </p>
          <p>
            <span className="text-muted">Seats · </span>
            {booking.seats.join(', ')}
          </p>
          <p>
            <span className="text-muted">Booking · </span>
            {booking.id}
          </p>
        </div>
        <div className="flex justify-center border-t border-border bg-background px-6 py-8">
          <div className="flex h-32 w-32 flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-surface">
            <span className="font-mono text-xs text-muted">QR code</span>
            <span className="mt-1 font-mono text-[10px] text-muted">
              {booking.id.slice(-8)}
            </span>
          </div>
        </div>
      </div>
      <Link to="/bookings" className="mt-6 block text-center text-sm font-medium text-primary">
        ← My bookings
      </Link>
    </div>
  )
}
