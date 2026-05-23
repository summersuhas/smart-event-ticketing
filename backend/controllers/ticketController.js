const Ticket = require("../models/Ticket");
const Event = require("../models/Event");

// @desc    Book a ticket
// @route   POST /api/tickets
const bookTicket = async (req, res) => {
  try {
    const { eventId, buyerName, buyerEmail, quantity } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    if (event.availableTickets < quantity) {
      return res.status(400).json({ success: false, message: "Not enough tickets available" });
    }

    const totalPrice = event.price * quantity;

    const ticket = await Ticket.create({
      event: eventId,
      buyerName,
      buyerEmail,
      quantity,
      totalPrice,
    });

    // Decrease available tickets
    event.availableTickets -= quantity;
    await event.save();

    res.status(201).json({ success: true, data: ticket });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all tickets for an event
// @route   GET /api/tickets/:eventId
const getTicketsByEvent = async (req, res) => {
  try {
    const tickets = await Ticket.find({ event: req.params.eventId }).populate("event", "title date");
    res.status(200).json({ success: true, count: tickets.length, data: tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { bookTicket, getTicketsByEvent };