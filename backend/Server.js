require("dotenv").config(); // Load .env first
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const adminRoutes = require("./routes/adminRoutes");
const storekeeperRoutes = require("./routes/storekeeperRoutes");
const itemRoutes = require("./routes/itemRoutes");
const userRoutes = require("./routes/authRoutes");
const storeRequests = require("./routes/storeRequestRoutes"); // ✅ Fixed variable name
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
app.use("/api/admin", adminRoutes);
app.use("/api/storekeeper", storekeeperRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/users", userRoutes);

app.use("/api/items", itemRoutes);
app.use("/api/store-requests/store-request", storeRequests); // ✅ Fixed the reference
app.use("/api/store-issues", storeIssueRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
