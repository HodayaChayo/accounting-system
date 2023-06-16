const express = require('express');
const router = express.Router();
const con = require('../dbConnection');

router.post('/', (req, res) => {
  const getSettings = 'SELECT * FROM `customers` WHERE `id_vat_num`=?';

  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    return new Promise((resolve, reject) => {
      con.query(getSettings, [obj.thisVatId], (err, rows) => {
        if (err) {
          reject(err);
        }
        console.log(rows);
        res.end(JSON.stringify(rows));
        resolve();
      });
    });
  });
});

module.exports = router;
