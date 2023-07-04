const express = require('express');
const router = express.Router();
const con = require('../dbConnection');

router.post('/', (req, res) => {
  const insertDoc =
    'INSERT INTO `photos`(`name`, `upload_date`,`user_name`) VALUES ([?],[?],[?])';

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
