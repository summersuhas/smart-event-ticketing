import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/events'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('Email is required')
      return
    }
    login(email, password)
    navigate(from, { replace: true })
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold">
        Welcome back
      </h1>
      <p className="mt-2 text-zinc-400">
        Demo login — any email works. Use <code className="text-accent-soft">admin@</code> for organizer role.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {error && (
          <p className="rounded-lg bg-danger/10 px-4 py-2 text-sm text-danger">
            {error}
          </p>
        )}
        <label className="block">
          <span className="text-sm text-zinc-400">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-panel px-4 py-3 text-white outline-none focus:border-accent"
            placeholder="you@example.com"
          />
        </label>
        <label className="block">
          <span className="text-sm text-zinc-400">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-panel px-4 py-3 text-white outline-none focus:border-accent"
            placeholder="••••••••"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-white hover:bg-accent-soft"
        >
          Log in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-500">
        No account?{' '}
        <Link to="/signup" className="text-accent-soft hover:text-white">
          Sign up
        </Link>
      </p>
    </div>
  )
}
