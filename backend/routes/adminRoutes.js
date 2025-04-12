const express = require("express");
const { adminLogin, registerUser } = require("../controllers/adminController");
const User = require("../models/User"); // Assuming User model is here

const router = express.Router();

// Existing login and register routes
router.post("/login", adminLogin);
router.post("/register", registerUser);

// DELETE user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error!", error });
  }
});

// PUT update user
router.put("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, username, password, role } = req.body;

    // Hash the new password if it's provided
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, username, password: hashedPassword, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({ message: "User updated successfully!", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error!", error });
  }
});

module.exports = router;
