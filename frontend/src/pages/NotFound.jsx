import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page-wrap max-w-lg text-center">
      <p className="text-6xl font-semibold text-muted">404</p>
      <h1 className="mt-4 text-xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-muted">The page you requested does not exist.</p>
      <Link to="/" className="btn-primary mt-8 inline-flex">
        Go home
      </Link>
    </div>
  )
}
