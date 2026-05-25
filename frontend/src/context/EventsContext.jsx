import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import axiosInstance from "../api/axiosInstance";

const EventsContext = createContext(null);

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/api/events");

        // Backend response:
        // { success: true, count: 1, data: [...] }

        setEvents(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Get single event by ID
  const getEvent = useCallback(
    (id) => events.find((e) => e._id === id),
    [events],
  );

  // Add new event
  const addEvent = useCallback(
    async (form) => {
      try {
        const response =
          await axiosInstance.post(
            "/api/events",
            form
          );
  
        const newEvent =
          response.data.data;
  
        setEvents((prev) => [
          newEvent,
          ...prev,
        ]);
  
        return newEvent;
      } catch (error) {
        console.error(
          "Failed to create event:",
          error
        );
  
        throw error;
      }
    },
    []
  );

  const value = useMemo(
    () => ({
      events,
      getEvent,
      addEvent,
      isLoading,
    }),
    [events, getEvent, addEvent, isLoading],
  );

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const ctx = useContext(EventsContext);

  if (!ctx) {
    throw new Error("useEvents must be used within EventsProvider");
  }

  return ctx;
}
