import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEvents } from '../../context/EventsContext'
import { useToast } from '../../context/ToastContext'

export default function CreateEvent() {
  const { addEvent } = useEvents()
  const { toast } = useToast()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    description: '',
    venue: '',
    date: '',
    image: '',
    vip: '1999',
    premium: '999',
    standard: '499',
    rows: '8',
    cols: '10',
  })

  const update = (field) => (e) =>
    setForm((f) => ({
      ...f,
      [field]: e.target.value,
    }))

  const generateSeats = () => {
    const seats = []

    const rows = Number(form.rows)
    const cols = Number(form.cols)

    for (let r = 0; r < rows; r++) {
      const rowLetter = String.fromCharCode(65 + r)

      for (let c = 1; c <= cols; c++) {
        let tier = 'standard'
        let price = Number(form.standard)

        if (r < 2) {
          tier = 'vip'
          price = Number(form.vip)
        } else if (r < 5) {
          tier = 'premium'
          price = Number(form.premium)
        }

        seats.push({
          row: rowLetter,
          col: c,
          seatNumber: `${rowLetter}${c}`,
          tier,
          price,
          status: 'available',
        })
      }
    }

    return seats
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const user = JSON.parse(
        localStorage.getItem('user')
      )

      const eventData = {
        ...form,

        vip: Number(form.vip),
        premium: Number(form.premium),
        standard: Number(form.standard),

        rows: Number(form.rows),
        cols: Number(form.cols),

        organizerId: user?._id,

        seats: generateSeats(),
      }

      const event = await addEvent(eventData)

      console.log('CREATED EVENT:', event)

      toast.success('Event published')

      navigate(`/events/${event._id}`)
    } catch (err) {
      console.error(err)

      toast.error('Failed to create event')
    }
  }

  return (
    <div className="page-wrap max-w-2xl">
      <Link to="/organizer" className="link-muted">
        ← Dashboard
      </Link>

      <h1 className="mt-4 text-2xl font-semibold">
        Create event
      </h1>

      <p className="mt-2 text-sm text-muted">
        Create and publish a new event.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4"
      >
        <label className="block text-sm font-medium">
          Title

          <input
            required
            className="input-field"
            value={form.title}
            onChange={update('title')}
          />
        </label>

        <label className="block text-sm font-medium">
          Description

          <textarea
            required
            rows={3}
            className="input-field"
            value={form.description}
            onChange={update('description')}
          />
        </label>

        <label className="block text-sm font-medium">
          Venue

          <input
            required
            className="input-field"
            value={form.venue}
            onChange={update('venue')}
          />
        </label>

        <label className="block text-sm font-medium">
          Date & time

          <input
            required
            type="datetime-local"
            className="input-field"
            value={form.date}
            onChange={update('date')}
          />
        </label>

        <label className="block text-sm font-medium">
          Banner URL (optional)

          <input
            className="input-field"
            value={form.image}
            onChange={update('image')}
          />
        </label>

        <div className="grid grid-cols-3 gap-3">
          {['vip', 'premium', 'standard'].map(
            (tier) => (
              <label
                key={tier}
                className="block text-sm font-medium capitalize"
              >
                {tier} (₹)

                <input
                  className="input-field"
                  value={form[tier]}
                  onChange={update(tier)}
                />
              </label>
            )
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm font-medium">
            Rows

            <input
              className="input-field"
              value={form.rows}
              onChange={update('rows')}
            />
          </label>

          <label className="block text-sm font-medium">
            Columns

            <input
              className="input-field"
              value={form.cols}
              onChange={update('cols')}
            />
          </label>
        </div>

        <button
          type="submit"
          className="btn-primary w-full"
        >
          Publish event
        </button>
      </form>
    </div>
  )
}