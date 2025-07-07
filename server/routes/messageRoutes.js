const express = require('express');
const router = express.Router();

const { getRoomMessages} = require('../controllers/messageController');

router.get('/:roomId', getRoomMessages); // Get messages for a specific room

module.exports = router;