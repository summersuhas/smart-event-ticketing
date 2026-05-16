export default function EmptyState({ title, description, action, className = '' }) {
  return (
    <div className={`card flex flex-col items-center px-6 py-12 text-center ${className}`}>
      <p className="text-lg font-semibold text-foreground">{title}</p>
      {description && <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
