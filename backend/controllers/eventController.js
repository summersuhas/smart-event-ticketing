const Event = require("../models/Event");

// @desc    Get all events
// @route   GET /api/events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .select("-seats")
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(
      req.params.id
    );

    console.log("FULL EVENT:", event);

    console.log(
      "EVENT SEATS:",
      event?.seats
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create a new event
// @route   POST /api/events
const createEvent = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const {
      title,
      description,
      date,
      venue,
      image,


      rows,
      cols,

      vip,
      premium,
      standard,

      seats,
    } = req.body;

    const event = await Event.create({
      title,

      description,

      date,

      venue,

      image,

      organizerId,

      seatConfig: {
        rows,

        cols,

        pricing: {
          vip,

          premium,

          standard,
        },
      },

      seats,

      totalTickets:
        seats?.length || 0,

      availableTickets:
        seats?.filter(
          (seat) =>
            seat.status ===
            "available"
        ).length || 0,
    });

    console.log(
      "SAVED EVENT:",
      event
    );

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
const updateEvent = async (
  req,
  res
) => {
  try {
    const event =
      await Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
const deleteEvent = async (
  req,
  res
) => {
  try {
    const event =
      await Event.findByIdAndDelete(
        req.params.id
      );

    if (!event) {
      return res.status(404).json({
        success: false,
        message:
          "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};