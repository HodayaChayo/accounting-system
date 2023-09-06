'use strict';

const express = require('express');
const router = express.Router();
const con = require('../dbConnection');
const { json } = require('body-parser');


router.post('/', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    try {
      const sql = 'SELECT `name`,`id_vat_num`, `business_type`,`user_name` FROM `customers` ORDER BY `name`;'
      con.query(sql, (err, rows) =>{
        if(err) throw err
        // console.log(rows);
        res.end(JSON.stringify(rows))
      })
    } catch (error) {
      console.error(error.message);
    }
  });
});

module.exports = router;
