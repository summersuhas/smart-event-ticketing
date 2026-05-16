import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EVENT_FALLBACK_IMAGE } from '../constants/images'

function formatDate(iso) {
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso))
}

export default function EventCard({ event }) {
  const minPrice = Math.min(...Object.values(event.pricing))
  const [imgSrc, setImgSrc] = useState(event.image || EVENT_FALLBACK_IMAGE)

  return (
    <article className="card overflow-hidden transition-shadow hover:shadow-md">
      <div className="aspect-[16/10] overflow-hidden bg-background">
        <img
          src={imgSrc}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setImgSrc(EVENT_FALLBACK_IMAGE)}
        />
      </div>
      <div className="p-4 sm:p-5">
        <p className="text-xs font-medium text-muted">From ₹{minPrice}</p>
        <h3 className="mt-1 text-base font-semibold leading-snug">{event.title}</h3>
        <p className="mt-1 text-sm text-muted">{event.venue}</p>
        <p className="text-sm text-muted">{formatDate(event.date)}</p>
        <Link
          to={`/events/${event.id}`}
          className="mt-3 inline-block text-sm font-medium text-primary hover:text-primary-hover"
        >
          Select seats
        </Link>
      </div>
    </article>
  )
}
