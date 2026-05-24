const Booking = require("../models/Booking");

const Event = require("../models/Event");

const HOLD_DURATION_MINUTES = 10;

const holdSeats = async (req, res) => {
  try {
    const { eventId, seatIds } = req.body;

    const userId = req.user._id;

    if (
      !eventId ||
      !seatIds ||
      seatIds.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "eventId and seatIds are required",
      });
    }

    const event =
      await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const now = new Date();

    const holdExpiry = new Date(
      now.getTime() +
        HOLD_DURATION_MINUTES *
          60 *
          1000
    );

    const unavailable = [];

    for (const seatId of seatIds) {
      const seat =
        event.seats.id(seatId);

      if (!seat) {
        unavailable.push({
          seatId,
          reason: "Seat not found",
        });

        continue;
      }

      // Release expired holds
      if (
        seat.status === "held" &&
        seat.heldUntil &&
        seat.heldUntil < now
      ) {
        seat.status = "available";

        seat.heldBy = null;

        seat.heldUntil = null;
      }

      if (seat.status === "booked") {
        unavailable.push({
          seatId,
          seatNumber:
            seat.seatNumber,
          reason:
            "Already booked",
        });
      } else if (
        seat.status === "held" &&
        String(seat.heldBy) !==
          String(userId)
      ) {
        unavailable.push({
          seatId,
          seatNumber:
            seat.seatNumber,
          reason:
            "Currently held by another user",
        });
      }
    }

    if (unavailable.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          "One or more seats are unavailable",
        unavailable,
      });
    }

    // Apply holds
    for (const seatId of seatIds) {
      const seat =
        event.seats.id(seatId);

      seat.status = "held";

      seat.heldBy = userId;

      seat.heldUntil = holdExpiry;
    }

    await event.save();

    const heldSeats = seatIds.map(
      (id) => {
        const seat =
          event.seats.id(id);

        return {
          seatId: seat._id,

          seatNumber:
            seat.seatNumber,

          row: seat.row,

          col: seat.col,

          tier: seat.tier,

          price: seat.price,
        };
      }
    );

    res.status(200).json({
      success: true,
      message:
        "Seats held successfully",
      heldUntil: holdExpiry,
      seats: heldSeats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────────
// POST /api/bookings/confirm
// Confirm booking after payment
// ─────────────────────────────────────────────
const confirmBooking = async (
  req,
  res
) => {
  try {
    const {
      eventId,
      seatIds,
      paymentResult,
    } = req.body;

    const userId = req.user._id;

    const event =
      await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const now = new Date();

    const seatsToBook = [];

    for (const seatId of seatIds) {
      const seat =
        event.seats.id(seatId);

      if (!seat) {
        return res.status(400).json({
          success: false,
          message: `Seat ${seatId} not found`,
        });
      }

      if (
        seat.status === "booked"
      ) {
        return res.status(409).json({
          success: false,
          message: `Seat ${seat.seatNumber} already booked`,
        });
      }

      if (
        seat.status !== "held" ||
        String(seat.heldBy) !==
          String(userId)
      ) {
        return res.status(409).json({
          success: false,
          message: `Seat ${seat.seatNumber} is no longer held for you`,
        });
      }

      if (
        !seat.heldUntil ||
        seat.heldUntil < now
      ) {
        return res.status(409).json({
          success: false,
          message: `Hold expired for seat ${seat.seatNumber}. Please select again.`,
        });
      }

      seatsToBook.push({
        seatId: seat._id,

        seatNumber:
          seat.seatNumber,

        row: seat.row,

        col: seat.col,

        tier: seat.tier,

        price: seat.price,
      });
    }

    const totalAmount =
      seatsToBook.reduce(
        (sum, seat) =>
          sum + seat.price,
        0
      );

    // Fake payment simulation
    const paymentSuccess =
      paymentResult?.success !==
      false;

    const paymentStatus =
      paymentSuccess
        ? "paid"
        : "failed";

    const bookingStatus =
      paymentSuccess
        ? "confirmed"
        : "cancelled";

    // Update seat status
    for (const seatId of seatIds) {
      const seat =
        event.seats.id(seatId);

      if (paymentSuccess) {
        seat.status = "booked";
      } else {
        seat.status =
          "available";
      }

      seat.heldBy = null;

      seat.heldUntil = null;
    }

    if (paymentSuccess) {
      event.availableTickets =
        Math.max(
          0,
          event.availableTickets -
            seatIds.length
        );
    }

    await event.save();

    const booking =
      new Booking({
        user: userId,

        event: eventId,

        seats: seatsToBook,

        totalAmount,

        bookingStatus,

        paymentStatus,
      });

    if (paymentSuccess) {
      booking.generateTicketId();
    }

    await booking.save();

    const populatedBooking =
      await booking.populate(
        "event",
        "title date location image"
      );

    res.status(201).json({
      success: true,

      message: paymentSuccess
        ? "Booking confirmed"
        : "Payment failed — booking cancelled",

      data: populatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────────
// POST /api/bookings/cancel
// Cancel booking and release seats
// ─────────────────────────────────────────────
const cancelBooking = async (
  req,
  res
) => {
  try {
    const { bookingId } =
      req.body;

    const userId = req.user._id;

    const booking =
      await Booking.findById(
        bookingId
      );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message:
          "Booking not found",
      });
    }

    if (
      String(booking.user) !==
      String(userId)
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Not authorized to cancel this booking",
      });
    }

    if (
      booking.bookingStatus ===
      "cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Booking already cancelled",
      });
    }

    const event =
      await Event.findById(
        booking.event
      );

    if (event) {
      for (const bookedSeat of booking.seats) {
        const seat =
          event.seats.id(
            bookedSeat.seatId
          );

        if (seat) {
          seat.status =
            "available";

          seat.heldBy = null;

          seat.heldUntil =
            null;
        }
      }

      event.availableTickets +=
        booking.seats.length;

      await event.save();
    }

    booking.bookingStatus =
      "cancelled";

    booking.paymentStatus =
      "paid";

    await booking.save();

    res.status(200).json({
      success: true,
      message:
        "Booking cancelled",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────────
// GET /api/bookings/my-bookings
// Get all bookings of current user
// ─────────────────────────────────────────────
const getMyBookings = async (
  req,
  res
) => {
  try {
    const bookings =
      await Booking.find({
        user: req.user._id,
      })
        .populate(
          "event",
          "title date location image"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────────
// GET /api/bookings/:id
// Get booking by ID
// ─────────────────────────────────────────────
const getBookingById = async (
  req,
  res
) => {
  try {
    const booking =
      await Booking.findById(
        req.params.id
      )
        .populate(
          "event",
          "title date location image category"
        )
        .populate(
          "user",
          "name email"
        );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message:
          "Booking not found",
      });
    }

    if (
      String(booking.user._id) !==
      String(req.user._id)
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Not authorized",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  holdSeats,
  confirmBooking,
  cancelBooking,
  getMyBookings,
  getBookingById,
};