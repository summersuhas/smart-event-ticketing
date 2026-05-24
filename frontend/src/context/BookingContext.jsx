import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  holdSeats,
  confirmBooking,
  cancelBooking,
} from "../api/bookingApi";

const BookingContext =
  createContext();

export const BookingProvider = ({
  children,
}) => {
  const [
    selectedSeats,
    setSelectedSeats,
  ] = useState([]);

  const [heldSeats, setHeldSeats] =
    useState([]);

  const [heldUntil, setHeldUntil] =
    useState(null);

  const [
    currentBooking,
    setCurrentBooking,
  ] = useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  // Toggle seat selection
  const toggleSeat = (seat) => {
    // Prevent selecting unavailable seats
    if (
      seat.status === "booked" ||
      seat.status === "held"
    ) {
      return;
    }

    setSelectedSeats((prev) => {
      const exists = prev.find(
        (s) =>
          String(s._id) ===
          String(seat._id)
      );

      if (exists) {
        return prev.filter(
          (s) =>
            String(s._id) !==
            String(seat._id)
        );
      }

      return [...prev, seat];
    });
  };

  // Clear current selection
  const clearSelection = () => {
    setSelectedSeats([]);

    setHeldSeats([]);

    setHeldUntil(null);
  };

  // Hold seats
  const hold = async (
    eventId
  ) => {
    setLoading(true);

    setError(null);

    try {
      const seatIds =
        selectedSeats.map(
          (seat) => seat._id
        );

      const data =
        await holdSeats(
          eventId,
          seatIds
        );

      setHeldSeats(data.seats);

      setHeldUntil(
        new Date(data.heldUntil)
      );

      return {
        success: true,
      };
    } catch (err) {
      const message =
        err.response?.data
          ?.message ||
        "Failed to hold seats";

      setError(message);

      return {
        success: false,
        message,
      };
    } finally {
      setLoading(false);
    }
  };

  // Confirm booking
  const confirm = async (
    eventId,
    paymentResult
  ) => {
    setLoading(true);

    setError(null);

    try {
      const seatIds =
        selectedSeats.map(
          (seat) => seat._id
        );

      const data =
        await confirmBooking(
          eventId,
          seatIds,
          paymentResult
        );

      setCurrentBooking(
        data.data
      );

      clearSelection();

      return {
        success: true,
        booking: data.data,
      };
    } catch (err) {
      const message =
        err.response?.data
          ?.message ||
        "Booking failed";

      setError(message);

      return {
        success: false,
        message,
      };
    } finally {
      setLoading(false);
    }
  };

  // Cancel booking
  const cancel = async (
    bookingId
  ) => {
    setLoading(true);

    setError(null);

    try {
      await cancelBooking(
        bookingId
      );

      return {
        success: true,
      };
    } catch (err) {
      const message =
        err.response?.data
          ?.message ||
        "Cancellation failed";

      setError(message);

      return {
        success: false,
        message,
      };
    } finally {
      setLoading(false);
    }
  };

  // Calculate total
  const totalPrice =
    selectedSeats.reduce(
      (sum, seat) =>
        sum + seat.price,
      0
    );

  return (
    <BookingContext.Provider
      value={{
        selectedSeats,

        heldSeats,

        heldUntil,

        currentBooking,

        loading,

        error,

        totalPrice,

        toggleSeat,

        clearSelection,

        hold,

        confirm,

        cancel,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context =
    useContext(BookingContext);

  if (!context) {
    throw new Error(
      "useBooking must be used within BookingProvider"
    );
  }

  return context;
};