import { Link } from "react-router-dom"

function EventCard({ event }) {
  if (!event) return null
  console.log("EVENT CARD:", event)

  const tags = Object.values(event?.tags || {})
  const artists = Object.values(event?.artists || {})
  const links = Object.values(event?.links || {})

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      
      <img
        src={
          event.image ||
          event.poster ||
          event.thumbnail ||
          "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"
        }
        alt={event.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">
          {event.title || "Untitled Event"}
        </h2>

        <p className="text-gray-600 mb-2">
          {event.location || "Location not available"}
        </p>

        <p className="text-sm text-gray-500 mb-3">
          {event.date || "Date not available"}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mb-4">
          {artists.map((artist, index) => (
            <p key={index} className="text-sm text-gray-700">
              🎤 {artist}
            </p>
          ))}
        </div>

        <div className="flex gap-3">
          {links.map((link, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Book Now
            </a>
          ))}
        </div>

        <Link
          to={`/events/${event._id}`}
          className="inline-block mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default EventCard