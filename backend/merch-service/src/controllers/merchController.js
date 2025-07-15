const Merch = require('../models/merch');

// Add new merchandise
exports.addMerch = async (req, res) => {
    try {
        console.log('addMerch called', req.body);
        const { name, price, imageUrl, description } = req.body;
        const newMerch = new Merch({ name, price, imageUrl, description });
        await newMerch.save();
        console.log('Merch saved', newMerch);
        res.status(201).json(newMerch);
    } catch (error) {
        console.error('Error adding merch:', error);
        res.status(500).json({ message: 'Error adding merchandise', error });
    }
};

// Get all merchandise
exports.getMerch = async (req, res) => {
    try {
        const merchList = await Merch.find();
        res.status(200).json(merchList);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving merchandise', error });
    }
};

// Fix: export getAllMerch for route
exports.getAllMerch = exports.getMerch;

// Seed merchandise with custom data from request body
exports.seedMerch = async (req, res) => {
    try {
        const merch = Array.isArray(req.body) ? req.body : [];
        if (!merch.length) {
            return res.status(400).json({ message: 'Request body must be an array of merchandise.' });
        }
        await Merch.deleteMany({});
        const inserted = await Merch.insertMany(merch);
        res.status(201).json({ message: 'Custom merchandise seeded', merch: inserted });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding merchandise', error });
    }
};