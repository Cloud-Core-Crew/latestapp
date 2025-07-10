const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;