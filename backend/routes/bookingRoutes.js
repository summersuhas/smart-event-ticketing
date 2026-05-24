const express = require("express");
const router = express.Router();
const {
  holdSeats,
  confirmBooking,
  cancelBooking,
  getMyBookings,
  getBookingById,
} = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");
 
// All booking routes require authentication
router.use(protect);
 
router.post("/hold", holdSeats);
router.post("/confirm", confirmBooking);
router.post("/cancel", cancelBooking);
router.get("/my-bookings", getMyBookings);
router.get("/:id", getBookingById);
 
module.exports = router;