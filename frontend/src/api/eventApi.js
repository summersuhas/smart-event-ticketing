import axiosInstance from "./axiosInstance";

export const fetchAllEvents =
  async () => {
    const response =
      await axiosInstance.get(
        "/api/events"
      );

    return response.data;
  };

export const fetchEventById =
  async (id) => {
    const response =
      await axiosInstance.get(
        `/api/events/${id}`
      );

    return response.data.data;
  };