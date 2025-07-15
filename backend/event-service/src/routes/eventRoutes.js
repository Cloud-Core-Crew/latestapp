const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Route to add a new event
router.post('/', eventController.addEvent);

// Route to get all events
router.get('/', eventController.getEvents);

// Route to seed sample events
router.post('/seed', eventController.seedEvents);

// Route to delete all events
router.delete('/', eventController.deleteAllEvents);

module.exports = router;