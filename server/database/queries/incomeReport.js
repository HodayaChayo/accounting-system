'use strict';

// this class handle the data and requests for vat report

const express = require('express');
const router = express.Router();
const con = require('../dbConnection');
const monthCalc = 0.0001;

// get date of the first day in the next month
function getNextMonthFirstDay(inputMonth, inputYear) {
  // Ensure inputMonth is between 1 (January) and 12 (December)
  if (inputMonth < 1 || inputMonth > 12) {
    throw new Error('Invalid month. Month must be between 1 and 12.');
  }

  const inputDate = new Date(inputYear, inputMonth - 1, 1);

  inputDate.setMonth(inputDate.getMonth() + 1);

  const nextYear = inputDate.getFullYear();
  const nextMonth = inputDate.getMonth() + 1;

  // Format the result as 'YYYY-MM-01'
  const formattedDate = `${nextYear}-${nextMonth
    .toString()
    .padStart(2, '0')}-01`;

  return formattedDate;
}

// check if the report is locked or not
const isLocked = obj => {
  const check =
    'SELECT * FROM `tax_income_report` WHERE `id_vat_num`=? AND `year`=? AND `month`=?';
  return new Promise((resolve, reject) => {
    con.query(
      check,
      [obj.thisVatId, obj.year.value, obj.month.value],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows.length != 0);
      }
    );
  });
};

const whereLocked = 'WHERE `id_vat_num`=? AND `tax_income_report`=?';
const whereUnlocked =
  'WHERE `id_vat_num`= ? AND `date` BETWEEN DATE_SUB(?, INTERVAL 2 MONTH) AND ? ';

// get the accounts numbers of the incomes
async function getNumberAccount(obj) {
  const getNumber = `SELECT number FROM accounts WHERE id_vat_num=? AND type= 'הכנסות חייבות במע"מ' OR type= 'הכנסות פטורות ממע"מ' `;

  return new Promise((resolve, reject) => {
    con.query(getNumber, [obj.thisVatId], (err, rows) => {
      if (err) {
        reject(err);
      }
      if (rows.length !== 0) {
        resolve(rows);
      } else {
        rows[0].number = -1;
        resolve(rows);
      }
    });
  });
}

async function getAllComment(lock, obj, where) {
  const numberAccount = await getNumberAccount(obj);
  const dateFormatSQL = getNextMonthFirstDay(obj.month.value, obj.year.value);
  let getCommands =
    'SELECT * FROM `command` ' + where + ' AND `credit_account` = ?';
  const tax = obj.month.value + monthCalc * obj.year.value;

  let sum =
    'SELECT SUM(`credit_amount`) AS sum FROM `command` ' +
    where +
    ' AND `credit_account`=?';

  const dataUnlock = [
    obj.thisVatId,
    dateFormatSQL,
    dateFormatSQL,
    numberAccount[0].number,
  ];

  console.log(numberAccount);
  for (let i = 1; i < numberAccount.length; i++) {
    getCommands = getCommands.concat(' OR `credit_account`=?');
    sum = sum.concat(' OR `credit_account`=?');

    dataUnlock.push(numberAccount[i].number);
  }

  const dataLock = [obj.thisVatId, tax];

  const data = lock ? dataLock : dataUnlock;

  return new Promise((resolve, reject) => {
    con.query(sum, data, (err, rows) => {
      if (err) {
        reject(err);
      }
      const mySum = rows[0].sum;
      con.query(getCommands, data, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve({ rows, mySum });
        // console.log(rows);
      });
    });
  });
}

router.post('/getIncomeReport', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    // console.log(obj);
    try {
      const lock = await isLocked(obj);
      if (lock) {
        const result = await getAllComment(lock, obj, whereLocked);
        res.end(JSON.stringify(result));
      } else {
        const result = await getAllComment(lock, obj, whereUnlocked);
        res.end(JSON.stringify({ isLock: lock, result }));
        // console.log('alllll ', result);
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
