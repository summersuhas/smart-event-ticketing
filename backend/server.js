const express = require("express");
const dotenv = require("dotenv");

// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "🎟️ Backend working successfully!",
  });
});

// PORT
const PORT = process.env.PORT || 8000;

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});