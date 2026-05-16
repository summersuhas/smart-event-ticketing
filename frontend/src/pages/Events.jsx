import EventCard from '../components/EventCard'
import { useEvents } from '../context/EventsContext'

export default function Events() {
  const { events } = useEvents()

  return (
    <div className="page-wrap">
      <h1 className="text-2xl font-semibold sm:text-3xl">All events</h1>
      <p className="mt-2 text-muted">
        {events.length} events · prices in INR
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}
