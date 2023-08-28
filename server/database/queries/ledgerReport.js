'use strict';

const express = require('express');
const router = express.Router();
const con = require('../dbConnection');

// return a list whit all the accounts of this user
const getAllAccounts = idVat => {
  const getAll =
    'SELECT `number` AS value, CONCAT(`number`, "-", `name`) AS label FROM `accounts` WHERE `id_vat_num`=? ORDER BY value';

  return new Promise((resolve, reject) => {
    con.query(getAll, [idVat], (err, rows) => {
      if (err) {
        reject(err);
      }
      // console.log(rows);
      resolve(rows);
    });
  });
};

// gives the data of the accountList we entered
const getDataOfAccounts = (obj, accountsList) => {
  return new Promise((resolve, reject) => {
    let result = [];
    const promises = []; // Store the promises for each query

    const getData =
      'SELECT *, ' +
      'CASE ' +
      'WHEN `debit_account` = ? THEN `debit_amount` ' +
      'WHEN `credit_account` = ? THEN `credit_amount` ' +
      'WHEN `other_account` = ? THEN `other_amount` ' +
      'END AS amount, ' +
      'CASE ' +
      'WHEN `debit_account` = ? THEN `credit_account` ' +
      'WHEN `credit_account` = ? THEN `debit_account` ' +
      'WHEN `other_account` = ? THEN CONCAT(`debit_account`, ",", `credit_account`) ' +
      'END AS against_account, ' +
      'DATE_FORMAT(`date`, "%d/%m/%Y") AS new_date, ' +
      'DATE_FORMAT(`input_date`, "%d/%m/%Y") AS new_input_date ' +
      'FROM `command` ' +
      'WHERE `id_vat_num` = ? AND `date` >= ? AND `date` <= ? ' +
      'AND (`debit_account` = ? OR `credit_account` = ? OR `other_account` = ?)';

    accountsList.forEach(el => {
      const account = el.value;
      const data = [
        account,
        account,
        account,
        account,
        account,
        account,
        obj.thisVatId,
        obj.fromDate,
        obj.toDate,
        account,
        account,
        account,
      ];
      const promise = new Promise((innerResolve, innerReject) => {
        con.query(getData, data, (err, rows) => {
          if (err) {
            innerReject(err);
          }
          result.push({ name: el.label, data: rows });
          innerResolve();
        });
      });
      promises.push(promise);
    });

    // Wait for all promises to resolve before resolving the main Promise
    Promise.all(promises)
      .then(() => {
        resolve(result);
      })
      .catch(reject);
  });
};

// send data of all the existing accounts
router.post('/getAll', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    // console.log(obj);
    try {
      const accounts = await getAllAccounts(obj.thisVatId);
      const allData = await getDataOfAccounts(obj, accounts);

      // console.log('all data: ', allData);
      res.end(JSON.stringify(allData));
    } catch (err) {
      console.error(err.message);
      res.end(
        JSON.stringify({
          isUpdate: false,
          message: 'שגיאה משרת',
        })
      );
    }
  });
});

// send data of all the selected accounts
router.post('/getSelected', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);
    try {
      if (obj.selectedAccount.length !== 0) {
        const allData = await getDataOfAccounts(obj, obj.selectedAccount);
        res.end(JSON.stringify(allData));
      } else {
        const accounts = await getAllAccounts(obj.thisVatId);
        const allData = await getDataOfAccounts(obj, accounts);
        res.end(JSON.stringify(allData));
      }
    } catch (err) {
      console.error(err.message);
      res.end(
        JSON.stringify({
          isUpdate: false,
          message: 'שגיאה משרת',
        })
      );
    }
  });
});

module.exports = router;
