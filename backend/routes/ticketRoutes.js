const express = require("express");
const router = express.Router();
const { bookTicket, getTicketsByEvent } = require("../controllers/ticketController");

router.route("/").post(bookTicket);
router.route("/:eventId").get(getTicketsByEvent);

module.exports = router;