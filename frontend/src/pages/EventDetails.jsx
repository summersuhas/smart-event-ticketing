import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import SeatMap from '../components/SeatMap'
import { useAuth } from '../context/AuthContext'
import { useEvents } from '../context/EventsContext'
import { useToast } from '../context/ToastContext'
import {
  getSimulatedLockedSeatIds,
  mergeSeatStatuses,
} from '../utils/simulatedLocks'
import { EVENT_FALLBACK_IMAGE } from '../constants/images'
import { saveSeatHold } from '../utils/seats'

function formatDate(iso) {
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso))
}

export default function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { getEvent, isLoading } = useEvents()
  const { toast } = useToast()
  const event = getEvent(id)
  const [selectedIds, setSelectedIds] = useState([])
  const [bannerSrc, setBannerSrc] = useState(null)

  const displaySeats = useMemo(() => {
    if (!event) return []
    const locked = getSimulatedLockedSeatIds(event.id, event.seats)
    return mergeSeatStatuses(event.seats, locked)
  }, [event])

  const selectedSeats = useMemo(
    () => displaySeats.filter((s) => selectedIds.includes(s.id)),
    [displaySeats, selectedIds],
  )

  const total = selectedSeats.reduce((sum, s) => sum + s.price, 0)

  if (isLoading) {
    return <LoadingSpinner label="Loading event…" />
  }

  if (!event) {
    return (
      <div className="page-wrap text-center">
        <p className="text-muted">Event not found.</p>
        <Link to="/events" className="mt-4 inline-block text-sm font-medium text-primary">
          Back to events
        </Link>
      </div>
    )
  }

  const toggleSeat = (seatId) => {
    const seat = displaySeats.find((s) => s.id === seatId)
    if (seat?.status === 'locked') {
      toast.info('This seat is held by another user. Try again in a few minutes.')
      return
    }
    setSelectedIds((prev) =>
      prev.includes(seatId)
        ? prev.filter((sid) => sid !== seatId)
        : [...prev, seatId],
    )
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/events/${id}` } })
      return
    }
    saveSeatHold(id, { seats: selectedIds, total })
    toast.success('Seats reserved for 10 minutes')
    navigate(`/checkout/${id}`)
  }

  return (
    <div className="page-wrap">
      <Link to="/events" className="link-muted">
        ← All events
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="min-w-0">
          <img
            src={bannerSrc ?? event.image ?? EVENT_FALLBACK_IMAGE}
            alt=""
            className="aspect-video w-full rounded-lg border border-border object-cover"
            onError={() => setBannerSrc(EVENT_FALLBACK_IMAGE)}
          />
          <h1 className="mt-5 text-2xl font-semibold sm:text-3xl">{event.title}</h1>
          <p className="mt-3 text-muted">{event.description}</p>
          <ul className="mt-5 space-y-2 text-sm">
            <li>
              <span className="text-muted">Venue · </span>
              {event.venue}
            </li>
            <li>
              <span className="text-muted">Date · </span>
              {formatDate(event.date)}
            </li>
          </ul>
        </div>

        <div className="card-pad min-w-0 lg:sticky lg:top-20 lg:self-start">
          <h2 className="text-lg font-semibold">Select seats</h2>
          <p className="mt-1 text-sm text-muted">
            Amber = held by others (simulates Redis lock). Your hold starts at checkout.
          </p>

          <div className="mt-6">
            <SeatMap
              seats={displaySeats}
              layout={event.layout}
              selectedIds={selectedIds}
              onToggle={toggleSeat}
            />
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-muted">
                {selectedIds.length} seat{selectedIds.length !== 1 && 's'} selected
              </span>
              <span className="text-lg font-semibold">
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>
            <button
              type="button"
              disabled={selectedIds.length === 0}
              onClick={handleCheckout}
              className="btn-primary mt-4 w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isAuthenticated ? 'Continue to checkout' : 'Log in to book'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
