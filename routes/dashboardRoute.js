const express = require('express');
const { createTask, getTaskData, getTaskSummaryData } = require('../controllers/dashboard');
const { assignPpl, getassignpeople } = require('../controllers/asignPeople');
const router = express.Router();

// Registration route
router.post('/createTask', createTask);
router.get('/getAllTaskData', getTaskData);
router.get('/getAllAssignePpl', getassignpeople);
router.get('/analytics', getTaskSummaryData);
router.post('/assignpeople', assignPpl);


module.exports = router;
