import { useState } from 'react'

import {
  Link,
  useNavigate,
} from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

import { useToast } from '../context/ToastContext'

export default function Signup() {
  const { signup } = useAuth()

  const { toast } = useToast()

  const navigate = useNavigate()

  const [name, setName] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [role, setRole] =
    useState('user')

  const [error, setError] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault()

    setError('')

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      setError(
        'All fields are required'
      )

      return
    }

    try {
      setLoading(true)

      const success =
        await signup({
          name,
          email,
          password,
          role,
        })

      console.log(success)

      if (success === true) {
        toast.success(
          'Account created'
        )

        navigate('/events')
      } else {
        setError(success)
      }
    } catch (err) {
      console.error(err)

      setError(
        'Something went wrong'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrap flex min-h-[60vh] max-w-md flex-col justify-center">
      <h1 className="text-3xl font-semibold">
        Sign up
      </h1>

      <p className="mt-2 text-sm text-muted">
        Create your MyTicket
        account
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
          Name

          <input
            type="text"
            required
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="input-field"
            placeholder="John Doe"
          />
        </label>

        <label className="block text-sm font-medium">
          Email

          <input
            type="email"
            required
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="input-field"
            placeholder="you@example.com"
          />
        </label>

        <label className="block text-sm font-medium">
          Password

          <input
            type="password"
            required
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="input-field"
            placeholder="••••••••"
          />
        </label>

        <label className="block text-sm font-medium">
          Account Type

          <select
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value
              )
            }
            className="input-field"
          >
            <option value="user">
              User
            </option>

            <option value="organizer">
              Organizer
            </option>
          </select>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading
            ? 'Creating account...'
            : 'Create account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Have an account?{' '}
        <Link
          to="/login"
          className="font-medium text-primary hover:text-primary-hover"
        >
          Log in
        </Link>
      </p>
    </div>
  )
}