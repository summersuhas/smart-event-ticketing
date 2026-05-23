import useEvents from "../hooks/useEvents";
import EventCard from "../components/EventCard";

const EventsPage = () => {
  const { events, loading, error } = useEvents();

  if (loading) {
    return (
      <div style={styles.center}>
        <div style={styles.spinner} />
        <p style={styles.loadingText}>Fetching events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.center}>
        <p style={styles.errorBox}>⚠️ {error}</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div style={styles.center}>
        <p style={styles.empty}>No events found. Check back soon!</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Upcoming Events</h1>
      <p style={styles.subheading}>{events.length} events available</p>
      <div style={styles.grid}>
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "sans-serif",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#1a202c",
    margin: "0 0 6px",
  },
  subheading: {
    color: "#718096",
    fontSize: "15px",
    marginBottom: "32px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "300px",
    fontFamily: "sans-serif",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #e2e8f0",
    borderTop: "4px solid #6366f1",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: {
    marginTop: "14px",
    color: "#718096",
    fontSize: "15px",
  },
  errorBox: {
    background: "#fff5f5",
    border: "1px solid #feb2b2",
    color: "#c53030",
    padding: "16px 24px",
    borderRadius: "10px",
    fontSize: "15px",
  },
  empty: {
    color: "#a0aec0",
    fontSize: "16px",
  },
};

export default EventsPage;