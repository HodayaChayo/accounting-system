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
  'WHERE `id_vat_num`= ? AND `date` BETWEEN DATE_SUB(?, INTERVAL ? MONTH) AND ? AND `date` != ? ';

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
    'SELECT *, DATE_FORMAT(`date`, "%d/%m/%Y") AS new_date, credit_amount AS amount, DATE_FORMAT(`input_date`, "%d/%m/%Y") AS new_input_date FROM `command` ' +
    where +
    ' AND (`credit_account` = ?';
  const tax = obj.month.value + monthCalc * obj.year.value;

  let sum =
    'SELECT SUM(`credit_amount`) AS sum FROM `command` ' +
    where +
    ' AND (`credit_account`=?';

  const dataUnlock = [
    obj.thisVatId,
    dateFormatSQL,
    Number(obj.incomeFrequency),
    dateFormatSQL,
    dateFormatSQL,
    numberAccount[0].number,
  ];

  const dataLock = [obj.thisVatId, tax, numberAccount[0].number];

  console.log(numberAccount);
  for (let i = 1; i < numberAccount.length; i++) {
    getCommands = getCommands.concat(' OR `credit_account`=?');
    sum = sum.concat(' OR `credit_account`=?');

    dataUnlock.push(numberAccount[i].number);
    dataLock.push(numberAccount[i].number);
  }
  getCommands = getCommands.concat(')');
  sum = sum.concat(')');

  const data = lock ? dataLock : dataUnlock;

  return new Promise((resolve, reject) => {
    con.query(sum, data, (err, rows) => {
      if (err) {
        reject(err);
      }
      let mySum;
      console.log(rows);
      console.log(sum);
      console.log(data);
      if (rows.length !== 0) {
        // i have a bug
        mySum = rows[0].sum;
      }
      con.query(getCommands, data, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve({ rows, mySum });
        // console.log(getCommands);
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
    console.log(obj);
    try {
      const lock = await isLocked(obj);
      if (lock) {
        const result = await getAllComment(lock, obj, whereLocked);
        res.end(JSON.stringify({ isLock: lock, result }));
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

async function closeIncomeReports(obj) {
  const dateSQL = getNextMonthFirstDay(obj.month.value, obj.year.value);
  const numberAccount = await getNumberAccount(obj);
  const tax = obj.month.value + monthCalc * obj.year.value;

  const insertVats =
    'INSERT INTO `tax_income_report`(`id_vat_num`, `year`, `month`) VALUES (?,?,?)';

  const dataInsert = [obj.thisVatId, obj.year.value, obj.month.value];

  let updateCommands =
    'UPDATE `command` SET `tax_income_report`= ? ' +
    whereUnlocked +
    ' AND (`credit_account` = ?';

  let dataUpdate = [
    tax,
    obj.thisVatId,
    dateSQL,
    Number(obj.incomeFrequency),
    dateSQL,
    dateSQL,
    numberAccount[0].number,
  ];

  for (let i = 1; i < numberAccount.length; i++) {
    updateCommands = updateCommands.concat(' OR `credit_account`= ? ');

    dataUpdate.push(numberAccount[i].number);
  }
  updateCommands = updateCommands.concat(')');

  return new Promise((resolve, reject) => {
    con.query(insertVats, dataInsert, (err, rows) => {
      if (err) {
        reject(err);
      }

      con.query(updateCommands, dataUpdate, (err, rows) => {
        if (err) {
          reject(err);
        }
        console.log(updateCommands);
        resolve();
      });
    });
  });
}

const openIncomeReports = (idVAT, month, year, where) => {
  const tax = month + monthCalc * year;

  const report =
    'DELETE FROM `tax_income_report` WHERE `id_vat_num`= ? AND `year`= ? AND `month`= ?';
  const reportData = [idVAT, year, month];

  const commands = 'UPDATE `command` SET `tax_income_report`=? ' + where
  const commandsData = [0, idVAT, tax]

  return new Promise((resolve, reject) => {
    con.query(report, reportData, (err, rows) => {
      if (err) {
        reject(err);
      }
    });

    con.query(commands, commandsData, (err, rows) => {
      if (err) {
        reject(err);
      }
    });

    resolve();
  });
};

router.post('/lockReport', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);
    try {
      await closeIncomeReports(obj);
      res.end(
        JSON.stringify({
          isUpDate: true,
          message: 'הדוח ננעל בהצלחה',
        })
      );
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

router.post('/unlockReport', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);
    try {
      await openIncomeReports(obj.thisVatId, obj.month.value, obj.year.value, whereLocked);
      res.end(
        JSON.stringify({
          isUpDate: true,
          message: 'הדוח שוחרר בהצלחה',
        })
      );
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
