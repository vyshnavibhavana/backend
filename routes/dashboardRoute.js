const express = require('express');
const { createTask, getTaskData } = require('../controllers/dashboard');
const router = express.Router();

// Registration route
router.post('/createTask', createTask);
router.get('/getAllTaskData', getTaskData);



module.exports = router;
