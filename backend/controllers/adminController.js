const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Dummy Admin Credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";
const SECRET_KEY = "your_secret_key"; // Change this in production

// Admin Login
exports.adminLogin = (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ message: "Admin authenticated successfully!", token });
  } else {
    return res.status(401).json({ message: "Invalid admin credentials!" });
  }
};

// Register New User
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, username, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken!" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.log("Registration Error:", error); // 🔹 Add this for debugging
    res.status(500).json({ message: "Server error!", error });
  }
};
