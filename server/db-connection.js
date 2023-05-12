'use strict';

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'accounting_system',
});

const isUserExist = (userName, password) => {
  const sql = `SELECT * FROM users`;
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    return rows;
  });
};

module.exports = { connection, isUserExist };
