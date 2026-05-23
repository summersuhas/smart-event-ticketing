import { useState, useEffect } from "react";
import { fetchAllEvents } from "../api/eventApi";

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchAllEvents();
        setEvents(data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  return { events, loading, error };
};

export default useEvents;