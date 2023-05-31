'use strict';

const express = require('express');
// const router = express.Router();
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'accounting_system',
});

connection.connect(err => {
  if (err) {
    console.log('Error occurred in connection to mysql');
  } else {
    console.log('connected to mysql!');
  }
});

async function isUserExist(userName, password) {
  const sql = `SELECT * FROM users WHERE user_name = ? AND password = ?`;
  let res = [];
  await connection.query(sql, [userName, password], (err, rows) => {
    if (err) throw err;
    console.log(rows);
    res = rows;
    console.log('this is res in query: ', res);
  });
  console.log('this is res: ', res);
  if (res.length > 0) {
    console.log('good');
    return true;
  }
  console.log('noo');
  return false;
}

module.exports = { connection, isUserExist };
