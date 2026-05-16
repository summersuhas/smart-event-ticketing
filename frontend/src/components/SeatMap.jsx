const statusStyles = {
  available:
    'bg-zinc-700/80 hover:bg-accent/80 hover:ring-2 hover:ring-accent cursor-pointer',
  selected: 'bg-accent ring-2 ring-accent-soft cursor-pointer',
  locked: 'bg-warning/80 cursor-not-allowed',
  booked: 'bg-zinc-800 text-zinc-600 cursor-not-allowed line-through',
}

const tierLabels = { vip: 'VIP', premium: 'Premium', standard: 'Standard' }

export default function SeatMap({ seats, selectedIds, onToggle, layout }) {
  return (
    <div className="w-full">
      <div className="mx-auto mb-8 max-w-md rounded-full bg-gradient-to-b from-accent/40 to-transparent px-6 py-2 text-center text-xs font-medium uppercase tracking-widest text-zinc-400">
        Stage
      </div>

      <div className="overflow-x-auto">
        <div
          className="mx-auto inline-grid gap-1.5 sm:gap-2"
          style={{
            gridTemplateColumns: `repeat(${layout.cols}, minmax(0, 1fr))`,
          }}
        >
          {seats.map((seat) => {
            const isSelected = selectedIds.includes(seat.id)
            const status = isSelected ? 'selected' : seat.status
            const disabled =
              seat.status === 'booked' || seat.status === 'locked'

            return (
              <button
                key={seat.id}
                type="button"
                disabled={disabled}
                title={`${seat.id} · ${tierLabels[seat.tier]} · ₹${seat.price}`}
                onClick={() => onToggle(seat.id)}
                className={`flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-medium transition sm:h-8 sm:w-8 sm:text-xs ${statusStyles[status]}`}
              >
                {seat.col}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-zinc-400">
        {[
          ['available', 'bg-zinc-700'],
          ['selected', 'bg-accent'],
          ['locked', 'bg-warning'],
          ['booked', 'bg-zinc-800'],
        ].map(([key, color]) => (
          <span key={key} className="flex items-center gap-2 capitalize">
            <span className={`h-3 w-3 rounded-sm ${color}`} />
            {key}
          </span>
        ))}
      </div>
    </div>
  )
}
