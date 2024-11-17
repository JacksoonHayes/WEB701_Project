const express = require('express');
const router = express.Router();
const passport = require('passport');
const orderController = require('../controllers/orderController');

// Routes
router.post('/', passport.authenticate('jwt', { session: false }), orderController.createOrder); // Create a new order
router.get('/', passport.authenticate('jwt', { session: false }), orderController.getUserOrders); // Get all orders for a user
router.put('/update-status', passport.authenticate('jwt', { session: false }), orderController.updateOrderStatus); // Update the status of an order
router.get('/donor-orders', passport.authenticate('jwt', { session: false }), orderController.getDonorOrders); // Get all orders for a donor

module.exports = router;
