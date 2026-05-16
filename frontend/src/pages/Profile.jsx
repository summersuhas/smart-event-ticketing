import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()
  if (!user) return null

  return (
    <div className="page-wrap">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <dl className="card-pad mt-6 max-w-md space-y-4 text-sm">
        <div>
          <dt className="text-muted">Name</dt>
          <dd className="mt-1 font-medium">{user.name}</dd>
        </div>
        <div>
          <dt className="text-muted">Email</dt>
          <dd className="mt-1">{user.email}</dd>
        </div>
        <div>
          <dt className="text-muted">Role</dt>
          <dd className="mt-1 capitalize">{user.role}</dd>
        </div>
      </dl>
    </div>
  )
}
