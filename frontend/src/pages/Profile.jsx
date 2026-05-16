import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold">
        Profile
      </h1>
      <div className="mt-8 max-w-md rounded-2xl border border-white/5 bg-panel p-6">
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="text-zinc-500">Name</dt>
            <dd className="mt-1 text-lg font-medium">{user.name}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Email</dt>
            <dd className="mt-1">{user.email}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Role</dt>
            <dd className="mt-1 capitalize">{user.role}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
