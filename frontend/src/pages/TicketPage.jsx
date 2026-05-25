import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import QRCode from "react-qr-code";

import { fetchBookingById } from "../api/bookingApi";

const TicketPage = () => {
  const { bookingId } =
    useParams();

  const navigate =
    useNavigate();

  const [booking, setBooking] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data =
          await fetchBookingById(
            bookingId
          );

        setBooking(data.data);
      } catch (err) {
        setError(
          err.response?.data
            ?.message ||
            "Failed to load ticket"
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [bookingId]);

  // Loading
  if (loading) {
    return (
      <div style={styles.center}>
        Loading ticket...
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div style={styles.center}>
        ⚠️ {error}
      </div>
    );
  }

  // No booking
  if (!booking) {
    return null;
  }

  const event = booking.event;

  const eventDate =
    new Date(
      event.date
    ).toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  const statusColor =
    booking.bookingStatus ===
    "confirmed"
      ? "#16a34a"
      : "#dc2626";

  return (
    <div style={styles.page}>
      <div
        style={styles.ticket}
        id="ticket"
      >
        {/* Header */}
        <div style={styles.header}>
          <p style={styles.platform}>
            🎟️ EventHub
          </p>

          <span
            style={{
              ...styles.statusBadge,
              background:
                statusColor,
            }}
          >
            {booking.bookingStatus.toUpperCase()}
          </span>
        </div>

        {/* Event Info */}
        <div
          style={styles.eventInfo}
        >
          <h2
            style={styles.eventTitle}
          >
            {event.title}
          </h2>

          <p style={styles.meta}>
            📅 {eventDate}
          </p>

          <p style={styles.meta}>
            📍 {event.venue}
          </p>
        </div>

        <div style={styles.divider} />

        {/* Seats */}
        <div style={styles.section}>
          <p style={styles.label}>
            SEATS
          </p>

          <div
            style={styles.seatGrid}
          >
            {booking.seats.map(
              (seat, i) => (
                <div
                  key={i}
                  style={
                    styles.seatChip
                  }
                >
                  <span
                    style={
                      styles.seatNum
                    }
                  >
                    {
                      seat.seatNumber
                    }
                  </span>

                  <span
                    style={
                      styles.seatTier
                    }
                  >
                    {seat.tier}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        <div style={styles.divider} />

        {/* Payment */}
        <div style={styles.row}>
          <div>
            <p style={styles.label}>
              TOTAL PAID
            </p>

            <p style={styles.amount}>
              ₹
              {
                booking.totalAmount
              }
            </p>
          </div>

          <div
            style={{
              textAlign: "right",
            }}
          >
            <p style={styles.label}>
              PAYMENT
            </p>

            <p
              style={{
                ...styles.amount,

                color:
                  booking.paymentStatus ===
                  "paid"
                    ? "#16a34a"
                    : "#dc2626",
              }}
            >
              {booking.paymentStatus.toUpperCase()}
            </p>
          </div>
        </div>

        <div style={styles.divider} />

        {/* Ticket ID + QR */}
        <div style={styles.row}>
          <div>
            <p style={styles.label}>
              BOOKING ID
            </p>

            <p
              style={
                styles.ticketId
              }
            >
              {booking.ticketId ||
                booking._id}
            </p>
          </div>

          {/* QR Code */}
          <div style={styles.qr}>
            <QRCode
              size={64}
              value={JSON.stringify({
                bookingId:
                  booking.ticketId ||
                  booking._id,

                event:
                  event.title,

                seats:
                  booking.seats.map(
                    (s) =>
                      s.seatNumber
                  ),
              })}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        <button
          style={styles.ghost}
          onClick={() =>
            navigate(
              "/bookings"
            )
          }
        >
          All Bookings
        </button>

        <button
          style={styles.btn}
          onClick={() =>
            window.print()
          }
        >
          Download / Print
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    maxWidth: "520px",

    margin: "40px auto",

    padding: "0 20px",

    fontFamily:
      "sans-serif",
  },

  center: {
    textAlign: "center",

    padding: "60px 20px",

    fontFamily:
      "sans-serif",

    color: "#718096",
  },

  ticket: {
    background: "#fff",

    border:
      "2px solid #e2e8f0",

    borderRadius: "16px",

    overflow: "hidden",

    boxShadow:
      "0 4px 20px rgba(0,0,0,0.08)",
  },

  header: {
    background: "#1a202c",

    padding: "16px 20px",

    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",
  },

  platform: {
    color: "#fff",

    fontWeight: "800",

    fontSize: "16px",

    margin: 0,
  },

  statusBadge: {
    color: "#fff",

    fontSize: "11px",

    fontWeight: "700",

    padding: "4px 10px",

    borderRadius: "20px",

    letterSpacing: "0.05em",
  },

  eventInfo: {
    padding: "20px 20px 16px",
  },

  eventTitle: {
    fontSize: "22px",

    fontWeight: "800",

    color: "#1a202c",

    margin: "0 0 8px",
  },

  meta: {
    fontSize: "14px",

    color: "#718096",

    margin: "4px 0",
  },

  divider: {
    borderTop:
      "1px dashed #e2e8f0",

    margin: "0 20px",
  },

  section: {
    padding: "16px 20px",
  },

  label: {
    fontSize: "10px",

    fontWeight: "700",

    letterSpacing: "0.1em",

    color: "#9ca3af",

    margin: "0 0 8px",
  },

  seatGrid: {
    display: "flex",

    flexWrap: "wrap",

    gap: "8px",
  },

  seatChip: {
    background: "#f1f5f9",

    borderRadius: "6px",

    padding: "6px 12px",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",
  },

  seatNum: {
    fontWeight: "800",

    fontSize: "15px",

    color: "#1a202c",
  },

  seatTier: {
    fontSize: "10px",

    color: "#6366f1",

    fontWeight: "600",

    textTransform:
      "uppercase",
  },

  row: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    padding: "16px 20px",
  },

  amount: {
    fontSize: "20px",

    fontWeight: "800",

    color: "#1a202c",

    margin: "4px 0 0",
  },

  ticketId: {
    fontSize: "13px",

    fontWeight: "700",

    color: "#1a202c",

    fontFamily:
      "monospace",

    margin: "4px 0 0",
  },

  qr: {
    width: "82px",

    height: "82px",

    background: "#fff",

    borderRadius: "8px",

    padding: "8px",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    border:
      "1px solid #e5e7eb",
  },

  actions: {
    display: "flex",

    gap: "12px",

    marginTop: "20px",
  },

  btn: {
    flex: 1,

    padding: "12px",

    background: "#6366f1",

    color: "#fff",

    border: "none",

    borderRadius: "8px",

    fontWeight: "700",

    fontSize: "15px",

    cursor: "pointer",
  },

  ghost: {
    flex: 1,

    padding: "12px",

    background:
      "transparent",

    color: "#6366f1",

    border:
      "2px solid #6366f1",

    borderRadius: "8px",

    fontWeight: "700",

    fontSize: "15px",

    cursor: "pointer",
  },
};

export default TicketPage;