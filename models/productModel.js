const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String, // Add location for pickup
        required: true
    },
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1563746098251-d35aef196e83?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    stock: {
        type: Number,
        required: true
    },
    donorId: {
        type: mongoose.Schema.Types.ObjectId, // To track the donor who added the listing
        ref: 'User',
        required: true
    }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
