const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    userType: { type: String, required: true, enum: ['buyer', 'seller'] },
    id: { type: String, required: true, unique: true },
}, {
    collection: 'users',
    timestamps: true
})

module.exports = mongoose.model('Users', schema);

