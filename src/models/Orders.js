const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    orderId: { type: String, required: true, trim: true, unique: true },
    buyerId: { type: String, required: true, trim: true },
    sellerId: { type: String, required: true, trim: true },
    products: [{
        productId: { type: String, required: true, trim: true },
        quantity: { type: Number, required: true }
    }]
}, {
    collection: "orders",
    timestamps: true
});

module.exports = mongoose.model('Orders', schema);
