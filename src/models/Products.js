const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    sellerId: { type: String, required: true, trim: true },
    productId: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    price: { type: String, required: true },
}, {
    collection: 'products',
    timestamps: true
})

module.exports = mongoose.model('Products', schema);

