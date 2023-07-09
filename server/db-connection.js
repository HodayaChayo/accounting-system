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

module.exports = connection;
