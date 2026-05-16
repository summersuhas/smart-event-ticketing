/** Deterministic pseudo-random lock set per event (simulates other users via Redis later). */
function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0
  return Math.abs(h)
}

export function getSimulatedLockedSeatIds(eventId, seats) {
  const locked = new Set()
  const available = seats.filter((s) => s.status === 'available')

  available.forEach((seat) => {
    const score = hash(`${eventId}:${seat.id}`) % 100
    if (score < 12) locked.add(seat.id)
  })

  return locked
}

export function mergeSeatStatuses(seats, lockedIds) {
  return seats.map((seat) => {
    if (seat.status === 'booked') return seat
    if (lockedIds.has(seat.id)) return { ...seat, status: 'locked' }
    return { ...seat, status: 'available' }
  })
}
