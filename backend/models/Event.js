const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Event description is required"],
    },

    date: {
      type: Date,
      required: [true, "Event date is required"],
    },

    location: {
      type: String,
      required: [true, "Event location is required"],
    },

    totalTickets: {
      type: Number,
      required: [true, "Total ticket count is required"],
      min: 1,
    },

    availableTickets: {
      type: Number,
    },

    price: {
      type: Number,
      required: [true, "Ticket price is required"],
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Automatically set available tickets
eventSchema.pre("save", function () {
  if (this.isNew) {
    this.availableTickets = this.totalTickets;
  }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;