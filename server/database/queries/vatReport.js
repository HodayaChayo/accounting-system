'use strict';

const express = require('express');
const router = express.Router();
const con = require('../dbConnection');

router.post('/isLocked', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);
    const check =
      'SELECT * FROM `vat_report` WHERE `id_vat_num`=? AND `year`=? AND `month`=?';
    return new Promise((resolve, reject) => {
      con.query(
        check,
        [obj.thisVatId, obj.year.value, obj.month.value],
        (err, rows) => {
          if (err) {
            reject(err);
          }
          res.end(JSON.stringify(rows.length != 0));
          resolve();
        }
      );
    });
  });
});

module.exports = router;
