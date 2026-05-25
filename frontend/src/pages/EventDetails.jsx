import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import SeatMap from "../components/SeatMap";

import { fetchEventById } from "../api/eventApi";

function EventDetails() {
  console.log(
    "EVENT DETAILS COMPONENT LOADED"
  );
  const { id } = useParams();
  console.log("PARAMS ID:", id);

  const navigate = useNavigate();

  const [event, setEvent] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const data =
          await fetchEventById(id);

        setEvent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="mt-10 text-center text-2xl">
        Loading...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="mt-10 text-center text-2xl">
        Event not found
      </div>
    );
  }

  console.log("EVENT:", event);
  console.log("SEATS:", event.seats);

  return (
    <div className="mx-auto max-w-5xl p-6">
      <img
        src={
          event.image ||
          event.poster ||
          event.thumbnail ||
          "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"
        }
        alt={event.title}
        className="mb-6 h-96 w-full rounded-xl object-cover"
      />

      <h1 className="mb-4 text-4xl font-bold">
        {event.title}
      </h1>

      <p className="mb-2 text-lg text-gray-600">
        📍{" "}
        {event.venue ||
          "Location unavailable"}
      </p>

      <p className="mb-2 text-lg text-gray-600">
        🎟️ ₹{event.price}
      </p>

      <p className="mb-4 text-gray-500">
        📅{" "}
        {new Date(
          event.date
        ).toLocaleDateString()}
      </p>

      <p className="mb-6 leading-7 text-gray-700">
        {event.description ||
          "No description available."}
      </p>

      {/* Seat Selection */}
      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">
          Select Your Seats
        </h2>

        {Array.isArray(
          event.seats
        ) ? (
          <SeatMap
            seats={event.seats}
          />
        ) : (
          <div className="mt-6 rounded-lg bg-yellow-100 p-4 text-yellow-800">
            Seats are not available
            for this event yet.
          </div>
        )}
      </div>

      {/* Checkout Button */}
      <div className="mt-8">
        <button
          onClick={() =>
            navigate(
              `/checkout/${event._id}`
            )
          }
          className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default EventDetails;