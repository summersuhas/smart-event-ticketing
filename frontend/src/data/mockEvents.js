const buildSeats = (rows, cols, booked = []) => {
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

export const mockEvents = [
  {
    id: 'evt-1',
    title: 'Neon Nights — Electronic Odyssey',
    description:
      'An immersive electronic music experience with world-class visuals and a 360° sound stage.',
    venue: 'Skyline Arena, Mumbai',
    date: '2026-06-14T19:30:00',
    image:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
    pricing: { vip: 2499, premium: 1499, standard: 799 },
    layout: { rows: 8, cols: 12 },
    seats: buildSeats(8, 12, ['A3', 'A4', 'B5', 'C7', 'D2', 'E9']),
  },
  {
    id: 'evt-2',
    title: 'Stand-Up Circuit: Late Laughs',
    description:
      'Five comedians, one stage, zero filter. An evening of sharp wit and surprise guests.',
    venue: 'The Laugh Factory, Bangalore',
    date: '2026-07-02T20:00:00',
    image:
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
    pricing: { vip: 1999, premium: 999, standard: 499 },
    layout: { rows: 6, cols: 10 },
    seats: buildSeats(6, 10, ['A1', 'B3', 'C5']),
  },
  {
    id: 'evt-3',
    title: 'Indie Fest Under the Stars',
    description:
      'Outdoor indie bands, food trucks, and artisan markets until midnight.',
    venue: 'Riverside Grounds, Pune',
    date: '2026-08-22T17:00:00',
    image:
      'https://images.unsplash.com/photo-1459749411175-04bf49a629b0?w=800&q=80',
    pricing: { vip: 1799, premium: 1099, standard: 599 },
    layout: { rows: 10, cols: 14 },
    seats: buildSeats(10, 14, ['A5', 'A6', 'F8', 'G9', 'H10']),
  },
]

export const mockBookings = [
  {
    id: 'bk-101',
    eventId: 'evt-1',
    seats: ['C4', 'C5'],
    total: 1598,
    status: 'confirmed',
    bookedAt: '2026-05-10T14:22:00',
  },
]
