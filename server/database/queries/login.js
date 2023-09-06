'use strict';

// this class handle the login verification to the system

const con = require('../dbConnection');
const express = require('express');
const router = express.Router();

// if userName exist in workers table, return data, else empty array
const isWorker = userName => {
  const check = 'SELECT * FROM `workers` WHERE `user_name`=?';
  return new Promise((resolve, reject) => {
    con.query(check, [userName], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};

// if the connecting user is customer, get his data
const getCusData = (userName)=>{
  const getCus = 'SELECT `user_name`, `id_vat_num`, `name` FROM `customers` WHERE `user_name`=?'
  return new Promise((resolve, reject) => {
    con.query(getCus, [userName], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

// get user type: manager, worker or customer
const getUserType = async userName => {
  const type = await isWorker(userName);
  if (type.length != 0) {
    const resType = type[0].worker_type;
    return resType;
  }
  return 'לקוח';
};

// verification userName and password, connect if correct
router.post('/', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    try {
      const obj = JSON.parse(body);
      // console.log(obj);
      const name = obj.userName;
      const pass = obj.password;
      // console.log(name);
      // console.log(pass);

      const sql = `SELECT * FROM users WHERE user_name = ? AND password = ?`;
      con.query(sql, [name, pass], async (err, rows) => {
        if (err) throw err;
        console.log(rows);
        if (rows.length > 0) {
          const userType = await getUserType(name);
          const cusData = await getCusData(name)
          console.log('good');
          res.end(JSON.stringify({ isConnect: true, type: userType, cusData: cusData }));
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
