'use strict';

// this class handle the request of adding customer

const express = require('express');
const router = express.Router();
const con = require('../dbConnection');

// A function that checks if the username exists in the database.
async function isUserExist(userName) {
  const selectUser = 'SELECT * FROM users WHERE user_name = ?';

  return new Promise((resolve, reject) => {
    con.query(selectUser, [userName], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('rows:', rows);
      resolve(rows.length != 0);
    });
  });
}

// A query that creates the customer in the users table and also in the customers table.
function insertCustomer(cusObj) {
  const insertUser = 'INSERT INTO users(user_name, password) VALUES (?,?)';

  const insertCus =
    'INSERT INTO customers(user_name, id_vat_num, name, phone, business_type, vat_frequency, tax_income_frequency, tax_income_percent, note) VALUES (?,?,?,?,?,?,?,?,?)';

  const userValues = [cusObj.userName, cusObj.password];
  const cusValues = [
    cusObj.userName,
    cusObj.idVAT,
    cusObj.cusName,
    cusObj.phone,
    cusObj.type,
    cusObj.VATFrequency,
    cusObj.taxFrequency,
    Number(cusObj.taxPercent),
    cusObj.note,
  ];

  let countRows = 0;
  con.query(insertUser, userValues, (err, rows) => {
    if (err) throw err;
    console.log('Row inserted = ' + rows.affectedRows);
    countRows += rows.affectedRows;
  });

  con.query(insertCus, cusValues, (err, rows) => {
    if (err) throw err;
    console.log('Row inserted = ' + rows.affectedRows);
    countRows += rows.affectedRows;
  });

  console.log('my rows: ', countRows);
  return countRows;
}


// Adding a customer in the database.
router.post('/', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    try {
      const obj = JSON.parse(body);
      console.log(obj);
      const userExists = await isUserExist(obj.userName);
      // console.log('User exists:', userExists);
      if (!userExists) {
        insertCustomer(obj);
        res.end(JSON.stringify({ isAdd: true, message: 'הלקוח נוצר בהצלחה' }));
      } else {
        console.log('not added');
        res.end(
          JSON.stringify({ isAdd: false, message: 'לקוח לא נוצר, שם משתמש כבר קיים במערכת!' })
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  });
});

module.exports = router;
