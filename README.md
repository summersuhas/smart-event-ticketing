# Smart Event Ticketing (SeatFlow)

MERN event ticketing platform — **Phase 1: frontend** in progress.

## Frontend (current)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

### Stack

- React 19 + Vite
- React Router
- Tailwind CSS v4

### Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/events` | Events listing |
| `/events/:id` | Event details + seat map |
| `/login`, `/signup` | Auth (localStorage demo) |
| `/profile` | User profile |
| `/bookings` | Booking history |
| `/tickets/:bookingId` | Ticket view |

Mock data lives in `frontend/src/data/mockEvents.js`.

## Next phases

2. Express + MongoDB APIs  
3. JWT auth  
4. Socket.io realtime seats  
5. Redis seat locks  
6. Razorpay payments  
