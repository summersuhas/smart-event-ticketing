import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Signup() {
  const { signup } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(name || 'Guest', email)
    toast.success('Account created')
    navigate('/events')
  }

  return (
    <div className="page-wrap flex min-h-[60vh] max-w-md flex-col justify-center">
      <h1 className="text-2xl font-semibold">Sign up</h1>
      <p className="mt-2 text-sm text-muted">Account data is stored locally for this demo.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block text-sm font-medium">
          Name
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </label>
        <label className="block text-sm font-medium">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </label>
        <button type="submit" className="btn-primary w-full">
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Have an account?{' '}
        <Link to="/login" className="font-medium text-primary hover:text-primary-hover">
          Log in
        </Link>
      </p>
    </div>
  )
}
