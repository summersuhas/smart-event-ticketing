import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import HoldTimer from '../components/HoldTimer'
import { useBookings } from '../context/BookingContext'
import { useEvents } from '../context/EventsContext'
import { useToast } from '../context/ToastContext'
import { useCheckoutGuard } from '../hooks/useCheckoutGuard'
import { clearSeatHold, getSeatHold } from '../utils/seats'

const LEAVE_MSG =
  'Leave checkout? Your seat hold will stay active until it expires, but payment will not complete.'

export default function Checkout() {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const { getEvent } = useEvents()
  const { addBooking } = useBookings()
  const { toast } = useToast()
  const event = getEvent(eventId)
  const hold = getSeatHold(eventId)

  const [paying, setPaying] = useState(false)
  const [expired, setExpired] = useState(false)
  const [paymentState, setPaymentState] = useState('idle')

  const holdExpired = expired || (hold && Date.now() > hold.expiresAt)
  const guardActive =
    !!hold?.seats?.length && !holdExpired && paymentState === 'idle' && !paying

  useCheckoutGuard(guardActive, LEAVE_MSG)

  const releaseAndLeave = (path, message, type = 'info') => {
    clearSeatHold(eventId)
    toast[type](message)
    navigate(path, { replace: true })
  }

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
      <div className="page-wrap max-w-lg">
        <div className="card-pad text-center">
          <p className="text-lg font-semibold text-danger">Seat hold expired</p>
          <p className="mt-2 text-sm text-muted">
            Your seats were released. Please select again.
          </p>
          <Link to={`/events/${eventId}`} className="btn-primary mt-6 inline-flex">
            Select seats
          </Link>
        </div>
      </div>
    )
  }

  if (paymentState === 'cancelled') {
    return (
      <div className="page-wrap max-w-lg">
        <div className="card-pad text-center">
          <p className="text-lg font-semibold">Payment cancelled</p>
          <p className="mt-2 text-sm text-muted">
            You left checkout. Seats are no longer reserved for you.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link to={`/events/${eventId}`} className="btn-primary">
              Select seats again
            </Link>
            <Link to="/events" className="btn-secondary">
              Browse events
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (paymentState === 'failed') {
    return (
      <div className="page-wrap max-w-lg">
        <div className="card-pad text-center">
          <p className="text-lg font-semibold text-danger">Payment failed</p>
          <p className="mt-2 text-sm text-muted">
            Your bank did not confirm the payment. Your hold is still active — try again.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button
              type="button"
              className="btn-primary"
              onClick={() => setPaymentState('idle')}
            >
              Try again
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() =>
                releaseAndLeave(`/events/${eventId}`, 'Checkout cancelled', 'info')
              }
            >
              Cancel booking
            </button>
          </div>
        </div>
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
    toast.success('Payment successful — ticket ready')
    navigate(`/tickets/${booking.id}`, { replace: true })
  }

  const handleSimulateFailure = async () => {
    setPaying(true)
    await new Promise((r) => setTimeout(r, 900))
    setPaying(false)
    setPaymentState('failed')
    toast.error('Payment failed — please try again')
  }

  const handleCancel = () => {
    if (window.confirm('Cancel payment and release your seat hold?')) {
      setPaymentState('cancelled')
      clearSeatHold(eventId)
      toast.info('Payment cancelled')
    }
  }

  const handleLeaveLink = (e, to) => {
    if (!guardActive) return
    e.preventDefault()
    if (window.confirm(LEAVE_MSG)) {
      navigate(to)
    }
  }

  return (
    <div className="page-wrap max-w-2xl">
      <Link
        to={`/events/${eventId}`}
        className="link-muted"
        onClick={(e) => handleLeaveLink(e, `/events/${eventId}`)}
      >
        ← Change seats
      </Link>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <HoldTimer expiresAt={hold.expiresAt} onExpired={() => setExpired(true)} />
      </div>

      <div className="mt-8 space-y-6">
        <section className="card-pad">
          <h2 className="text-sm font-medium text-muted">Order summary</h2>
          <p className="mt-2 text-lg font-semibold">{event.title}</p>
          <p className="text-sm text-muted">{event.venue}</p>
          <ul className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <li className="flex justify-between gap-4">
              <span className="text-muted">Seats</span>
              <span className="text-right">{hold.seats.join(', ')}</span>
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
            Razorpay connects later. Use buttons below to test flows.
          </p>
          <div className="mt-4 rounded-lg border border-dashed border-border bg-background p-5 text-center text-sm text-muted">
            UPI · Card · Net banking
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <button
              type="button"
              disabled={paying}
              onClick={handlePay}
              className="btn-primary w-full disabled:opacity-60"
            >
              {paying ? 'Processing…' : `Pay ₹${hold.total.toLocaleString('en-IN')}`}
            </button>
            <button
              type="button"
              disabled={paying}
              onClick={handleSimulateFailure}
              className="btn-secondary w-full disabled:opacity-60"
            >
              Simulate payment failure
            </button>
            <button
              type="button"
              disabled={paying}
              onClick={handleCancel}
              className="w-full py-2 text-sm text-muted hover:text-foreground"
            >
              Cancel payment
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
