'use strict';

const express = require('express');
const router = express.Router();
const con = require('../dbConnection');

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
  const insertUser = 'INSERT INTO users(user_name, password) VALUES (?,?)';

  const insertWorker =
    'INSERT INTO workers(user_name, full_name, worker_type, password, is_active) VALUES (?,?,?,?,?)';

  const userValues = [cusObj.userName, cusObj.password];
  const workerValues = [
    cusObj.userName,
    cusObj.workerName,
    cusObj.workerType,
    cusObj.password,
    cusObj.isActive,
  ];

  let countRows = 0;
  con.query(insertUser, userValues, (err, rows) => {
    if (err) throw err;
    console.log('Row inserted = ' + rows.affectedRows);
    countRows += rows.affectedRows;
  });

  con.query(insertWorker, workerValues, (err, rows) => {
    if (err) throw err;
    console.log('Row inserted = ' + rows.affectedRows);
    countRows += rows.affectedRows;
  });

  console.log('my rows: ', countRows);
  return countRows;
}

router.post('/addWorker', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    try {
      const obj = JSON.parse(body);
      console.log(obj);
      const userExists = await isUserExist(obj.userName);
      console.log('User exists:', userExists);
      if (!userExists) {
        insertCustomer(obj);
        res.end(JSON.stringify({ isAdd: true, message: 'העובד נוצר בהצלחה' }));
      } else {
        console.log('not added');
        res.end(
          JSON.stringify({
            isAdd: false,
            message: 'העובד לא נוצר, שם משתמש כבר קיים במערכת!',
          })
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  });
});

router.post('/getTableData', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    try {
      const sql =
        'SELECT `user_name`, `full_name`, `worker_type`, `password`, `is_active` FROM `workers`ORDER BY `name`;';
      con.query(sql, (err, rows) => {
        if (err) throw err;
        // console.log(rows);
        res.end(JSON.stringify(rows));
      });
    } catch (error) {
      console.error(error.message);
    }
  });
});

module.exports = router;
