const mongoose = require('mongoose');

// User Schema for MongoDB
const UserSchema = mongoose.Schema({
    name: { // Name of the user
        type: String
    },
    email: { // Email of the user
        type: String,
        required: true
    },
    password: { // Password of the user
        type: String,
        required: true
    },
    isAdmin: { // Admin status of the user
        type: Boolean,
        default: false
    },
    role: { // Role of the user
        type: String,
        required: true,
    },  
    vouchers: { // Number of vouchers the user has
        type: Number,
        default: 0
    },
});

// Static method to find user by ID
UserSchema.statics.getUserById = async function(id) {
    try {
        const user = await this.findById(id);  // Use async/await to wait for the result
        return user;
    } catch (error) {
        throw error;  // Let the caller handle the error
    }
};

const User = mongoose.model('User', UserSchema); // Create a model from the schema
module.exports = User;
