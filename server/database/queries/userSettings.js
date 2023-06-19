const express = require('express');
const router = express.Router();
const con = require('../dbConnection');

router.post('/', (req, res) => {
  const getSettings =
    'SELECT customers.user_name, users.password, customers.id_vat_num, customers.name, customers.phone, customers.business_type, customers.vat_frequency, customers.tax_income_frequency, customers.tax_income_percent, customers.note FROM customers, users WHERE customers.user_name=? AND users.user_name=?';

  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);

    return new Promise((resolve, reject) => {
      con.query(getSettings, [obj, obj], (err, rows) => {
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
