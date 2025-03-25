const StoreRequest = require('../models/StoreRequest');  // Importing the StoreRequest model

// Add a new store request
exports.addStoreRequest = async (req, res) => {
  try {
    const { itemName, quantity, price, owner, remark, requestedBy, role, status } = req.body;

    if (!itemName || !quantity || !price || !owner || !requestedBy || !role) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    const newStoreRequest = new StoreRequest({
      itemName,
      quantity,
      price,  // ✅ Ensure price is saved
      owner,  // ✅ Ensure owner is saved
      remark,
      requestedBy,
      role: role || "Unknown",
      status: status || "Pending",
    });

    await newStoreRequest.save();
    res.status(201).json({ message: "Store request created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all store requests
exports.getAllItemRequests = async (req, res) => {
  try {
    const storeRequests = await StoreRequest.find();
    res.json(storeRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get store request by ID
exports.getItemRequestById = async (req, res) => {
  try {
    const storeRequest = await StoreRequest.findById(req.params.id);
    if (!storeRequest) {
      return res.status(404).json({ message: "Store request not found" });
    }
    res.json(storeRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update store request status
exports.updateItemRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedRequest = await StoreRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Store request not found" });
    }

    res.json({ message: "Store request status updated", request: updatedRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete store request
exports.deleteItemRequest = async (req, res) => {
  try {
    const deletedRequest = await StoreRequest.findByIdAndDelete(req.params.id);
    if (!deletedRequest) {
      return res.status(404).json({ message: "Store request not found" });
    }

    res.json({ message: "Store request deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
