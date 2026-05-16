import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEvents } from '../../context/EventsContext'

export default function CreateEvent() {
  const { addEvent } = useEvents()
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
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const event = addEvent(form)
    navigate(`/events/${event.id}`)
  }

  const inputClass =
    'mt-1 w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-accent'

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <Link to="/organizer" className="text-sm text-zinc-500 hover:text-white">
        ← Dashboard
      </Link>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold">
        Create event
      </h1>
      <p className="mt-2 text-sm text-zinc-400">
        Saved locally until the backend is connected.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <label className="block text-sm">
          <span className="text-zinc-400">Title</span>
          <input required className={inputClass} value={form.title} onChange={update('title')} />
        </label>
        <label className="block text-sm">
          <span className="text-zinc-400">Description</span>
          <textarea
            required
            rows={3}
            className={inputClass}
            value={form.description}
            onChange={update('description')}
          />
        </label>
        <label className="block text-sm">
          <span className="text-zinc-400">Venue</span>
          <input required className={inputClass} value={form.venue} onChange={update('venue')} />
        </label>
        <label className="block text-sm">
          <span className="text-zinc-400">Date & time</span>
          <input
            required
            type="datetime-local"
            className={inputClass}
            value={form.date}
            onChange={update('date')}
          />
        </label>
        <label className="block text-sm">
          <span className="text-zinc-400">Banner URL (optional)</span>
          <input className={inputClass} value={form.image} onChange={update('image')} />
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['vip', 'premium', 'standard'].map((tier) => (
            <label key={tier} className="block text-sm capitalize">
              <span className="text-zinc-400">{tier} ₹</span>
              <input className={inputClass} value={form[tier]} onChange={update(tier)} />
            </label>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm">
            <span className="text-zinc-400">Rows</span>
            <input className={inputClass} value={form.rows} onChange={update('rows')} />
          </label>
          <label className="block text-sm">
            <span className="text-zinc-400">Columns</span>
            <input className={inputClass} value={form.cols} onChange={update('cols')} />
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-white hover:bg-accent-soft"
        >
          Publish event
        </button>
      </form>
    </div>
  )
}
