import axiosInstance from "./axiosInstance";

export const holdSeats = async (eventId, seatIds) => {
  const response = await axiosInstance.post("/api/bookings/hold", { eventId, seatIds });
  return response.data;
};

export const confirmBooking = async (eventId, seatIds, paymentResult) => {
  const response = await axiosInstance.post("/api/bookings/confirm", {
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
  const response = await axiosInstance.get("/api/bookings/my-bookings");
  return response.data;
};

export const fetchBookingById = async (id) => {
  const response = await axiosInstance.get(`/api/bookings/${id}`);
  return response.data;
};