import { Link } from 'react-router-dom'

import axiosInstance from '../../api/axiosInstance'

import { useBooking } from '../../context/BookingContext'
import { useEvents } from '../../context/EventsContext'

export default function OrganizerDashboard() {
  const { events = [] } = useEvents()

  const { bookings = [] } =
    useBooking()

  const user = JSON.parse(
    localStorage.getItem('user')
  )

  // Filter organizer events
  const myEvents = events.filter(
    (e) =>
      String(e.organizer) ===
      String(user?._id)
  )

  // Get event IDs
  const myEventIds = myEvents.map(
    (e) => e._id
  )

  // Filter organizer bookings
  const myBookings = bookings.filter(
    (b) =>
      myEventIds.includes(
        b.eventId
      )
  )

  // Calculate revenue
  const totalRevenue =
    myBookings.reduce(
      (sum, b) =>
        sum + (b.total || 0),
      0
    )

  // Delete event
  const handleDelete = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        'Delete this event?'
      )

    if (!confirmed) return

    try {
      await axiosInstance.delete(
        `/api/events/${id}`
      )

      window.location.reload()
    } catch (error) {
      console.error(
        'Delete failed',
        error
      )
    }
  }
  console.log("USER:", user)

  console.log("EVENTS:", events)
  
  console.log("BOOKINGS:", bookings)
  console.log(
    "USER ID:",
    user?._id
  )
  
  console.log(
    "EVENT ORGANIZER IDS:",
    events.map(
      (e) => e.organizerId
    )
  )
  events.forEach((e) => {
    console.log(
      "EVENT:",
      e.title,
      "ORG:",
      e.organizerId,
      "USER:",
      user?._id
    )
  })
  return (
    <div className="page-wrap">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-primary">
            Organizer
          </p>

          <h1 className="mt-1 text-2xl font-semibold">
            Dashboard
          </h1>
        </div>

        <Link
          to="/organizer/events/new"
          className="btn-primary"
        >
          Create Event
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          {
            label: 'Events',
            value:
              myEvents.length,
          },

          {
            label: 'Bookings',
            value:
              myBookings.length,
          },

          {
            label: 'Revenue',
            value: `₹${totalRevenue.toLocaleString(
              'en-IN'
            )}`,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="card-pad"
          >
            <p className="text-sm text-muted">
              {stat.label}
            </p>

            <p className="mt-1 text-2xl font-semibold">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Events */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Your Events
          </h2>
        </div>

        {myEvents.length === 0 ? (
          <div className="card mt-4 p-6 text-center">
            <p className="text-muted">
              No events created yet.
            </p>
          </div>
        ) : (
          <ul className="card mt-4 divide-y divide-border">
            {myEvents
              .slice(0, 8)
              .map((event) => (
                <li
                  key={event._id}
                  className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-5"
                >
                  {/* Event Info */}
                  <div>
                    <p className="font-medium">
                      {
                        event.title
                      }
                    </p>

                    <p className="text-sm text-muted">
                      {
                        event.venue
                      }
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/events/${event._id}`}
                      className="text-sm font-medium text-primary hover:text-primary-hover"
                    >
                      View
                    </Link>

                    <Link
                      to={`/organizer/events/edit/${event._id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(
                          event._id
                        )
                      }
                      className="text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </section>

      {/* Analytics */}
      <Link
        to="/organizer/analytics"
        className="mt-6 inline-block text-sm font-medium text-primary"
      >
        View analytics →
      </Link>
    </div>
  )
}