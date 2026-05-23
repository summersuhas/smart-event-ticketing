import { useParams, useNavigate } from 'react-router-dom'
import { useEvents } from '../context/EventsContext'

function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { events } = useEvents()

  const event = events.find(
    (e) => String(e.id) === String(id)
  )

  if (!event) {
    return (
      <div className="text-center mt-10 text-2xl">
        Event not found
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <img
        src={
          event.image ||
          event.poster ||
          event.thumbnail ||
          'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4'
        }
        alt={event.title}
        className="w-full h-96 object-cover rounded-xl mb-6"
      />

      <h1 className="text-4xl font-bold mb-4">
        {event.title}
      </h1>

      <p className="text-lg text-gray-600 mb-2">
        📍 {event.location || 'Location unavailable'}
      </p>

      <p className="text-gray-500 mb-4">
        📅 {event.date || 'Date unavailable'}
      </p>

      <p className="text-gray-700 leading-7 mb-6">
        {event.description ||
          'No description available.'}
      </p>

      <button
        onClick={() => navigate(`/checkout/${event.id}`)}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Book Tickets
      </button>
    </div>
  )
}

export default EventDetails