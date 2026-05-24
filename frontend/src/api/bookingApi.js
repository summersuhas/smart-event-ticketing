import axiosInstance from "./axiosInstance";

export const holdSeats = async (eventId, seatIds) => {
  const response = await axiosInstance.post("/bookings/hold", { eventId, seatIds });
  return response.data;
};

export const confirmBooking = async (eventId, seatIds, paymentResult) => {
  const response = await axiosInstance.post("/bookings/confirm", {
    eventId,
    seatIds,
    paymentResult,
  });
  return response.data;
};

export const cancelBooking = async (bookingId) => {
  const response = await axiosInstance.post("/bookings/cancel", { bookingId });
  return response.data;
};

export const fetchMyBookings = async () => {
  const response = await axiosInstance.get("/bookings/my-bookings");
  return response.data;
};

export const fetchBookingById = async (id) => {
  const response = await axiosInstance.get(`/bookings/${id}`);
  return response.data;
};