'use strict';

// this class handle the data and requests for vat report

const express = require('express');
const router = express.Router();
const con = require('../dbConnection');

// check if this current month report is locked
const isLocked = obj => {
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
        resolve(rows.length != 0);
      }
    );
  });
};

const dataOfLocked = (obj)=>{
  const vat = obj.month.value + 0.0001 * obj.year.value
  console.log(vat);
}

router.post('/isLocked', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);
    try {
      const reportLocked = await isLocked(obj);
      if(reportLocked){
        dataOfLocked(obj)
      }
    } catch (error) {
      console.error(error.message);
      res.end(
        JSON.stringify({
          isUpDate: false,
          message: 'שגיאת שאילתה',
        })
      );
    }
  });
});

module.exports = router;
