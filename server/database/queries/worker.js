'use strict';

const express = require('express');
const router = express.Router();
const con = require('../dbConnection');

// A query that receives a username and checks if the username it received already exists.
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

// A function creates a user and also creates him as an employee or manager.
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

// A query that adds an employee to the system.
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

// A query that requests the employee data from the database.
router.post('/getTableData', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    try {
      const sql =
        'SELECT user_name, full_name, worker_type, is_active FROM workers ORDER BY full_name';
      con.query(sql, (err, rows) => {
        if (err) throw err;
        console.log(rows);
        res.end(JSON.stringify(rows));
      });
    } catch (error) {
      console.error(error.message);
    }
  });
});

// A query that requests the data of the selected employee from the database.
router.post('/getSelectedWorkerData', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);
    const getDtaWorker =
      'SELECT user_name, full_name, worker_type, password, is_active FROM workers WHERE user_name=?';

    return new Promise((resolve, reject) => {
      con.query(getDtaWorker, [obj.sentUserName], (err, rows) => {
        if (err) {
          reject(err);
        }
        res.end(JSON.stringify(rows[0]));
        resolve();
      });
    });
  });
});

// A function that checks if there is already a username that needs to be updated.
async function canUpdateWorker(obj) {
  if (obj.sentUserName !== obj.userName) {
    const exist = await isUserExist(obj.userName);
    if (exist) {
      return false;
    }
  }
  return true;
}

// A query that updates a database employee in the users table.
async function updateUser(obj) {
  const selectUser =
    'UPDATE `users` SET `user_name`=?,`password`=? WHERE user_name=?';

  return new Promise((resolve, reject) => {
    con.query(
      selectUser,
      [obj.userName, obj.password, obj.sentUserName],
      (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        console.log('rows:', rows);
        resolve(rows.length != 0);
      }
    );
  });
}

// A query that updates an employee in the database in the employee table.
async function updateWorker(obj) {
  const update =
    'UPDATE workers SET user_name=?, full_name=?, worker_type=?, password=?,  is_active=? WHERE user_name=?';

  const workerValues = [
    obj.userName,
    obj.workerName,
    obj.workerType,
    obj.password,
    obj.isActive,
    obj.sentUserName,
  ];

  return new Promise((resolve, reject) => {
    con.query(update, workerValues, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('rows:', rows);
      resolve(rows.length != 0);
    });
  });
}

// Update works.
router.post('/editWorker', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    try {
      const obj = JSON.parse(body);
      console.log(obj);
      const canWeUpdate = await canUpdateWorker(obj);

      if (canWeUpdate) {
        await updateWorker(obj);
        await updateUser(obj);
        res.end(
          JSON.stringify({ isUpDate: true, message: 'השינויים בוצעו בהצלחה!' })
        );
      } else {
        console.log('not upDate');
        res.end(
          JSON.stringify({
            isUpDate: false,
            message: 'העובד לא עודכן! לא ניתן לעדכן לשם משתמש שכבר קיים במערכת',
          })
        );
      }
    } catch (error) {
      console.error(error.message);
      res.end(
        JSON.stringify({
          isUpDate: false,
          message: 'שגיאת שאילתה',
        })
      );
    }
  });
});

module.exports = router;
