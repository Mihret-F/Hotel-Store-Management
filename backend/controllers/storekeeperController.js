const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const ItemRequest = require("../models/ItemRequest");

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

// 🔹 Storekeeper Login
exports.loginStorekeeper = async (req, res) => {
  const { username, password } = req.body;
  console.log("Login Attempt:", username, password);

  try {
    // Find storekeeper by username and role
    const storekeeper = await User.findOne({ username, role: "Storekeeper" });
    console.log("Storekeeper from DB:", storekeeper);

    if (!storekeeper) {
      console.log("User not found or not a storekeeper");
      return res.status(400).json({ message: "User not found or not a storekeeper!" });
    }

    console.log("Stored Password:", storekeeper.password);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, storekeeper.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Generate token
    const token = jwt.sign(
      { id: storekeeper._id, role: "Storekeeper" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Login successful for", username);
    res.json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};





// 🔹 Create Item Request
exports.createItemRequest = async (req, res) => {
  const { itemName, quantity, requestedBy } = req.body;
  if (!itemName || !quantity || !requestedBy) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const newRequest = new ItemRequest({ itemName, quantity, requestedBy, status: "Pending" });
    await newRequest.save();
    res.status(201).json({ message: "Request submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error creating request", error: error.message });
  }
};

// 🔹 Fetch All Requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await ItemRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching requests", error: error.message });
  }
};

// 🔹 Approve or Reject Request
exports.updateRequestStatus = async (req, res) => {
  const { requestId, status } = req.body;

  if (!requestId || !status) {
    return res.status(400).json({ message: "Request ID and status are required!" });
  }

  try {
    const request = await ItemRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found!" });

    request.status = status;
    await request.save();

    res.json({ message: `Request ${status} successfully!` });
  } catch (error) {
    res.status(500).json({ message: "Error updating request status", error: error.message });
  }
};
