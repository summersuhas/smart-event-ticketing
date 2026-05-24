import axiosInstance from "./axiosInstance";

export const fetchAllEvents =
  async () => {
    const response =
      await axiosInstance.get(
        "/events"
      );

    return response.data;
  };

export const fetchEventById =
  async (id) => {
    const response =
      await axiosInstance.get(
        `/events/${id}`
      );

    return response.data.data;
  };