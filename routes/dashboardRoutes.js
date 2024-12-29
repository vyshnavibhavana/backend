const express = require('express');
const { createFolder, getallFolders, deleteFolders } = require('../controllers/createFolder');
const router = express.Router();

// createFolder route
router.post('/create-folder', createFolder);
router.get('/folders', getallFolders);
router.delete('/delete-folder/:id', deleteFolders);



module.exports = router;
