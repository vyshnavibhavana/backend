const express = require('express');
const { createFolder, getFolderById, getAllFolders, deleteFolder, deleteAllFolders } = require('../controllers/createFolder');
const { getUserAnalytics } = require('../controllers/createForm');
const router = express.Router();

router.post("/folders", createFolder);

router.get("/folders/:folderId", getFolderById);

router.get("/folders", getAllFolders);

router.delete("/folders/:id", deleteFolder);

router.get("/analytics", getUserAnalytics);

router.delete("/folders", deleteAllFolders);

module.exports = router;