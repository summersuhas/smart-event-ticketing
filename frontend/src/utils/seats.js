export function buildSeats(rows, cols, booked = []) {
  const seats = []
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      const id = `${String.fromCharCode(64 + r)}${c}`
      seats.push({
        id,
        row: r,
        col: c,
        tier: r <= 2 ? 'vip' : r <= 5 ? 'premium' : 'standard',
        status: booked.includes(id) ? 'booked' : 'available',
        price: r <= 2 ? 2499 : r <= 5 ? 1499 : 799,
      })
    }
  }
  return seats
}

export const HOLD_DURATION_MS = 10 * 60 * 1000

export function saveSeatHold(eventId, payload) {
  const hold = {
    ...payload,
    expiresAt: Date.now() + HOLD_DURATION_MS,
  }
  sessionStorage.setItem(`myticket_hold_${eventId}`, JSON.stringify(hold))
  return hold
}

export function getSeatHold(eventId) {
  const raw = sessionStorage.getItem(`myticket_hold_${eventId}`)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function clearSeatHold(eventId) {
  sessionStorage.removeItem(`myticket_hold_${eventId}`)
}
