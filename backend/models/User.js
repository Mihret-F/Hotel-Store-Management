const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Admin', 'Storekeeper', 'User' ,'Manager', 'FoodBeverage', 'Barman', 'Kitchen'],
        required: true,
    },
}, {
    timestamps: true,  // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('User', userSchema);
