'use strict';
const con = require('../dbConnection');

const express = require('express');
const router = express.Router();

// verification userName and password, connect if correct
router.post('/', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', () => {
    try {
      const obj = JSON.parse(body);
      // console.log(obj);
      const name = obj.userName;
      const pass = obj.password;
      // console.log(name);
      // console.log(pass);

      const sql = `SELECT * FROM users WHERE user_name = ? AND password = ?`;
      con.query(sql, [name, pass], (err, rows) => {
        if (err) throw err;
        console.log(rows);
        if (rows.length > 0) {
          console.log('good');
          res.end(JSON.stringify({ isConnect: true }));
        } else {
          console.log('noo');
          res.end(JSON.stringify({ isConnect: false }));
        }
      });
    } catch (error) {
      console.error(error.message);
    }
  });
});

module.exports = router;
