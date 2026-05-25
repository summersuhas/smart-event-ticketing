import { Link } from 'react-router-dom'
import { useBooking } from '../../context/BookingContext'
import { useEvents } from '../../context/EventsContext'

export default function OrganizerAnalytics() {
  const { events = [] } = useEvents()
  const { bookings = [] } = useBooking()

  const byEvent = events.map((event) => {
    const eventBookings = bookings.filter(
      (b) => b.eventId === event._id
    )

    const revenue = eventBookings.reduce(
      (s, b) => s + (b.total || 0),
      0
    )

    return {
      id: event._id,
      title: event.title,

      tickets: eventBookings.reduce(
        (s, b) => s + (b.seats?.length || 0),
        0
      ),

      revenue,
    }
  })

  const maxRevenue = Math.max(
    ...byEvent.map((e) => e.revenue),
    1
  )

  return (
    <div className="page-wrap">
      <Link to="/organizer" className="link-muted">
        ← Dashboard
      </Link>

      <h1 className="mt-4 text-2xl font-semibold">
        Analytics
      </h1>

      <p className="mt-2 text-sm text-muted">
        Based on local demo booking data.
      </p>

      <ul className="mt-8 space-y-4">
        {byEvent.map((row) => (
          <li key={row.id} className="card-pad">
            <div className="flex flex-wrap justify-between gap-2 text-sm">
              <span className="font-medium">
                {row.title}
              </span>

              <span className="text-muted">
                {row.tickets} tickets · ₹
                {row.revenue.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-background">
              <div
                className="h-full rounded-full bg-primary"
                style={{
                  width: `${
                    (row.revenue / maxRevenue) * 100
                  }%`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
