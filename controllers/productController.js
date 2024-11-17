const Product = require('../models/productModel');

// Add a new donation listing
exports.addProduct = async (req, res) => {
    const { name, description, location, image, stock } = req.body;
    const donorId = req.user ? req.user._id || req.user.id : null;

    // Check if donorId is available
    if (!donorId) {
        return res.status(400).json({ message: "Donor ID is required" });
    }

    try { 
        const product = new Product({  // Create a new product object
            name,
            description,
            location,
            image,
            stock,
            donorId
        });

        const result = await product.save(); // Save the product to the database
        console.log("Product created:", result);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: error.message });
    }
};

// Update a donation listing
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate( // Find and update the product
            req.params.id,
            { 
                name: req.body.name, 
                description: req.body.description,
                location: req.body.location,
                image: req.body.image,
                stock: req.body.stock
            },
            { new: true }
        );

        if (product) { // If the product is found and updated
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a donation listing
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id); // Find and delete the product
        if (product) { // If the product is found and deleted
            res.json({ message: 'Product removed' });
        } else { // If the product is not found
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: error.message });
    }
};

// get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products) {
            return res.status(404).json({ message: "No products found" });
        }
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error); // Log the error
        res.status(500).json({ message: error.message });
    }
};


// get product by id
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch all products for the logged-in donor
exports.getDonorListings = async (req, res) => {
    const donorId = req.user._id;
    try {
        const products = await Product.find({ donorId });
        res.json(products);
    } catch (error) {
        console.error("Error fetching donor's products:", error);
        res.status(500).json({ message: error.message });
    }
};