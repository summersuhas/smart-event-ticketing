const mongoose = require("mongoose");

const bookedSeatSchema =
  new mongoose.Schema(
    {
      seatId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },

      seatNumber: {
        type: String,
        required: true,
      },

      row: {
        type: String,
        required: true,
      },

      col: {
        type: Number,
        required: true,
      },

      tier: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },
    },
    { _id: false }
  );

const bookingSchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
      },

      seats: {
        type: [bookedSeatSchema],

        required: true,

        validate: [
          (arr) => arr.length > 0,
          "At least one seat is required",
        ],
      },

      totalAmount: {
        type: Number,
        required: true,
      },

      bookingStatus: {
        type: String,

        enum: [
          "pending",
          "confirmed",
          "cancelled",
        ],

        default: "pending",
      },

      paymentStatus: {
        type: String,

        enum: [
          "unpaid",
          "paid",
          "failed",
        ],

        default: "unpaid",
      },

      ticketId: {
        type: String,
        unique: true,
        sparse: true,
      },
    },
    {
      timestamps: true,
    }
  );

bookingSchema.methods.generateTicketId =
  function () {
    const prefix = "TKT";

    const timestamp = Date.now()
      .toString(36)
      .toUpperCase();

    const random = Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase();

    this.ticketId =
      `${prefix}-${timestamp}-${random}`;
  };

bookingSchema.index({ user: 1 });

bookingSchema.index({ event: 1 });

bookingSchema.index({ ticketId: 1 });

module.exports = mongoose.model(
  "Booking",
  bookingSchema
);