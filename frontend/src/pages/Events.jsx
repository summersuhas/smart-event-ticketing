import { useMemo, useState } from "react";

import EventCard from "../components/EventCard";

import LoadingSpinner from "../components/LoadingSpinner";

import { useEvents } from "../context/EventsContext";

export default function Events() {
  const { events, isLoading } =
    useEvents();

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("all");

  const [sortBy, setSortBy] =
    useState("upcoming");

  // Filter + Sort Events
  const filteredEvents =
    useMemo(() => {
      let filtered = [...events];

      // Search
      if (search.trim()) {
        filtered =
          filtered.filter(
            (event) =>
              event.title
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
          );
      }

      // Category
      if (
        category !== "all"
      ) {
        filtered =
          filtered.filter(
            (event) =>
              event.category ===
              category
          );
      }

      // Sort
      if (
        sortBy ===
        "upcoming"
      ) {
        filtered.sort(
          (a, b) =>
            new Date(a.date) -
            new Date(b.date)
        );
      }

      if (
        sortBy === "latest"
      ) {
        filtered.sort(
          (a, b) =>
            new Date(b.date) -
            new Date(a.date)
        );
      }

      if (
        sortBy ===
        "highestPrice"
      ) {
        filtered.sort(
          (a, b) =>
            (b.price || 0) -
            (a.price || 0)
        );
      }

      return filtered;
    }, [
      events,
      search,
      category,
      sortBy,
    ]);

  return (
    <div className="page-wrap">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">
            All Events
          </h1>

          <p className="mt-2 text-muted">
            Browse live events
            from the backend
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {/* Search */}
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
        >
          <option value="all">
            All Categories
          </option>

          <option value="music">
            Music
          </option>

          <option value="sports">
            Sports
          </option>

          <option value="tech">
            Tech
          </option>

          <option value="art">
            Art
          </option>

          <option value="food">
            Food
          </option>

          <option value="other">
            Other
          </option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value
            )
          }
          className="rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
        >
          <option value="upcoming">
            Upcoming
          </option>

          <option value="latest">
            Latest
          </option>

          <option value="highestPrice">
            Highest Price
          </option>
        </select>
      </div>

      {/* Loading */}
      {isLoading ? (
        <LoadingSpinner label="Loading events..." />
      ) : filteredEvents.length ===
        0 ? (
        <div className="mt-10 text-center">
          <h2 className="text-lg font-medium">
            No events found
          </h2>

          <p className="mt-2 text-sm text-muted">
            Try changing your
            filters or search
            query.
          </p>
        </div>
      ) : (
        <>
          {/* Count */}
          <p className="mt-6 text-sm text-muted">
            Showing{" "}
            {
              filteredEvents.length
            }{" "}
            event(s)
          </p>

          {/* Events Grid */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map(
              (event) => (
                <EventCard
                  key={
                    event._id
                  }
                  event={event}
                />
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}