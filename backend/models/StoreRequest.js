const mongoose = require("mongoose");

// Store Request Schema
const storeRequestSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },  // ✅ Add price field
  owner: { type: String, required: true },  // ✅ Add owner field
  remark: { type: String },  // ✅ Optional remark
  requestedBy: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("StoreRequest", storeRequestSchema);
