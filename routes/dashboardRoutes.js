const express = require('express');
const { createFolder, getallFolders, deleteFolders, getFoldersAndFormData, getFoldersAndFormDataByUserId } = require('../controllers/createFolder');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const fs = require('fs')
const { createForm } = require('../controllers/form');
// const dataController = require('../controllers/dataController');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST route
router.post('/submit', upload.array('image', 10), createForm);

module.exports = router;




// createFolder route
router.post('/create-folder', createFolder);
router.get('/folders', getallFolders);
router.delete('/delete-folder/:id', deleteFolders);

//craeteForm routes
router.get('/get-folders', getFoldersAndFormData);
router.get('/get-folders-userId', getFoldersAndFormDataByUserId);



module.exports = router;
