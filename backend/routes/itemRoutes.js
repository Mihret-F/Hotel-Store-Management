const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

// Add a new item
router.post("/", itemController.addItem);

// Get all items
router.get("/", itemController.getAllItems);

// Get a single item by ID
router.get("/:id", itemController.getItemById);

// Update an item
router.put("/:id", itemController.updateItem);

// Delete an item
router.delete("/:id", itemController.deleteItem);

module.exports = router;
