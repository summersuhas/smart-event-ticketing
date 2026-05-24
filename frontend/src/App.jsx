import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import OrganizerRoute from "./components/OrganizerRoute";

import {
  AuthProvider,
  useAuth,
} from "./context/AuthContext";

import { BookingProvider } from "./context/BookingContext";

import { EventsProvider } from "./context/EventsContext";

import { ToastProvider } from "./context/ToastContext";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";

import Events from "./pages/Events";

import EventDetails from "./pages/EventDetails";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import Profile from "./pages/Profile";

import NotFound from "./pages/NotFound";

// NEW BOOKING FLOW PAGES
import CheckoutPage from "./pages/CheckoutPage";

import BookingsPage from "./pages/BookingsPage";

import TicketPage from "./pages/TicketPage";

// ORGANIZER PAGES
import OrganizerAnalytics from "./pages/organizer/Analytics";

import CreateEvent from "./pages/organizer/CreateEvent";

import OrganizerDashboard from "./pages/organizer/Dashboard";

function ProtectedRoute({
  children,
}) {
  const { isAuthenticated } =
    useAuth();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        element={<MainLayout />}
      >
        {/* PUBLIC */}
        <Route
          index
          element={<Home />}
        />

        <Route
          path="events"
          element={<Events />}
        />

        <Route
          path="events/:id"
          element={
            <EventDetails />
          }
        />

        <Route
          path="login"
          element={<Login />}
        />

        <Route
          path="signup"
          element={<Signup />}
        />

        {/* PROTECTED */}
        <Route
          path="checkout/:eventId"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="bookings"
          element={
            <ProtectedRoute>
              <BookingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="bookings/:bookingId"
          element={
            <ProtectedRoute>
              <TicketPage />
            </ProtectedRoute>
          }
        />

        {/* ORGANIZER */}
        <Route
          path="organizer"
          element={
            <OrganizerRoute>
              <OrganizerDashboard />
            </OrganizerRoute>
          }
        />

        <Route
          path="organizer/events/new"
          element={
            <OrganizerRoute>
              <CreateEvent />
            </OrganizerRoute>
          }
        />

        <Route
          path="organizer/analytics"
          element={
            <OrganizerRoute>
              <OrganizerAnalytics />
            </OrganizerRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <EventsProvider>
          <BookingProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </BookingProvider>
        </EventsProvider>
      </AuthProvider>
    </ToastProvider>
  );
}