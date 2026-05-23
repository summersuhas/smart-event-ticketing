const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const connectDB = require('./config/db')

const authRoutes = require('./routes/authRoutes')
const eventRoutes = require('./routes/eventRoutes')
const ticketRoutes = require('./routes/ticketRoutes')

const app = express()

// Connect Database
connectDB()

// Middleware
app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)

app.use('/api/events', eventRoutes)

app.use('/api/tickets', ticketRoutes)

// Test Route
app.get('/', (req, res) => {
  res.json({
    message:
      '🎟️ Backend working successfully!',
  })
})

// PORT
const PORT = process.env.PORT || 8000

// Start Server
app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  )
})