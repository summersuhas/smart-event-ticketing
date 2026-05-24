import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { fetchMyBookings } from "../api/bookingApi";

import { useBooking } from "../context/BookingContext";

const STATUS_COLORS = {
  confirmed: {
    bg: "#dcfce7",
    text: "#16a34a",
  },

  pending: {
    bg: "#fef9c3",
    text: "#ca8a04",
  },

  cancelled: {
    bg: "#fee2e2",
    text: "#dc2626",
  },
};

const PAYMENT_COLORS = {
  paid: "#16a34a",

  unpaid: "#ca8a04",

  failed: "#dc2626",
};

const BookingsPage = () => {
  const navigate =
    useNavigate();

  const { cancel } =
    useBooking();

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const [
    cancelling,
    setCancelling,
  ] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data =
          await fetchMyBookings();

        setBookings(data.data);
      } catch (err) {
        setError(
          err.response?.data
            ?.message ||
            "Failed to load bookings"
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleCancel = async (
    bookingId
  ) => {
    if (
      !window.confirm(
        "Cancel this booking?"
      )
    ) {
      return;
    }

    setCancelling(bookingId);

    const result =
      await cancel(bookingId);

    if (result.success) {
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId
            ? {
                ...b,

                bookingStatus:
                  "cancelled",

                paymentStatus:
                  "paid",
              }
            : b
        )
      );
    }

    setCancelling(null);
  };

  // Loading
  if (loading) {
    return (
      <div style={styles.center}>
        Loading your
        bookings...
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

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div style={styles.center}>
          <p>No bookings yet.</p>

          <button
            style={styles.btn}
            onClick={() =>
              navigate("/events")
            }
          >
            Browse Events
          </button>
        </div>
      ) : (
        <div style={styles.list}>
          {bookings.map(
            (booking) => {
              const event =
                booking.event;

              const statusStyle =
                STATUS_COLORS[
                  booking
                    .bookingStatus
                ] ||
                STATUS_COLORS.pending;

              const eventDate =
                new Date(
                  event.date
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",

                    month: "short",

                    year: "numeric",
                  }
                );

              return (
                <div
                  key={booking._id}
                  style={
                    styles.card
                  }
                >
                  {event.image && (
                    <img
                      src={
                        event.image
                      }
                      alt={
                        event.title
                      }
                      style={
                        styles.image
                      }
                    />
                  )}

                  <div
                    style={
                      styles.body
                    }
                  >
                    <div
                      style={
                        styles.cardHeader
                      }
                    >
                      <h3
                        style={
                          styles.eventTitle
                        }
                      >
                        {
                          event.title
                        }
                      </h3>

                      <span
                        style={{
                          ...styles.statusBadge,

                          background:
                            statusStyle.bg,

                          color:
                            statusStyle.text,
                        }}
                      >
                        {booking.bookingStatus.toUpperCase()}
                      </span>
                    </div>

                    <p
                      style={
                        styles.meta
                      }
                    >
                      📅{" "}
                      {eventDate}
                    </p>

                    <p
                      style={
                        styles.meta
                      }
                    >
                      📍{" "}
                      {
                        event.location
                      }
                    </p>

                    <div
                      style={
                        styles.seatRow
                      }
                    >
                      {booking.seats.map(
                        (
                          seat,
                          i
                        ) => (
                          <span
                            key={i}
                            style={
                              styles.seatChip
                            }
                          >
                            {
                              seat.seatNumber
                            }
                          </span>
                        )
                      )}
                    </div>

                    <div
                      style={
                        styles.footer
                      }
                    >
                      <div>
                        <span
                          style={
                            styles.amount
                          }
                        >
                          ₹
                          {
                            booking.totalAmount
                          }
                        </span>

                        <span
                          style={{
                            ...styles.payStatus,

                            color:
                              PAYMENT_COLORS[
                                booking
                                  .paymentStatus
                              ],
                          }}
                        >
                          {" "}
                          ·{" "}
                          {
                            booking.paymentStatus
                          }
                        </span>
                      </div>

                      <div
                        style={
                          styles.footerActions
                        }
                      >
                        {booking.bookingStatus ===
                          "confirmed" && (
                          <>
                            <button
                              style={
                                styles.viewBtn
                              }
                              onClick={() =>
                                navigate(
                                  `/bookings/${booking._id}`
                                )
                              }
                            >
                              View
                              Ticket
                            </button>

                            <button
                              style={
                                styles.cancelBtn
                              }
                              onClick={() =>
                                handleCancel(
                                  booking._id
                                )
                              }
                              disabled={
                                cancelling ===
                                booking._id
                              }
                            >
                              {cancelling ===
                              booking._id
                                ? "Cancelling..."
                                : "Cancel"}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  page: {
    maxWidth: "720px",

    margin: "40px auto",

    padding: "0 20px",

    fontFamily:
      "sans-serif",
  },

  center: {
    display: "flex",

    flexDirection:
      "column",

    alignItems: "center",

    padding: "60px 20px",

    gap: "16px",

    color: "#718096",
  },

  heading: {
    fontSize: "28px",

    fontWeight: "800",

    color: "#1a202c",

    marginBottom: "24px",
  },

  list: {
    display: "flex",

    flexDirection:
      "column",

    gap: "16px",
  },

  card: {
    border:
      "1px solid #e2e8f0",

    borderRadius: "12px",

    overflow: "hidden",

    background: "#fff",

    boxShadow:
      "0 2px 8px rgba(0,0,0,0.05)",
  },

  image: {
    width: "100%",

    height: "140px",

    objectFit: "cover",
  },

  body: {
    padding: "16px",
  },

  cardHeader: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems:
      "flex-start",

    marginBottom: "8px",
  },

  eventTitle: {
    fontSize: "17px",

    fontWeight: "700",

    color: "#1a202c",

    margin: 0,
  },

  statusBadge: {
    fontSize: "10px",

    fontWeight: "700",

    padding: "3px 8px",

    borderRadius: "20px",

    letterSpacing:
      "0.05em",

    whiteSpace: "nowrap",
  },

  meta: {
    fontSize: "13px",

    color: "#718096",

    margin: "3px 0",
  },

  seatRow: {
    display: "flex",

    flexWrap: "wrap",

    gap: "6px",

    margin: "10px 0",
  },

  seatChip: {
    background: "#eef2ff",

    color: "#6366f1",

    fontSize: "12px",

    fontWeight: "700",

    padding: "3px 8px",

    borderRadius: "4px",
  },

  footer: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    borderTop:
      "1px solid #f0f0f0",

    paddingTop: "12px",

    marginTop: "8px",
  },

  amount: {
    fontSize: "18px",

    fontWeight: "800",

    color: "#1a202c",
  },

  payStatus: {
    fontSize: "13px",

    fontWeight: "600",
  },

  footerActions: {
    display: "flex",

    gap: "8px",
  },

  viewBtn: {
    padding: "7px 14px",

    background: "#6366f1",

    color: "#fff",

    border: "none",

    borderRadius: "6px",

    fontSize: "13px",

    fontWeight: "700",

    cursor: "pointer",
  },

  cancelBtn: {
    padding: "7px 14px",

    background:
      "transparent",

    color: "#dc2626",

    border:
      "1px solid #dc2626",

    borderRadius: "6px",

    fontSize: "13px",

    fontWeight: "700",

    cursor: "pointer",
  },

  btn: {
    padding: "10px 20px",

    background: "#6366f1",

    color: "#fff",

    border: "none",

    borderRadius: "8px",

    fontWeight: "700",

    cursor: "pointer",
  },
};

export default BookingsPage;