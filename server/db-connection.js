'use strict';

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'accounting_system',
});

connection.connect(err => {
  if (err) {
    console.log('Error occurred in connection');
  } else {
    console.log('connected to mysql!');
  }
});

const isUserExist = (userName, password) => {
  const sql = `SELECT * FROM users WHERE user_name = ? AND password = ?`;
  let res = [];
  connection.query(sql, [userName, password], (err, rows) => {
    if (err) throw err;
    console.log(rows);
    res = rows;
  });
  console.log(res);
  if (res.length > 0) {
    console.log('good');
    return true;
  }
  console.log('noo');
  return false;
};

module.exports = { connection, isUserExist };
