const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true, 
    unique: true // Ensures no duplicate items
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 // Prevents negative prices
  },
  stock: { 
    type: Number, 
    required: true, 
    min: 0, // Prevents negative stock
    default: 0 // Ensures stock starts at 0 if not provided
  },
  remark: { 
    type: String, 
    trim: true, 
    default: "" // Ensures a default empty string instead of undefined
  },
  role: { 
    type: String, 
    enum: ['bar', 'kitchen'], 
    required: true 
  },
}, { timestamps: true }); // Automatically adds createdAt & updatedAt fields

module.exports = mongoose.model("Item", itemSchema);
