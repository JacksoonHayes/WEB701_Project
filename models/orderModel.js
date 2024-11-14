const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    userId: { // Beneficiary's user ID
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: { // Donation listing being ordered
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    status: { // Status of the order: pending, approved, or canceled
        type: String,
        enum: ['pending', 'approved', 'canceled'],
        default: 'pending'
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', OrderSchema);
