'use strict';

const express = require('express');
const router = express.Router();
const con = require('../dbConnection');

const checkDuplicates =(obj)=>{
  const check = ''

}

router.post('/addCommand', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);
  });
});

module.exports = router;
