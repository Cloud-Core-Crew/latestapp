const mongoose = require('mongoose');

const merchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Merch', merchSchema);