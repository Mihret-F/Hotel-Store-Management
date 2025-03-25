const StoreIssue = require("../models/StoreIssue");
const Item = require("../models/Item");


exports.handleStoreIssue = async (req, res) => {

  try {
    const { item_id, requested_by, stock } = req.body;

    if (!item_id || !requested_by || !stock) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Fetch item and update stock
    const item = await Item.findById(item_id);
    if (!item) return res.status(404).json({ error: "Item not found." });

    if (item.stock < stock) {
      return res.status(400).json({ error: "Insufficient stock." });
    }

    item.stock -= stock;
    await item.save();

    res.status(200).json({ message: "Request processed successfully.", updatedItem: item });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// module.exports = { storeIssueController };
