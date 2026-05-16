import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import HoldTimer from '../components/HoldTimer'
import { useBookings } from '../context/BookingContext'
import { useEvents } from '../context/EventsContext'
import { clearSeatHold, getSeatHold } from '../utils/seats'

export default function Checkout() {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const { getEvent } = useEvents()
  const { addBooking } = useBookings()
  const event = getEvent(eventId)
  const hold = getSeatHold(eventId)

  const [paying, setPaying] = useState(false)
  const [expired, setExpired] = useState(false)

  const holdExpired = expired || (hold && Date.now() > hold.expiresAt)

  if (!event || !hold?.seats?.length) {
    return (
      <div className="page-wrap max-w-lg text-center">
        <p className="text-muted">No active seat hold. Select seats again.</p>
        <Link
          to={event ? `/events/${eventId}` : '/events'}
          className="mt-4 inline-block text-sm font-medium text-primary"
        >
          Back
        </Link>
      </div>
    )
  }

  if (holdExpired) {
    return (
      <div className="page-wrap max-w-lg text-center">
        <p className="text-lg font-semibold text-danger">Seat hold expired</p>
        <p className="mt-2 text-sm text-muted">
          Please select your seats again to continue.
        </p>
        <Link to={`/events/${eventId}`} className="btn-primary mt-6 inline-flex">
          Select seats
        </Link>
      </div>
    )
  }

  const handlePay = async () => {
    setPaying(true)
    await new Promise((r) => setTimeout(r, 1200))
    const booking = addBooking({
      eventId,
      seats: hold.seats,
      total: hold.total,
    })
    clearSeatHold(eventId)
    navigate(`/tickets/${booking.id}`, { replace: true })
  }

  return (
    <div className="page-wrap max-w-2xl">
      <Link to={`/events/${eventId}`} className="link-muted">
        ← Change seats
      </Link>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <HoldTimer expiresAt={hold.expiresAt} onExpired={() => setExpired(true)} />
      </div>

      <div className="mt-8 space-y-6">
        <section className="card-pad">
          <h2 className="text-sm font-medium text-muted">Order summary</h2>
          <p className="mt-2 text-lg font-semibold">{event.title}</p>
          <p className="text-sm text-muted">{event.venue}</p>
          <ul className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <li className="flex justify-between">
              <span className="text-muted">Seats</span>
              <span>{hold.seats.join(', ')}</span>
            </li>
            <li className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{hold.total.toLocaleString('en-IN')}</span>
            </li>
          </ul>
        </section>

        <section className="card-pad">
          <h2 className="text-sm font-medium text-muted">Payment (demo)</h2>
          <p className="mt-1 text-sm text-muted">
            Placeholder for Razorpay — not connected yet.
          </p>
          <div className="mt-4 rounded-lg border border-dashed border-border bg-background p-6 text-center text-sm text-muted">
            UPI · Card · Net banking
          </div>
          <button
            type="button"
            disabled={paying}
            onClick={handlePay}
            className="btn-primary mt-5 w-full disabled:opacity-60"
          >
            {paying ? 'Processing…' : `Pay ₹${hold.total.toLocaleString('en-IN')}`}
          </button>
        </section>
      </div>
    </div>
  )
}
