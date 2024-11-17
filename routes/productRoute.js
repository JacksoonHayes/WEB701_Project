const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const passport = require('passport');

// Routes
router.get('/donor', passport.authenticate('jwt', { session: false }), productController.getDonorListings);  // Get all listings for a donor

router.get('/', passport.authenticate('jwt', { session: false }), productController.getAllProducts); // Get all products
router.post('/add', passport.authenticate('jwt', { session: false }), productController.addProduct); // Add a new product
router.put('/update/:id', passport.authenticate('jwt', { session: false }), productController.updateProduct); // Update a product
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), productController.deleteProduct); // Delete a product
router.get('/:id', passport.authenticate('jwt', { session: false }), productController.getProductById); // Get a specific product by ID

module.exports = router;
