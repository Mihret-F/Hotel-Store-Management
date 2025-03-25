const bcrypt = require("bcryptjs");  // Use bcryptjs, not bcrypt

  // Make sure this is here
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, username, password, role } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
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
        console.error("Error during user registration:", error);  // Log the error
        res.status(500).json({ message: "Server error!", error: error.message });
    }
};

// User login
exports.login = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) return res.status(401).json({ message: "User not found!" });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ message: "Invalid credentials!" });

        // ✅ Ensure role matches the stored role in DB
        if (user.role !== role) {
            return res.status(403).json({ message: "Incorrect role selected!" });
        }

        // Generate token with role
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1d" }
        );

        res.json({ token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: error.message });
    }
};



// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
