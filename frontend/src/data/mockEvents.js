import { buildSeats } from '../utils/seats'

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
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80&auto=format&fit=crop',
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
