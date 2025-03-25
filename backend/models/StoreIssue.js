const mongoose = require("mongoose");

const storeIssueSchema = new mongoose.Schema({
  item_id: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  requested_by: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, default: "pending" }, // Default status is 'pending'
  issued_at: { type: Date, default: Date.now }, // Automatically store issue date
});


module.exports = mongoose.model("StoreIssue", storeIssueSchema);
