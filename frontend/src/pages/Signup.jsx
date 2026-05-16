import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(name || 'Guest', email)
    navigate('/events')
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold">
        Create account
      </h1>
      <p className="mt-2 text-zinc-400">Stored locally until the backend is ready.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <label className="block">
          <span className="text-sm text-zinc-400">Name</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-panel px-4 py-3 text-white outline-none focus:border-accent"
          />
        </label>
        <label className="block">
          <span className="text-sm text-zinc-400">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-panel px-4 py-3 text-white outline-none focus:border-accent"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-white hover:bg-accent-soft"
        >
          Sign up
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-500">
        Already have an account?{' '}
        <Link to="/login" className="text-accent-soft hover:text-white">
          Log in
        </Link>
      </p>
    </div>
  )
}
