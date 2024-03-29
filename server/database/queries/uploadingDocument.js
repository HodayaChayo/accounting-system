// this class handle all the documents that upload from client

const express = require('express');
const router = express.Router();
const con = require('../dbConnection');
const multer = require('multer');
var name;

// const upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/database/documents');
  },
  filename: function (req, file, cb) {
    
    // current timestamp in milliseconds
    let ts = Date.now();

    cb(null, ts + file.originalname.slice(-20));
    
    
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let allDate = year + '/' + month + '/' + date;
    let fileName = ts + file.originalname.slice(-20);
    
    // prints date & time in YYYY-MM-DD format
    // console.log(year + '-' + month + '-' + date);
    
    console.log(allDate);
    console.log(fileName);
    insertFile(fileName, name, allDate);
  },
});

const upload = multer({ storage: storage });

// Transferring the documents to the database
router.post('/upload-files', upload.array('uploaded-file'), (req, res) => {
  console.log(req.files);
  console.log(req.body);
  res.json({ message: 'Successfully uploaded files' });
});

// Saving the username for those documents sent to the database.
router.post('/saveUserName', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);

    name = obj.name;
  });
});


// A query that creates a document in the system
const insertFile = async (file, name, date) => {
  const insertDoc =
    'INSERT INTO `photos`(`name`,`upload_date`,`user_name`) VALUES (?,?,?)';

  console.log(name);
  con.query(insertDoc, [file, date, name], (err, rows) => {
    if (err) {
      throw err;
    }
  });
};

module.exports = router;
