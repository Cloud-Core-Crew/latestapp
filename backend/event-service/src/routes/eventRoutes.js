const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Route to add a new event
router.post('/events', eventController.addEvent);

// Route to get all events
router.get('/', eventController.getEvents);

// Route to seed sample events
router.post('/seed', eventController.seedEvents);

module.exports = router;