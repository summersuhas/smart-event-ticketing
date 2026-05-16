import { useMemo } from 'react'

export function extractCity(venue = '') {
  const parts = venue.split(',')
  return parts.length > 1 ? parts[parts.length - 1].trim() : venue.trim()
}

export function useEventFilters(events, { search, city, when, sort }) {
  return useMemo(() => {
    let list = [...events]
    const q = search.trim().toLowerCase()

    if (q) {
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q),
      )
    }

    if (city && city !== 'all') {
      list = list.filter((e) => extractCity(e.venue) === city)
    }

    const now = new Date()
    if (when === 'week') {
      const week = new Date(now)
      week.setDate(week.getDate() + 7)
      list = list.filter((e) => new Date(e.date) <= week)
    } else if (when === 'month') {
      const month = new Date(now)
      month.setMonth(month.getMonth() + 1)
      list = list.filter((e) => new Date(e.date) <= month)
    }

    list.sort((a, b) => {
      const da = new Date(a.date).getTime()
      const db = new Date(b.date).getTime()
      return sort === 'date-desc' ? db - da : da - db
    })

    return list
  }, [events, search, city, when, sort])
}

export function getEventCities(events) {
  const cities = new Set(events.map((e) => extractCity(e.venue)).filter(Boolean))
  return ['all', ...Array.from(cities).sort()]
}
