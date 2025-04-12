require("dotenv").config(); // Load .env first
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const adminRoutes = require("./routes/adminRoutes");
const storekeeperRoutes = require("./routes/storekeeperRoutes");
const itemRoutes = require("./routes/itemRoutes");
const userRoutes = require("./routes/authRoutes");
const storeRequests = require("./routes/storeRequestRoutes");
const storeIssueRoutes = require("./routes/storeIssueRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/hotel_management")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Routes
app.use("/api/admin", adminRoutes);  // Admin-specific routes
app.use("/api/storekeeper", storekeeperRoutes);  // Storekeeper-specific routes
app.use("/api/items", itemRoutes);  // Item routes
app.use("/api/store-requests/store-request", storeRequests);  // Store request routes
app.use("/api/store-issues", storeIssueRoutes);  // Store issue routes
app.use("/api/admin/:id/delete",adminRoutes );
// User routes
app.use("/api/users", userRoutes);  // User-related routes (e.g., login, registration)
app.use("/api/admin/users", userRoutes);  // Admin users route

// Optionally, if you need a dynamic route for users by ID (e.g., update user):
app.use("/api/users/:id", userRoutes);  // Handle specific user by ID, for actions like update

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
