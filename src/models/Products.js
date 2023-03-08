const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    // productId: { type: String, required: true, unique: true, trim: true },
    sellerId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
}, {
    collection: 'products',
    timestamps: true
})

module.exports = mongoose.model('Products', schema);


