const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
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
      enum: ["vip", "premium", "standard"],
      default: "standard",
    },

    price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "held", "booked"],
      default: "available",
    },

    heldBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    heldUntil: {
      type: Date,
      default: null,
    },
  },
  {
    _id: true,
  }
);

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
    },

    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    seatConfig: {
      rows: {
        type: Number,
        default: 8,
      },

      cols: {
        type: Number,
        default: 10,
      },

      pricing: {
        vip: {
          type: Number,
          default: 1999,
        },

        premium: {
          type: Number,
          default: 999,
        },

        standard: {
          type: Number,
          default: 499,
        },
      },
    },

    seats: {
      type: [seatSchema],
      default: [],
    },

    totalTickets: {
      type: Number,
      default: 0,
    },

    availableTickets: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.pre("save", function () {
  this.totalTickets = this.seats.length;

  this.availableTickets = this.seats.filter(
    (seat) => seat.status === "available"
  ).length;
});

module.exports = mongoose.model(
  "Event",
  eventSchema
);