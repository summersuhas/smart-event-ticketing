import EventCard from "../components/EventCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEvents } from "../context/EventsContext";

export default function Events() {
  const { events, isLoading } = useEvents();
  console.log(events);
  return (
    <div className="page-wrap">
      <h1 className="text-2xl font-semibold sm:text-3xl">
        All events
      </h1>

      <p className="mt-2 text-muted">
        Browse live events from the backend
      </p>

      {isLoading ? (
        <LoadingSpinner label="Loading events..." />
      ) : events.length === 0 ? (
        <div className="mt-10">
          <h2>No events found</h2>
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-muted">
            Showing {events.length} events
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}