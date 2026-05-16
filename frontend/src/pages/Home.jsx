import { Link } from 'react-router-dom'
import EventCard from '../components/EventCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { useEvents } from '../context/EventsContext'

export default function Home() {
  const { events, isLoading } = useEvents()
  const featured = events.slice(0, 3)

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="page-wrap max-w-3xl">
          <p className="text-sm font-medium text-primary">MyTicket</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
            Book seats for live events
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Browse concerts and shows, pick seats on a simple map, and complete checkout
            with a temporary seat hold while you pay.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/events" className="btn-primary">
              Browse events
            </Link>
            <Link to="/signup" className="btn-secondary">
              Create account
            </Link>
          </div>
        </div>
      </section>

      <section className="page-wrap">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Upcoming events</h2>
            <p className="mt-1 text-sm text-muted">Sample listings for this demo</p>
          </div>
          <Link
            to="/events"
            className="text-sm font-medium text-primary hover:text-primary-hover"
          >
            View all
          </Link>
        </div>
        {isLoading ? (
          <LoadingSpinner label="Loading events…" />
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
