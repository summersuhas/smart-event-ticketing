const statusStyles = {
  available:
    'border border-border bg-surface text-foreground hover:border-primary hover:bg-primary/5 cursor-pointer',
  selected:
    'border-2 border-primary bg-primary text-white cursor-pointer',
  locked:
    'border border-warning/40 bg-amber-50 text-warning cursor-not-allowed',
  booked:
    'border border-border bg-background text-muted cursor-not-allowed',
}

const tierLabels = { vip: 'VIP', premium: 'Premium', standard: 'Standard' }

const legend = [
  ['available', 'border-border bg-surface'],
  ['selected', 'bg-primary'],
  ['locked', 'bg-amber-100'],
  ['booked', 'bg-background'],
]

export default function SeatMap({ seats, selectedIds, onToggle, layout }) {
  return (
    <div className="w-full">
      <div className="mx-auto mb-6 max-w-xs rounded-md border border-border bg-background py-2 text-center text-xs font-medium uppercase tracking-wide text-muted">
        Stage
      </div>

      <div className="overflow-x-auto pb-2">
        <div
          className="mx-auto inline-grid gap-1.5 sm:gap-2"
          style={{
            gridTemplateColumns: `repeat(${layout.cols}, minmax(0, 1fr))`,
          }}
        >
          {seats.map((seat) => {
            const isSelected = selectedIds.includes(seat.id)
            const status = isSelected ? 'selected' : seat.status
            const disabled = seat.status === 'booked' || seat.status === 'locked'

            return (
              <button
                key={seat.id}
                type="button"
                disabled={disabled}
                title={`${seat.id} · ${tierLabels[seat.tier]} · ₹${seat.price}`}
                onClick={() => onToggle(seat.id)}
                className={`flex h-7 w-7 items-center justify-center rounded text-[10px] font-medium sm:h-8 sm:w-8 sm:text-xs ${statusStyles[status]}`}
              >
                {seat.col}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-muted">
        {legend.map(([key, color]) => (
          <span key={key} className="flex items-center gap-2 capitalize">
            <span className={`h-3 w-3 rounded-sm border ${color}`} />
            {key}
          </span>
        ))}
      </div>
    </div>
  )
}
