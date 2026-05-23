import { useNavigate, useParams } from 'react-router-dom'

import { useEvents } from '../context/EventsContext'

function EventDetails() {
  const { id } = useParams()

  const navigate = useNavigate()

  const { events } = useEvents()

  const event = events.find(
    (e) => String(e._id) === String(id)
  )

  if (!event) {
    return (
      <div className="mt-10 text-center text-2xl">
        Event not found
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <img
        src={
          event.image ||
          event.poster ||
          event.thumbnail ||
          'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4'
        }
        alt={event.title}
        className="mb-6 h-96 w-full rounded-xl object-cover"
      />

      <h1 className="mb-4 text-4xl font-bold">
        {event.title}
      </h1>

      <p className="mb-2 text-lg text-gray-600">
        📍{' '}
        {event.location ||
          'Location unavailable'}
      </p>

      <p className="mb-2 text-lg text-gray-600">
        🎟️ ₹{event.price}
      </p>

      <p className="mb-4 text-gray-500">
        📅{' '}
        {new Date(
          event.date
        ).toLocaleDateString()}
      </p>

      <p className="mb-6 leading-7 text-gray-700">
        {event.description ||
          'No description available.'}
      </p>

      <button
        onClick={() =>
          navigate(
            `/checkout/${event._id}`
          )
        }
        className="rounded-lg bg-black px-6 py-3 text-white"
      >
        Book Tickets
      </button>
    </div>
  )
}

export default EventDetails