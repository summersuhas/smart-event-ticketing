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
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    try {
      const event = await addEvent(form)
  
      console.log("CREATED EVENT:", event)
  
      toast.success("Event published")
  
      navigate(`/events/${event._id}`)
    } catch (err) {
      console.error(err)
  
      toast.error("Failed to create event")
    }
  }

  return (
    <div className="page-wrap max-w-2xl">
      <Link to="/organizer" className="link-muted">
        ← Dashboard
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">Create event</h1>
      <p className="mt-2 text-sm text-muted">Saved locally until backend is added.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block text-sm font-medium">
          Title
          <input required className="input-field" value={form.title} onChange={update('title')} />
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
          <input required className="input-field" value={form.venue} onChange={update('venue')} />
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
          <input className="input-field" value={form.image} onChange={update('image')} />
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['vip', 'premium', 'standard'].map((tier) => (
            <label key={tier} className="block text-sm font-medium capitalize">
              {tier} (₹)
              <input className="input-field" value={form[tier]} onChange={update(tier)} />
            </label>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm font-medium">
            Rows
            <input className="input-field" value={form.rows} onChange={update('rows')} />
          </label>
          <label className="block text-sm font-medium">
            Columns
            <input className="input-field" value={form.cols} onChange={update('cols')} />
          </label>
        </div>
        <button type="submit" className="btn-primary w-full">
          Publish event
        </button>
      </form>
    </div>
  )
}
