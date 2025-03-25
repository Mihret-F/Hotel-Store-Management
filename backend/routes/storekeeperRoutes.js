const express = require("express");
const { loginStorekeeper, createItemRequest, getAllRequests, updateRequestStatus } = require("../controllers/storekeeperController");

const router = express.Router();

// Ensure these functions exist in storekeeperController.js
router.post("/login", loginStorekeeper);
router.post("/store-requests", createItemRequest);
router.get("/requests", getAllRequests);
router.put("/request/status", updateRequestStatus);

module.exports = router;
