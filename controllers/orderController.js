const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
    const { items, totalCostAmount } = req.body;
    const userId = req.user.id;

    try {
        const order = new Order({ userId, items, totalCostAmount });
        await order.save();
        console.log("Order created:", order); // Debug logging
        res.status(201).json(order);
    } catch (error) {
        console.error("Error creating order:", error); // Debug logging
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
