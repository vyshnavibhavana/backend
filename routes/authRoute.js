const express = require('express');
const { register, login, updateUser, logout } = require('../controllers/auth');
const router = express.Router();

// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);
router.post('/logout', logout);
router.put('/updateRegisteredUser', updateUser);

module.exports = router;
