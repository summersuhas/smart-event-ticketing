import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import OrganizerRoute from './components/OrganizerRoute'
import { AuthProvider, useAuth } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'
import { EventsProvider } from './context/EventsContext'
import MainLayout from './layouts/MainLayout'
import BookingHistory from './pages/BookingHistory'
import Checkout from './pages/Checkout'
import EventDetails from './pages/EventDetails'
import Events from './pages/Events'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import TicketView from './pages/TicketView'
import OrganizerAnalytics from './pages/organizer/Analytics'
import CreateEvent from './pages/organizer/CreateEvent'
import OrganizerDashboard from './pages/organizer/Dashboard'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="checkout/:eventId"
          element={
            <ProtectedRoute>
              <Checkout />
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
              <BookingHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="tickets/:bookingId"
          element={
            <ProtectedRoute>
              <TicketView />
            </ProtectedRoute>
          }
        />
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <EventsProvider>
        <BookingProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </BookingProvider>
      </EventsProvider>
    </AuthProvider>
  )
}
