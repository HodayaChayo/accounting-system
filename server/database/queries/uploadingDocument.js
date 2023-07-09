const express = require('express');
const router = express.Router();
const con = require('../dbConnection');

const multer = require('multer');

// const upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../documents');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.array('/uploadingDocument'),(req, res) => {
  const insertDoc =
    'INSERT INTO `photos`(`name`, `upload_date`,`user_name`) VALUES ([?],[?],[?])';

    
    console.log(req.files);
   

  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);
    for(file in obj){
      console.log(file);
    }
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
  });
});
module.exports = router;
