const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.registerUser);
router.post("/login", userController.login);
router.get("/", userController.getUsers);  // ✅ Fixed here
//router.get("/users", getUsers); // 👈 This is the route to fetch all users
//router.get("/:id", userController.getUserById);
module.exports = router;
