import { Link } from 'react-router-dom'
import { useBooking } from '../../context/BookingContext'
import { useEvents } from '../../context/EventsContext'

export default function OrganizerDashboard() {
  const { events } = useEvents()
  const { bookings } = useBooking()
  const totalRevenue = bookings.reduce((sum, b) => sum + b.total, 0)

  return (
    <div className="page-wrap">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-primary">Organizer</p>
          <h1 className="mt-1 text-2xl font-semibold">Dashboard</h1>
        </div>
        <Link to="/organizer/events/new" className="btn-primary">
          Create event
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Events', value: events.length },
          { label: 'Bookings', value: bookings.length },
          { label: 'Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}` },
        ].map((stat) => (
          <div key={stat.label} className="card-pad">
            <p className="text-sm text-muted">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Events</h2>
        <ul className="card mt-4 divide-y divide-border">
          {events.slice(0, 8).map((event) => (
            <li
              key={event._id}
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5"
            >
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-muted">{event.venue}</p>
              </div>
              <Link
                to={`/events/${event._id}`}
                className="text-sm font-medium text-primary hover:text-primary-hover"
              >
                View
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Link
        to="/organizer/analytics"
        className="mt-6 inline-block text-sm font-medium text-primary"
      >
        View analytics →
      </Link>
    </div>
  )
}
