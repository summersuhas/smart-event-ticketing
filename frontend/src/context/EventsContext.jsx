import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { mockEvents as seedEvents } from '../data/mockEvents'
import { buildSeats } from '../utils/seats'

import { migrateStorageKey } from '../utils/storage'

const STORAGE_KEY = 'myticket_custom_events'
migrateStorageKey('seatflow_custom_events', STORAGE_KEY)
const EventsContext = createContext(null)

function loadCustomEvents() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    /* use empty */
  }
  return []
}

export function EventsProvider({ children }) {
  const [customEvents, setCustomEvents] = useState(loadCustomEvents)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 450)
    return () => clearTimeout(t)
  }, [])

  const events = useMemo(
    () => [...customEvents, ...seedEvents],
    [customEvents],
  )

  const getEvent = useCallback(
    (id) => events.find((e) => e.id === id),
    [events],
  )

  const addEvent = useCallback((form) => {
    const rows = Number(form.rows) || 8
    const cols = Number(form.cols) || 10
    const event = {
      id: `evt-${Date.now()}`,
      title: form.title,
      description: form.description,
      venue: form.venue,
      date: form.date,
      image:
        form.image ||
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
      pricing: {
        vip: Number(form.vip) || 1999,
        premium: Number(form.premium) || 999,
        standard: Number(form.standard) || 499,
      },
      layout: { rows, cols },
      seats: buildSeats(rows, cols),
      organizerOnly: true,
    }
    const next = [event, ...customEvents]
    setCustomEvents(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    return event
  }, [customEvents])

  const value = useMemo(
    () => ({ events, getEvent, addEvent, isLoading }),
    [events, getEvent, addEvent, isLoading],
  )

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
}

export function useEvents() {
  const ctx = useContext(EventsContext)
  if (!ctx) throw new Error('useEvents must be used within EventsProvider')
  return ctx
}
