const express = require("express");
const { adminLogin, registerUser } = require("../controllers/adminController");

const router = express.Router();

router.post("/login", adminLogin);
router.post("/register", registerUser);

module.exports = router;
