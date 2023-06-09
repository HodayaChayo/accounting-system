'use strict'

const mysql = require('mysql');
const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'accounting_system',
});

async function doQuery(sql, param) {
  const result = await con.query(sql, param);
  console.log(result);
  return result[0];
}

module.exports = con;