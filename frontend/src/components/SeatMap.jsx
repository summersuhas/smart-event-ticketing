const statusStyles = {
  available:
    'border border-border bg-surface text-foreground hover:border-primary hover:bg-primary/5 cursor-pointer',
  selected:
    'border-2 border-primary bg-primary text-white cursor-pointer',
  locked:
    'border border-amber-300 bg-amber-50 text-warning cursor-not-allowed',
  booked:
    'border border-border bg-background text-muted cursor-not-allowed',
}

const tierLabels = { vip: 'VIP', premium: 'Premium', standard: 'Standard' }

const legend = [
  ['available', 'border-border bg-surface'],
  ['selected', 'bg-primary border-primary'],
  ['locked', 'bg-amber-100 border-amber-300'],
  ['booked', 'bg-background border-border'],
]

export default function SeatMap({ seats, selectedIds, onToggle, layout }) {
  const rows = Array.from({ length: layout.rows }, (_, i) => i + 1)

  return (
    <div className="w-full min-w-0">
      <div className="mx-auto mb-5 max-w-xs rounded-md border border-border bg-background py-2 text-center text-xs font-medium uppercase tracking-wide text-muted">
        Stage
      </div>

      <div className="overflow-x-auto pb-2 -mx-1 px-1">
        <div className="inline-flex min-w-full flex-col items-center gap-1.5 sm:gap-2">
          {rows.map((rowNum) => {
            const rowLabel = String.fromCharCode(64 + rowNum)
            const rowSeats = seats
              .filter((s) => s.row === rowNum)
              .sort((a, b) => a.col - b.col)

            return (
              <div key={rowNum} className="flex items-center gap-1.5 sm:gap-2">
                <span
                  className="w-5 shrink-0 text-center text-xs font-semibold text-muted sm:w-6"
                  aria-hidden
                >
                  {rowLabel}
                </span>
                <div className="flex gap-1 sm:gap-1.5">
                  {rowSeats.map((seat) => {
                    const isSelected = selectedIds.includes(seat.id)
                    const status = isSelected ? 'selected' : seat.status
                    const disabled =
                      seat.status === 'booked' || seat.status === 'locked'

                    return (
                      <button
                        key={seat.id}
                        type="button"
                        disabled={disabled}
                        title={`${seat.id} · ${tierLabels[seat.tier]} · ₹${seat.price}${
                          seat.status === 'locked' ? ' · held by another user' : ''
                        }`}
                        onClick={() => onToggle(seat.id)}
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded text-[10px] font-medium sm:h-8 sm:w-8 sm:text-xs ${statusStyles[status]}`}
                        aria-label={`Seat ${seat.id}`}
                      >
                        {seat.col}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-muted">
        Amber seats are temporarily held by other users (demo).
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-muted sm:gap-4">
        {legend.map(([key, color]) => (
          <span key={key} className="flex items-center gap-1.5 capitalize">
            <span className={`h-3 w-3 rounded-sm border ${color}`} />
            {key}
          </span>
        ))}
      </div>
    </div>
  )
}
