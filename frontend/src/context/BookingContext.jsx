import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { mockBookings as seedBookings } from '../data/mockEvents'
import { migrateStorageKey } from '../utils/storage'

const STORAGE_KEY = 'myticket_bookings'
migrateStorageKey('seatflow_bookings', STORAGE_KEY)
const BookingContext = createContext(null)

function loadBookings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    /* use seed */
  }
  return seedBookings
}

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(loadBookings)

  const addBooking = useCallback(({ eventId, seats, total }) => {
    const booking = {
      id: `bk-${Date.now()}`,
      eventId,
      seats,
      total,
      status: 'confirmed',
      bookedAt: new Date().toISOString(),
    }
    setBookings((prev) => {
      const next = [booking, ...prev]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
    return booking
  }, [])

  const value = useMemo(
    () => ({ bookings, addBooking, getBooking: (id) => bookings.find((b) => b.id === id) }),
    [bookings, addBooking],
  )

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  )
}

export function useBookings() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBookings must be used within BookingProvider')
  return ctx
}
