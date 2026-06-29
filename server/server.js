const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Database Connection
require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

// Create Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Librarium Backend Running...");
});

// Server Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});