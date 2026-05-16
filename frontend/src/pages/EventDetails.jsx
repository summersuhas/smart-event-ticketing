import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SeatMap from '../components/SeatMap'
import { useAuth } from '../context/AuthContext'
import { mockEvents } from '../data/mockEvents'

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
  const event = mockEvents.find((e) => e.id === id)
  const [selectedIds, setSelectedIds] = useState([])

  const selectedSeats = useMemo(
    () => event?.seats.filter((s) => selectedIds.includes(s.id)) ?? [],
    [event, selectedIds],
  )

  const total = selectedSeats.reduce((sum, s) => sum + s.price, 0)

  if (!event) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <p className="text-zinc-400">Event not found.</p>
        <Link to="/events" className="mt-4 inline-block text-accent-soft">
          ← Back to events
        </Link>
      </div>
    )
  }

  const toggleSeat = (seatId) => {
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
    navigate('/bookings', {
      state: {
        pending: { eventId: event.id, seats: selectedIds, total },
      },
    })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link to="/events" className="text-sm text-zinc-500 hover:text-white">
        ← All events
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <img
            src={event.image}
            alt=""
            className="aspect-video w-full rounded-2xl object-cover"
          />
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-3xl font-bold">
            {event.title}
          </h1>
          <p className="mt-3 text-zinc-400">{event.description}</p>
          <ul className="mt-6 space-y-2 text-sm text-zinc-300">
            <li>
              <span className="text-zinc-500">Venue · </span>
              {event.venue}
            </li>
            <li>
              <span className="text-zinc-500">Date · </span>
              {formatDate(event.date)}
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/5 bg-panel p-6">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
            Select seats
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Locked seats will sync via Socket.io + Redis in later phases.
          </p>

          <div className="mt-8">
            <SeatMap
              seats={event.seats}
              layout={event.layout}
              selectedIds={selectedIds}
              onToggle={toggleSeat}
            />
          </div>

          <div className="mt-8 border-t border-white/5 pt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">
                {selectedIds.length} seat{selectedIds.length !== 1 && 's'} selected
              </span>
              <span className="text-xl font-bold">
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>
            <button
              type="button"
              disabled={selectedIds.length === 0}
              onClick={handleCheckout}
              className="mt-4 w-full rounded-full bg-accent py-3 text-sm font-semibold text-white hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isAuthenticated ? 'Continue to payment' : 'Log in to book'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
