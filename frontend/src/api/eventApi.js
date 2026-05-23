import axiosInstance from "./axiosInstance";

export const fetchAllEvents = async () => {
  const response = await axiosInstance.get("/events");
  return response.data;
};