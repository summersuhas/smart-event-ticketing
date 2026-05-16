import { Link } from 'react-router-dom'

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

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/5 bg-panel transition hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={event.image}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-accent-soft">
          From ₹{minPrice}
        </p>
        <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug">
          {event.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
          {event.venue}
        </p>
        <p className="mt-1 text-sm text-zinc-500">{formatDate(event.date)}</p>
        <Link
          to={`/events/${event.id}`}
          className="mt-4 inline-flex items-center text-sm font-semibold text-accent-soft hover:text-white"
        >
          Select seats →
        </Link>
      </div>
    </article>
  )
}
