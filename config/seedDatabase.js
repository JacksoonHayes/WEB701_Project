const mongoose = require('mongoose');
const Product = require('../models/productModel');
require('dotenv').config();
const connectDB = require('../config/database');

const seedProducts = [
    {
        name: "Mix & Match Berries",
        description: "A custom berry assortment of your choice. Perfect for smoothies, snacks, or baking!",
        price: 9.99,
        baseWeight: "500g",
        image: "https://images.unsplash.com/photo-1563746098251-d35aef196e83?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        stock: 50,
    },
    {
        name: "Strawberries",
        description: "Delicious, handpicked strawberries.",
        price: 4.99,
        baseWeight: "250g",
        image: "https://images.unsplash.com/photo-1527777309916-b59323b01809?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        stock: 100
    },
    {
        name: "Blueberries",
        description: "Sweet and tangy blueberries.",
        price: 5.99,
        baseWeight: "250g",
        image: "https://images.unsplash.com/photo-1425934398893-310a009a77f9?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        stock: 75
    },
    {
        name: "Raspberries",
        description: "Bright, juicy raspberries with a perfect balance of sweetness and tartness.",
        price: 6.49,
        baseWeight: "250g",
        image: "https://images.unsplash.com/photo-1425934398893-310a009a77f9?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        stock: 80
    },
    {
        name: "Blackberries",
        description: "Dark and rich blackberries, freshly picked for a sweet and slightly earthy flavor.",
        price: 5.49,
        baseWeight: "250g",
        image: "https://images.unsplash.com/photo-1425934398893-310a009a77f9?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        stock: 60
    },
    {
        name: "Goji Berries",
        description: "Dried goji berries known for their antioxidants and vibrant red color.",
        price: 7.99,
        baseWeight: "250g",
        image: "https://images.unsplash.com/photo-1425934398893-310a009a77f9?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        stock: 50
    },
    {
        name: "Golden Berries",
        description: "Tangy golden berries, also known as Inca berries, rich in Vitamin C and fiber.",
        price: 8.99,
        baseWeight: "250g",
        image: "https://images.unsplash.com/photo-1425934398893-310a009a77f9?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        stock: 40
    },
    {
        name: "Acai Berries",
        description: "Deep purple acai berries packed with antioxidants, perfect for smoothies.",
        price: 9.49,
        baseWeight: "250g",
        image: "https://images.unsplash.com/photo-1425934398893-310a009a77f9?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        stock: 55
    }  
];

const seedDB = async () => {
    try {
        connectDB(); // Connect to the database
        await Product.deleteMany({}); // Clear existing products
        await Product.insertMany(seedProducts); // Insert new products
        console.log("Products seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close(); // Close the connection after seeding
    }
};

seedDB();
