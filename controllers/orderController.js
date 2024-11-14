const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');

// Create an order with pending status and deduct one voucher from the beneficiary
exports.createOrder = async (req, res) => {
    const { productId } = req.body; // Product/Donation ID
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);

        if (user.vouchers > 0) {
            const order = new Order({
                userId,
                productId,
                status: 'pending', // Set initial order status to pending
                orderDate: new Date()
            });

            user.vouchers -= 1; // Deduct one voucher from user account
            await user.save();
            await order.save();

            res.status(201).json(order);
        } else {
            res.status(400).json({ message: "Insufficient vouchers." });
        }
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: error.message });
    }
};

// Update order status by the donor
exports.updateOrderStatus = async (req, res) => {
    const { orderId, action } = req.body;
    try {
        const order = await Order.findById(orderId);

        if (!order) return res.status(404).json({ message: "Order not found." });

        if (action === 'approve') {
            order.status = 'approved';
        } else if (action === 'decline') {
            order.status = 'canceled';

            // Refund the voucher to the beneficiary
            const user = await User.findById(order.userId);
            user.vouchers += 1;
            await user.save();
        }

        await order.save();
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get orders for a user
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDonorOrders = async (req, res) => {
    try {
        // Find products owned by the logged-in donor
        const products = await Product.find({ donorId: req.user._id });
        const productIds = products.map(product => product._id);

        // Find orders associated with the donor's products, including product name and user details
        const orders = await Order.find({ productId: { $in: productIds }, status: 'pending' })
            .populate('userId', 'name')
            .populate('productId', 'name');       

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
