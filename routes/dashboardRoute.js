const express = require('express');
const { createTask, getTaskData } = require('../controllers/dashboard');
const { assignPpl, getassignpeople } = require('../controllers/asignPeople');
const router = express.Router();

// Registration route
router.post('/createTask', createTask);
router.get('/getAllTaskData', getTaskData);
router.get('/getAllAssignePpl', getassignpeople);
router.post('/assignpeople', assignPpl);


module.exports = router;
