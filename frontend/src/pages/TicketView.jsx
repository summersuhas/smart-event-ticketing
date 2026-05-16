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
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-zinc-400">Ticket not found.</p>
        <Link to="/bookings" className="mt-4 inline-block text-accent-soft">
          ← Bookings
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-panel">
        <div className="bg-gradient-to-br from-accent/30 to-transparent p-6">
          <p className="text-xs uppercase tracking-widest text-zinc-400">
            SeatFlow Ticket
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold">
            {event.title}
          </h1>
        </div>
        <div className="space-y-3 p-6 text-sm">
          <p>
            <span className="text-zinc-500">Venue · </span>
            {event.venue}
          </p>
          <p>
            <span className="text-zinc-500">Seats · </span>
            {booking.seats.join(', ')}
          </p>
          <p>
            <span className="text-zinc-500">Booking ID · </span>
            {booking.id}
          </p>
        </div>
        <div className="flex justify-center border-t border-white/5 bg-ink/50 p-8">
          <div className="flex h-36 w-36 flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white text-ink">
            <span className="font-mono text-xs">QR</span>
            <span className="mt-1 font-mono text-[10px] text-zinc-600">
              {booking.id.slice(-8)}
            </span>
          </div>
        </div>
      </div>
      <Link
        to="/bookings"
        className="mt-6 block text-center text-sm text-accent-soft hover:text-white"
      >
        ← Back to bookings
      </Link>
    </div>
  )
}
