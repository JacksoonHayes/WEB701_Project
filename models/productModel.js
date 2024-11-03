const mongoose = require('mongoose');

// User Schema for MongoDB
const ProductSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    baseWeight: {
        type: String
    },
    discount: {
        type: Number
    },
    image: {
        type: String
    },
    stock : {
        type: Number
    }
});

const Product = mongoose.model('Product', ProductSchema); // Create a model from the schema
module.exports = Product;
