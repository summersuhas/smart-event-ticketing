import { useState } from 'react'
import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import EventCard from '../components/EventCard'
import EventFilters from '../components/EventFilters'
import LoadingSpinner from '../components/LoadingSpinner'
import { useEvents } from '../context/EventsContext'
import { getEventCities, useEventFilters } from '../hooks/useEventFilters'

export default function Events() {
  const { events, isLoading } = useEvents()
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('all')
  const [when, setWhen] = useState('all')
  const [sort, setSort] = useState('date-asc')

  const cities = getEventCities(events)
  const filtered = useEventFilters(events, { search, city, when, sort })

  return (
    <div className="page-wrap">
      <h1 className="text-2xl font-semibold sm:text-3xl">All events</h1>
      <p className="mt-2 text-muted">Find concerts, comedy, and festivals near you</p>

      <EventFilters
        search={search}
        onSearchChange={setSearch}
        city={city}
        onCityChange={setCity}
        cities={cities}
        when={when}
        onWhenChange={setWhen}
        sort={sort}
        onSortChange={setSort}
      />

      {isLoading ? (
        <LoadingSpinner label="Loading events…" />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No events match"
          description="Try clearing search or changing city and date filters."
          action={
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setSearch('')
                setCity('all')
                setWhen('all')
              }}
            >
              Clear filters
            </button>
          }
        />
      ) : (
        <>
          <p className="mt-6 text-sm text-muted">
            Showing {filtered.length} of {events.length} events
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
