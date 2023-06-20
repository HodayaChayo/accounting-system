'use strict';

const express = require('express');
const router = express.Router();
const con = require('../dbConnection');

// check if account exist before adding
const isAccountExist = async obj => {
  const data = [obj.thisVatId, Number(obj.accountNumber)];
  const searchAccount =
    'SELECT * FROM `accounts` WHERE `id_vat_num`=? AND `number`=?';

  return new Promise((resolve, reject) => {
    con.query(searchAccount, data, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('rows:', rows);
      resolve(rows.length != 0);
    });
  });
};

// insert account to database
const insertAccount = object => {
  const data = [
    Number(object.accountNumber),
    object.thisVatId,
    object.accountName,
    object.sortCode,
    object.accountType,
    object.vatId,
  ];

  const insertSql =
    'INSERT INTO `accounts`(`number`, `id_vat_num`, `name`, `sort_code`, `type`, `vat_number`) VALUES (?,?,?,?,?,?)';

  return new Promise((resolve, reject) => {
    con.query(insertSql, data, (err, rows) => {
      if (err) {
        reject(err);
      }
      console.log(rows.affectedRows);
      resolve();
    });
  });
};

// handel the request to add account and return message if succeeded or not
router.post('/createAccount', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);
    try {
      const isExist = await isAccountExist(obj);
      if (!isExist) {
        await insertAccount(obj);
        res.end(
          JSON.stringify({ isAdd: true, message: 'חשבון חדש נוסף בהצלחה' })
        );
      } else {
        res.end(
          JSON.stringify({
            isAdd: false,
            message: 'לא ניתן להוסיף, מספר חשבון זה כבר קיים במערכת',
          })
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  });
});

// send account table data to client
router.post('/getAccountsTable', (req, res) => {
  const getAccounts =
    'SELECT `sort_code`, `number`, `name` FROM `accounts` WHERE `id_vat_num`=?';
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    // console.log(obj);
    return new Promise((resolve, reject) => {
      con.query(getAccounts, [obj], (err, rows) => {
        if (err) {
          reject(err);
        }
        res.end(JSON.stringify(rows));
        resolve();
      });
    });
  });
});

router.post('/selectedAccountData', (req, res) => {
  const selectedData =
    'SELECT * FROM accounts WHERE id_vat_num= ? AND number=?';

  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);
    return new Promise((resolve, reject) => {
      con.query(selectedData, [obj.thisVatId, obj.selectedNum], (err, rows) => {
        if (err) {
          reject(err);
        }
        console.log('result--',rows);
        res.end(JSON.stringify(rows[0]))
        resolve()
      });
    });
  });
});

module.exports = router;
