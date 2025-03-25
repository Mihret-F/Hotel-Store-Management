const Item = require("../models/Item");

// Add a new item
// Add a new item
// Item Controller: addItem
// Item Controller: addItem
exports.addItem = async (req, res) => {
    try {
      let { name, price, stock, remark, role } = req.body;
  
      if (!name || !price || !stock || !role) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      if (isNaN(price) || isNaN(stock)) {
        return res.status(400).json({ message: "Price and Stock must be numbers" });
      }
  
      name = name.toLowerCase(); // Normalize item name to avoid duplication issues
  
      // Check if item already exists with the same name & role
      let existingItem = await Item.findOne({ name, role });
  
      if (existingItem) {
        // Update stock instead of creating a new item
        existingItem.stock += parseInt(stock);
        existingItem.price = price; // Optional: Update price if needed
        existingItem.remark = remark;
        await existingItem.save();
  
        return res.status(200).json({ message: "Stock updated!", item: existingItem });
      }
  
      // Create a new item if not found
      const newItem = new Item({ name, price, stock, remark, role });
      await newItem.save();
      res.status(201).json({ message: "New item registered!", item: newItem });
  
    } catch (error) {
      console.error("Error adding item:", error);
      res.status(500).json({ message: error.message || "Server error" });
    }
  };
  exports.updateItem = async (req, res) => {
    try {
      const updatedItem = await Item.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // ✅ Ensures we return the updated document
      );
  
      if (!updatedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
  
      res.json({ message: "Item updated successfully!", item: updatedItem });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
    
  


// Get all items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single item by ID
exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an item
exports.updateItem = async (req, res) => {
    try {
        await Item.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: "Item updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an item
exports.deleteItem = async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
