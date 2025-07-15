const Event = require('../models/event');

// Add a new event
exports.addEvent = async (req, res) => {
    try {
        const { title, date, description, imageUrl, price } = req.body;
        const newEvent = new Event({ title, date, description, imageUrl, price });
        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
};

// Get all events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving events', error: error.message });
    }
};

// Seed events with custom data from request body
exports.seedEvents = async (req, res) => {
    try {
        const events = Array.isArray(req.body) ? req.body : [];
        if (!events.length) {
            return res.status(400).json({ message: 'Request body must be an array of events.' });
        }
        await Event.deleteMany({});
        const inserted = await Event.insertMany(events);
        res.status(201).json({ message: 'Custom events seeded', events: inserted });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding events', error: error.message });
    }
};

// Delete all events
exports.deleteAllEvents = async (req, res) => {
    console.log('DELETE /api/events called');
    try {
        await Event.deleteMany({});
        console.log('All events deleted');
        res.status(200).json({ message: 'All events deleted' });
    } catch (error) {
        console.error('Error deleting events:', error);
        res.status(500).json({ message: 'Error deleting events', error: error.message });
    }
};