const express = require('express');
const { createTask } = require('../controllers/dashboard');
const router = express.Router();

// Registration route
router.post('/createTask', createTask);



module.exports = router;
