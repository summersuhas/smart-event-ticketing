import { useState } from 'react'

import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

import { useToast } from '../context/ToastContext'

export default function Login() {
  const { login } = useAuth()

  const { toast } = useToast()

  const navigate = useNavigate()

  const location = useLocation()

  const from =
    location.state?.from || '/events'

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [error, setError] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    if (
      !email.trim() ||
      !password.trim()
    ) {
      setError('All fields are required')

      return
    }

    setLoading(true)

    const success = await login({
      email,
      password,
    })

    setLoading(false)

    if (!success) {
      setError('Invalid credentials')

      return
    }

    toast.success(
      'Logged in successfully'
    )

    navigate(from, { replace: true })
  }

  return (
    <div className="page-wrap flex min-h-[60vh] max-w-md flex-col justify-center">
      <h1 className="text-3xl font-semibold">
        Log in
      </h1>

      <p className="mt-2 text-sm text-muted">
        Welcome back to MyTicket
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4"
      >
        {error && (
          <p className="rounded-lg border border-danger/30 bg-red-50 px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}

        <label className="block text-sm font-medium">
          Email

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="input-field"
            placeholder="you@example.com"
          />
        </label>

        <label className="block text-sm font-medium">
          Password

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="input-field"
            placeholder="••••••••"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading
            ? 'Logging in...'
            : 'Log in'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        No account?{' '}
        <Link
          to="/signup"
          className="font-medium text-primary hover:text-primary-hover"
        >
          Sign up
        </Link>
      </p>
    </div>
  )
}