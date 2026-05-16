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
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-zinc-400">No active seat hold. Select seats again.</p>
        <Link
          to={event ? `/events/${eventId}` : '/events'}
          className="mt-4 inline-block text-accent-soft"
        >
          ← Back
        </Link>
      </div>
    )
  }

  if (holdExpired) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-lg font-semibold text-danger">Your seat hold expired</p>
        <p className="mt-2 text-sm text-zinc-400">
          Seats are released for others. Pick again to continue.
        </p>
        <Link
          to={`/events/${eventId}`}
          className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white"
        >
          Select seats again
        </Link>
      </div>
    )
  }

  const handlePay = async () => {
    setPaying(true)
    await new Promise((r) => setTimeout(r, 1500))
    const booking = addBooking({
      eventId,
      seats: hold.seats,
      total: hold.total,
    })
    clearSeatHold(eventId)
    navigate(`/tickets/${booking.id}`, { replace: true })
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <Link to={`/events/${eventId}`} className="text-sm text-zinc-500 hover:text-white">
        ← Change seats
      </Link>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold">
          Checkout
        </h1>
        <HoldTimer expiresAt={hold.expiresAt} onExpired={() => setExpired(true)} />
      </div>

      <div className="mt-8 space-y-6">
        <section className="rounded-2xl border border-white/5 bg-panel p-6">
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            Order summary
          </h2>
          <p className="mt-3 text-lg font-semibold">{event.title}</p>
          <p className="text-sm text-zinc-400">{event.venue}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex justify-between">
              <span className="text-zinc-400">Seats</span>
              <span>{hold.seats.join(', ')}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-zinc-400">Convenience fee</span>
              <span>₹0</span>
            </li>
            <li className="flex justify-between border-t border-white/5 pt-3 text-base font-bold">
              <span>Total</span>
              <span>₹{hold.total.toLocaleString('en-IN')}</span>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-white/5 bg-panel p-6">
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            Payment (demo)
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Razorpay UI placeholder — real gateway connects in a later phase.
          </p>
          <div className="mt-4 rounded-xl border border-dashed border-white/15 bg-ink/50 p-6 text-center text-sm text-zinc-500">
            UPI · Card · Netbanking
          </div>
          <button
            type="button"
            disabled={paying}
            onClick={handlePay}
            className="mt-6 w-full rounded-full bg-accent py-3 text-sm font-semibold text-white hover:bg-accent-soft disabled:opacity-60"
          >
            {paying ? 'Processing…' : `Pay ₹${hold.total.toLocaleString('en-IN')}`}
          </button>
        </section>
      </div>
    </div>
  )
}
