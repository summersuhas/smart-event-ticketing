import EventCard from '../components/EventCard'
import { useEvents } from '../context/EventsContext'

export default function Events() {
  const { events } = useEvents()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold">
        All events
      </h1>
      <p className="mt-2 text-zinc-400">
        {events.length} events available · prices in INR
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}
