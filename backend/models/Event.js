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
  { _id: true }
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

    location: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "music",
        "sports",
        "tech",
        "art",
        "food",
        "other",
      ],
      default: "other",
    },

    totalTickets: {
      type: Number,
      required: true,
      min: 1,
    },

    availableTickets: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    seatConfig: {
      rows: {
        type: [String],
        default: [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
        ],
      },

      cols: {
        type: Number,
        default: 10,
      },

      tierMap: {
        type: Map,
        of: String,
        default: {},
      },

      pricing: {
        vip: {
          type: Number,
          default: 1499,
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

    seats: [seatSchema],
  },
  {
    timestamps: true,
  }
);

eventSchema.pre("save", function (next) {
  this.availableTickets = this.seats.filter(
    (seat) => seat.status === "available"
  ).length;

  next();
});

module.exports = mongoose.model(
  "Event",
  eventSchema
);