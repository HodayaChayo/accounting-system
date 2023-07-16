const express = require('express');
const router = express.Router()
const con = require('../dbConnection');

// parse form data
router.use(express.urlencoded({ extended: false }));

// parse json
// router.use(express.json());

const multer = require('multer');

// const upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/database/documents');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const upload1 = multer({ dest: '../documents' })

router.post('/upload-file', upload.single('uploaded-file'), function (req, res, next) {
  console.log(req.file);
  console.log('222222');
  // req.file is the `uploaded_file` file
  // req.body will hold the text fields, if there were any
  res.json({ message: 'Successfully uploaded file' });
});

router.post('/upload-files', upload.array('uploaded-file'), (req, res) => {
  const insertDoc =
    'INSERT INTO `photos`(`name`, `upload_date`,`user_name`) VALUES ([?],[?],[?])';

    console.log('11111');
    console.log(req.files);
    res.json({ message: 'Successfully uploaded files' });

  // const body = [];
  // req.on('data', chunk => {
  //   body.push(chunk);
  // });
  // req.on('end', async () => {
  //   const obj = JSON.parse(body);
  //   console.log(obj);
  //   for(file in obj){
  //     console.log(file);
  //   }
  // return new Promise((resolve, reject) => {

  //   con.query(insertDoc, (err, rows) => {
  //     if (err) {
  //       reject(err);
  //     }
  //     console.log(rows);
  //     res.end(JSON.stringify(rows));
  //     resolve();
  //   });
  // });
  // });
});

module.exports = router;
