'use strict';

// this class handle the data and requests for vat report

const express = require('express');
const router = express.Router();
const con = require('../dbConnection');

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

// check if this current month report is locked
const isLocked = obj => {
  const check =
    'SELECT * FROM `vat_report` WHERE `id_vat_num`=? AND `year`=? AND `month`=?';
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

const whereLocked = 'WHERE `id_vat_num`=? AND `vat_report`=?';
const whereUnlocked =
  'WHERE `id_vat_num`=? AND `vat_report`=0 AND `date` BETWEEN DATE_SUB(?, INTERVAL 6 MONTH) AND ? ';

// get the account of the incomes without Vat
const getIncomeNoVatAccount = idVAT => {
  const sql = `SELECT number FROM accounts WHERE id_vat_num=? AND type='הכנסות פטורות ממע"מ'`;

  return new Promise((resolve, reject) => {
    con.query(sql, [idVAT], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows[0].number);
    });
  });
};

const incomeNoVatData = async (isLock, idVAT, month, year, where) => {
  const sql = 'SELECT * FROM `command` ' + where + ' AND`credit_account`=?';
  const account = await getIncomeNoVatAccount(idVAT);
  console.log(account);
  const date = getNextMonthFirstDay(month, year);
  const vat = month + 0.0001 * year;
  const unlockData = [idVAT, date, date, account];
  const lockData = [idVAT, vat, account];
  const data = isLock ? lockData : unlockData;
  const sum = 'SELECT SUM(`credit_amount`) AS sum FROM `command` ' + where + ' AND`credit_account`=?'

  return new Promise((resolve, reject) => {
    con.query(sum, data, (err, rows) => {
      if (err) {
        reject(err);
      }
      console.log(rows);
      const mySum = rows[0].sum
      con.query(sql, data, (err, rows) => {
        if (err) {
          reject(err);
        }
        // console.log(rows);
        resolve({rows, mySum});
      });
    });
  });
};

// get the account of the incomes with Vat
const getIncomeWithVatAccount = idVAT => {
  const sql = `SELECT number FROM accounts WHERE id_vat_num=? AND type='הכנסות חייבות במע"מ'`;

  return new Promise((resolve, reject) => {
    con.query(sql, [idVAT], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};

// get the account of the vat incomes
const getVatIncomeAccount = idVAT => {
  const sql = `SELECT number FROM accounts WHERE id_vat_num=? AND type='מע"מ עסקאות'`;

  return new Promise((resolve, reject) => {
    con.query(sql, [idVAT], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};

// get the account of other expenses
const getExpensesAccount = idVAT => {
  const sql = `SELECT number FROM accounts WHERE id_vat_num=? AND type='מע"מ תשומות'`;

  return new Promise((resolve, reject) => {
    con.query(sql, [idVAT], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};

// get the account of expenses on assets
const getExpensesOnAssetsAccount = idVAT => {
  const sql = `SELECT number FROM accounts WHERE id_vat_num=? AND type='רכוש קבוע'`;

  return new Promise((resolve, reject) => {
    con.query(sql, [idVAT], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};

// get data of all the commands that locked in the selected report
const dataOfLocked = obj => {
  const vat = obj.month.value + 0.0001 * obj.year.value;
  const select =
    'SELECT * FROM `command` WHERE `id_vat_num`=? AND `vat_report` =?';
  return new Promise((resolve, reject) => {
    con.query(select, [obj.thisVatId, vat], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};

const dataOfUnlocked = obj => {};

router.post('/isLocked', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);
    try {
      const reportLocked = await isLocked(obj);
      if (reportLocked) {
      } else {
        const result = {
          lock: reportLocked,
          noVat: await incomeNoVatData(
            false,
            obj.thisVatId,
            obj.month.value,
            obj.year.value,
            whereUnlocked
          ),
          // withVat:
        };
        console.log(result.noVat);
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
