const express = require('express');
const router = express.Router();
const { getRooms, createRooms} = require('../controllers/roomController');

router.get('/', getRooms); // Get all rooms
router.post('/', createRooms); // Create a new room

module.exports = router;