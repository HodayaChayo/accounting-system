'use strict';

// this class handle all the requests to get data of documents

const express = require('express');
const router = express.Router();
const con = require('../dbConnection');
const path = require('path');

const getOpenDocList = user_name => {
  const sql =
    'SELECT `name` FROM `photos` WHERE `user_name`=? AND `input_date` = "0000-00-00" ORDER BY `name`';

  return new Promise((resolve, reject) => {
    con.query(sql, [user_name], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      // console.log('rows:', rows);
      resolve(rows);
    });
  });
};

router.post('/getOpenDocList', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);
    const list = await getOpenDocList(obj.selectedCus);
    res.end(JSON.stringify(list));
  });
});

router.post('/getDoc', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);

    // Use path.join to create the correct file path
    const filePath = path.join(__dirname ,'../documents/' , obj.selectedDoc.name);

    // Use res.sendFile to send the file
    res.sendFile(filePath, err => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(404).send('File not found');
      } else {
        console.log('good');
      }
    });
  });
});

module.exports = router;
