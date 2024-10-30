const express = require('express');
const { createTask, getTaskData } = require('../controllers/dashboard');
const { assignPpl } = require('../controllers/asignPeople');
const router = express.Router();

// Registration route
router.post('/createTask', createTask);
router.get('/getAllTaskData', getTaskData);
router.post('/assignpeople', assignPpl);


module.exports = router;
