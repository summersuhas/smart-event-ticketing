import { useBooking } from "../context/BookingContext";

const TIER_COLORS = {
  vip: {
    bg: "#7c3aed",
    selected: "#4c1d95",
    text: "#fff",
    label: "VIP",
  },

  premium: {
    bg: "#0891b2",
    selected: "#164e63",
    text: "#fff",
    label: "Premium",
  },

  standard: {
    bg: "#16a34a",
    selected: "#14532d",
    text: "#fff",
    label: "Standard",
  },
};

const STATUS_STYLES = {
  booked: {
    bg: "#d1d5db",
    text: "#6b7280",
    cursor: "not-allowed",
  },

  held: {
    bg: "#fbbf24",
    text: "#78350f",
    cursor: "not-allowed",
  },
};

const SeatMap = ({ seats }) => {
  const {
    selectedSeats,
    toggleSeat,
  } = useBooking();

  if (
    !seats ||
    seats.length === 0
  ) {
    return (
      <p
        style={{
          color: "#6b7280",
          textAlign: "center",
        }}
      >
        No seats available
      </p>
    );
  }

  // Group seats by rows
  const rows = seats.reduce(
    (acc, seat) => {
      if (!acc[seat.row]) {
        acc[seat.row] = [];
      }

      acc[seat.row].push(seat);

      return acc;
    },
    {}
  );

  const isSelected = (seat) =>
    selectedSeats.some(
      (s) =>
        String(s._id) ===
        String(seat._id)
    );

  const handleClick = (seat) => {
    if (
      seat.status === "booked" ||
      seat.status === "held"
    ) {
      return;
    }

    toggleSeat(seat);
  };

  return (
    <div style={styles.wrapper}>
      {/* Legend */}
      <div style={styles.legend}>
        {Object.entries(
          TIER_COLORS
        ).map(([tier, colors]) => (
          <span
            key={tier}
            style={styles.legendItem}
          >
            <span
              style={{
                ...styles.legendDot,
                background:
                  colors.bg,
              }}
            />

            {colors.label}
          </span>
        ))}

        <span style={styles.legendItem}>
          <span
            style={{
              ...styles.legendDot,
              background:
                "#d1d5db",
            }}
          />

          Booked
        </span>

        <span style={styles.legendItem}>
          <span
            style={{
              ...styles.legendDot,
              background:
                "#fbbf24",
            }}
          />

          Held
        </span>

        <span style={styles.legendItem}>
          <span
            style={{
              ...styles.legendDot,
              background:
                "#fff",

              border:
                "2px solid #1a202c",
            }}
          />

          Selected
        </span>
      </div>

      {/* Stage */}
      <div style={styles.stage}>
        STAGE
      </div>

      {/* Seat Grid */}
      <div style={styles.grid}>
        {Object.entries(rows).map(
          ([row, rowSeats]) => (
            <div
              key={row}
              style={styles.row}
            >
              <span
                style={
                  styles.rowLabel
                }
              >
                {row}
              </span>

              {rowSeats
                .sort(
                  (a, b) =>
                    a.col - b.col
                )
                .map((seat) => {
                  const selected =
                    isSelected(
                      seat
                    );

                  const tier =
                    TIER_COLORS[
                      seat.tier
                    ] ||
                    TIER_COLORS.standard;

                  const statusStyle =
                    STATUS_STYLES[
                      seat.status
                    ];

                  const bg =
                    statusStyle
                      ? statusStyle.bg
                      : selected
                      ? tier.selected
                      : tier.bg;

                  const color =
                    statusStyle
                      ? statusStyle.text
                      : tier.text;

                  const cursor =
                    statusStyle
                      ? statusStyle.cursor
                      : "pointer";

                  return (
                    <button
                      key={seat._id}
                      type="button"
                      disabled={
                        seat.status ===
                          "booked" ||
                        seat.status ===
                          "held"
                      }
                      title={`${seat.seatNumber} — ${seat.tier} — ₹${seat.price}`}
                      onClick={() =>
                        handleClick(
                          seat
                        )
                      }
                      style={{
                        ...styles.seat,

                        background:
                          bg,

                        color,

                        cursor,

                        outline:
                          selected
                            ? "3px solid #1a202c"
                            : "none",

                        transform:
                          selected
                            ? "scale(1.15)"
                            : "scale(1)",
                      }}
                    >
                      {seat.col}
                    </button>
                  );
                })}
            </div>
          )
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    fontFamily:
      "sans-serif",

    padding: "16px",
  },

  legend: {
    display: "flex",

    gap: "16px",

    flexWrap: "wrap",

    marginBottom: "16px",

    fontSize: "13px",

    color: "#374151",
  },

  legendItem: {
    display: "flex",

    alignItems: "center",

    gap: "6px",
  },

  legendDot: {
    width: "14px",

    height: "14px",

    borderRadius: "3px",

    display: "inline-block",
  },

  stage: {
    textAlign: "center",

    background: "#e5e7eb",

    color: "#6b7280",

    fontSize: "12px",

    fontWeight: "700",

    letterSpacing: "0.1em",

    padding: "8px",

    borderRadius: "6px",

    marginBottom: "24px",
  },

  grid: {
    display: "flex",

    flexDirection: "column",

    gap: "8px",
  },

  row: {
    display: "flex",

    alignItems: "center",

    gap: "6px",
  },

  rowLabel: {
    width: "20px",

    fontWeight: "700",

    fontSize: "13px",

    color: "#374151",
  },

  seat: {
    width: "32px",

    height: "32px",

    borderRadius: "4px",

    border: "none",

    fontSize: "11px",

    fontWeight: "600",

    transition:
      "transform 0.1s, outline 0.1s",
  },
};

export default SeatMap;