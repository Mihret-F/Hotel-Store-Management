const mongoose = require('mongoose');

// Item Request Schema
const itemRequestSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number, // Added Price
        required: true,
    },
    owner: {
        type: String, // Added Owner
        required: true,
    },
    remark: {
        type: String, // Added Remark
        default: '',
    },
    requestedBy: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('ItemRequest', itemRequestSchema);
