import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useBooking } from "../context/BookingContext";

const CheckoutPage = () => {
  const { eventId } =
    useParams();

  const navigate =
    useNavigate();

  const {
    selectedSeats,
    totalPrice,
    hold,
    confirm,
    loading,
    error,
    heldUntil,
    clearSelection,
  } = useBooking();

  const [step, setStep] =
    useState("summary");

  const [
    bookingResult,
    setBookingResult,
  ] = useState(null);

  const [timeLeft, setTimeLeft] =
    useState("");

  // Countdown Timer
  useEffect(() => {
    if (!heldUntil) return;

    const interval =
      setInterval(() => {
        const diff =
          new Date(
            heldUntil
          ).getTime() -
          Date.now();

        if (diff <= 0) {
          clearInterval(
            interval
          );

          clearSelection();

          navigate(
            `/events/${eventId}`
          );

          return;
        }

        const minutes =
          Math.floor(
            diff / 1000 / 60
          );

        const seconds =
          Math.floor(
            (diff / 1000) %
              60
          );

        setTimeLeft(
          `${String(
            minutes
          ).padStart(
            2,
            "0"
          )}:${String(
            seconds
          ).padStart(
            2,
            "0"
          )}`
        );
      }, 1000);

    return () =>
      clearInterval(interval);
  }, [
    heldUntil,
    navigate,
    eventId,
    clearSelection,
  ]);

  // No seats selected
  if (
    selectedSeats.length === 0 &&
    step === "summary"
  ) {
    return (
      <div style={styles.center}>
        <p style={styles.empty}>
          No seats selected. Go
          back and choose your
          seats.
        </p>

        <button
          style={styles.btn}
          onClick={() =>
            navigate(
              `/events/${eventId}`
            )
          }
        >
          Back to Event
        </button>
      </div>
    );
  }

  // Hold seats before payment
  const handleProceedToPayment =
    async () => {
      const result =
        await hold(eventId);

      if (result.success) {
        setStep("payment");

        // Auto simulate payment success
        setTimeout(async () => {
          const paymentResult =
            await confirm(
              eventId,
              {
                success: true,
              }
            );

          setBookingResult(
            paymentResult
          );

          setStep("result");
        }, 1800);
      }
    };

  // ─────────────────────────────
  // SUMMARY STEP
  // ─────────────────────────────
  if (step === "summary") {
    return (
      <div style={styles.page}>
        <h2 style={styles.heading}>
          Booking Summary
        </h2>

        <div style={styles.seatList}>
          {selectedSeats.map(
            (seat) => (
              <div
                key={seat._id}
                style={
                  styles.seatRow
                }
              >
                <span
                  style={
                    styles.seatBadge
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
                  {seat.tier.toUpperCase()}
                </span>

                <span
                  style={
                    styles.seatPrice
                  }
                >
                  ₹{seat.price}
                </span>
              </div>
            )
          )}
        </div>

        <div style={styles.total}>
          <span>
            Total (
            {
              selectedSeats.length
            }{" "}
            seats)
          </span>

          <span
            style={
              styles.totalAmount
            }
          >
            ₹{totalPrice}
          </span>
        </div>

        {error && (
          <p style={styles.error}>
            {error}
          </p>
        )}

        <div style={styles.actions}>
          <button
            style={styles.ghost}
            onClick={() =>
              navigate(
                `/events/${eventId}`
              )
            }
          >
            Change Seats
          </button>

          <button
            style={styles.btn}
            onClick={
              handleProceedToPayment
            }
            disabled={loading}
          >
            {loading
              ? "Holding seats..."
              : "Proceed to Payment"}
          </button>
        </div>
      </div>
    );
  }

  // ─────────────────────────────
  // PAYMENT STEP
  // ─────────────────────────────
  if (step === "payment") {
    return (
      <div style={styles.page}>
        <h2 style={styles.heading}>
          Processing Payment
        </h2>

        <div style={styles.paymentBox}>
          <p style={styles.payLabel}>
            Amount to pay
          </p>

          <p style={styles.payAmount}>
            ₹{totalPrice}
          </p>

          <p style={styles.payNote}>
            Please wait while we
            confirm your booking...
          </p>

          {timeLeft && (
            <div
              style={
                styles.timer
              }
            >
              Seats reserved for{" "}
              {timeLeft}
            </div>
          )}

          <div
            style={
              styles.loader
            }
          >
            ⏳
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────
  // RESULT STEP
  // ─────────────────────────────
  if (step === "result") {
    const success =
      bookingResult?.success &&
      bookingResult?.booking;

    return (
      <div style={styles.page}>
        <div style={styles.resultBox}>
          <span
            style={
              styles.resultIcon
            }
          >
            {success
              ? "✅"
              : "❌"}
          </span>

          <h2 style={styles.heading}>
            {success
              ? "Booking Confirmed!"
              : "Payment Failed"}
          </h2>

          {success &&
            bookingResult.booking && (
              <>
                <p
                  style={
                    styles.ticketId
                  }
                >
                  Ticket ID:{" "}
                  <strong>
                    {
                      bookingResult
                        .booking
                        .ticketId
                    }
                  </strong>
                </p>

                <p
                  style={
                    styles.payNote
                  }
                >
                  {
                    bookingResult
                      .booking
                      .seats.length
                  }{" "}
                  seat(s) booked · ₹
                  {
                    bookingResult
                      .booking
                      .totalAmount
                  }{" "}
                  paid
                </p>

                <button
                  style={
                    styles.btn
                  }
                  onClick={() =>
                    navigate(
                      `/bookings/${bookingResult.booking._id}`
                    )
                  }
                >
                  View Ticket
                </button>
              </>
            )}

          {!success && (
            <>
              <p
                style={
                  styles.payNote
                }
              >
                Payment could not
                be completed.
                Please try again.
              </p>

              <button
                style={styles.btn}
                onClick={() =>
                  navigate(
                    `/events/${eventId}`
                  )
                }
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
};

const styles = {
  page: {
    maxWidth: "540px",
    margin: "40px auto",
    padding: "0 20px",
    fontFamily:
      "sans-serif",
  },

  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "60px 20px",
    fontFamily:
      "sans-serif",
    gap: "16px",
  },

  heading: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#1a202c",
    marginBottom: "24px",
  },

  seatList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },

  seatRow: {
    display: "flex",
    alignItems: "center",
    justifyContent:
      "space-between",
    padding: "10px 14px",
    background: "#f8fafc",
    borderRadius: "8px",
    border:
      "1px solid #e2e8f0",
  },

  seatBadge: {
    fontWeight: "700",
    fontSize: "15px",
    color: "#1a202c",
  },

  seatTier: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#6366f1",
    background: "#eef2ff",
    padding: "2px 8px",
    borderRadius: "4px",
  },

  seatPrice: {
    fontWeight: "700",
    color: "#1a202c",
  },

  total: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    padding: "14px 0",
    borderTop:
      "2px solid #e2e8f0",
    marginBottom: "24px",
    fontSize: "16px",
    color: "#4a5568",
  },

  totalAmount: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#1a202c",
  },

  actions: {
    display: "flex",
    gap: "12px",
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

  error: {
    color: "#c53030",
    background: "#fff5f5",
    border:
      "1px solid #feb2b2",
    padding: "10px 14px",
    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "14px",
  },

  paymentBox: {
    background: "#f8fafc",
    border:
      "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "32px",
    textAlign: "center",
    marginBottom: "24px",
  },

  payLabel: {
    color: "#718096",
    fontSize: "14px",
    margin: "0 0 8px",
  },

  payAmount: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#1a202c",
    margin: "0 0 12px",
  },

  payNote: {
    color: "#718096",
    fontSize: "13px",
    margin: 0,
  },

  timer: {
    marginTop: "18px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#dc2626",
  },

  loader: {
    marginTop: "24px",
    fontSize: "40px",
  },

  resultBox: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },

  resultIcon: {
    fontSize: "52px",
  },

  ticketId: {
    color: "#4a5568",
    fontSize: "15px",
  },

  empty: {
    color: "#718096",
    fontSize: "16px",
  },
};

export default CheckoutPage;