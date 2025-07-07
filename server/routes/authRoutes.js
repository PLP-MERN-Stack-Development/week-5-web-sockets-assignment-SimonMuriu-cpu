const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// Register user
router.post('/register', register);

// Login user
router.post('/login', login);

// Get user profile
router.get('/profile', auth, getProfile);

module.exports = router;