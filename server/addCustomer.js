'use strict';

const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'accounting_system',
});

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

function insertCustomer(cusObj) {
  const insertSql =
    'INSERT INTO users(user_name, password) VALUES (?,?); INSERT INTO customers(user_name, id_vat_num, name, phone, business_type, vat_frequency, tax_income_frequency, tax_income_percent, note) VALUES (?,?,?,?,?,?,?,?,?)';

  const values = [
    cusObj.userName,
    cusObj.password,
    cusObj.userName,
    cusObj.idVAT,
    cusObj.cusName,
    cusObj.phone,
    cusObj.type,
    cusObj.VATFrequency,
    cusObj.taxFrequency,
    Number(cusObj.taxPercent) ,
    cusObj.note
  ];

  con.query(insertSql, values, (err, rows) =>{
    if(err) throw err
    console.log('Row inserted = ' + rows.affectedRows);
    return rows.affectedRows
  })
}

// async function checkUser(userName) {
//   try {
//     const userExists = await isUserExist(userName);
//     console.log('User exists:', userExists);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// // Call the function
// checkUser('hodayachayo@gmail.com');

// console.log('is return',isUserExist('hodayachayo@gmail.com'));

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
        insertCustomer(obj)
      } else {
        console.log('not added');
        res.end(
          JSON.stringify({ isAdd: false, message: 'שם משתמש קיים במערכת!' })
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  });
});

module.exports = router;
