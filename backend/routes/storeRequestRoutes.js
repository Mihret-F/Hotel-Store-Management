const express = require("express");
const router = express.Router();
const storeRequestController = require("../controllers/storeRequestController");  // Importing storeRequestController

// Add a new store request
router.post("/", storeRequestController.addStoreRequest);  // Using addStoreRequest from storeRequestController

// Get all store requests
router.get("/", storeRequestController.getAllItemRequests);  // Correct function name

// Get store request by ID
router.get("/:id", storeRequestController.getItemRequestById);  // Correct function name

// Update store request status
router.put("/:id", storeRequestController.updateItemRequestStatus);  // Correct function name

// Delete store request
router.delete("/:id", storeRequestController.deleteItemRequest);  // Correct function name

module.exports = router;
