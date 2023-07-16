const express = require('express');
const router = express.Router()
const con = require('../dbConnection');
const multer = require('multer');

// const upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/database/documents');
  },
  filename: function (req, file, cb) {
    
    cb(null, Date.now() + file.originalname.slice(-20));
  },
});

const upload = multer({ storage: storage });

router.post('/upload-files', upload.array('uploaded-file'), (req, res) => {
  const insertDoc =
    'INSERT INTO `photos`(`name`, `upload_date`,`user_name`) VALUES ([?],[?],[?])';

    console.log(req.files);
    res.json({ message: 'Successfully uploaded files' });
});

module.exports = router;
