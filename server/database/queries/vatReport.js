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

// global where query wether tha report is locked or unlocked
const whereLocked = 'WHERE `id_vat_num`=? AND `vat_report`=?';
const whereUnlocked =
  'WHERE `id_vat_num`=? AND `vat_report`=0 AND `date` BETWEEN DATE_SUB(?, INTERVAL 6 MONTH) AND ? AND `date` != ?';

// get the account of the incomes without Vat
const getIncomeNoVatAccount = idVAT => {
  const sql = `SELECT number FROM accounts WHERE id_vat_num=? AND type='הכנסות פטורות ממע"מ'`;

  return new Promise((resolve, reject) => {
    con.query(sql, [idVAT], (err, rows) => {
      if (err) {
        reject(err);
      }
      if (rows.length !== 0) {
        resolve(rows[0].number);
      }
      resolve(-1);
    });
  });
};

// get the data of the incomes without Vat
const incomeNoVatData = async (isLock, idVAT, month, year, where) => {
  const sql =
    'SELECT *, DATE_FORMAT(`date`, "%d/%m/%Y") AS new_date, credit_amount AS amount, DATE_FORMAT(`input_date`, "%d/%m/%Y") AS new_input_date FROM `command` ' +
    where +
    ' AND`credit_account`=?';
  const account = await getIncomeNoVatAccount(idVAT);
  const date = getNextMonthFirstDay(month, year);
  const vat = month + monthCalc * year;
  const unlockData = [idVAT, date, date, date, account];
  const lockData = [idVAT, vat, account];
  const data = isLock ? lockData : unlockData;
  const sum =
    'SELECT SUM(`credit_amount`) AS sum FROM `command` ' +
    where +
    ' AND`credit_account`=?';

  return new Promise((resolve, reject) => {
    con.query(sum, data, (err, rows) => {
      if (err) {
        reject(err);
      }
      const mySum = rows[0].sum;
      con.query(sql, data, (err, rows) => {
        if (err) {
          reject(err);
        }
        // console.log(rows);
        resolve({ rows, mySum });
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
      if (rows.length !== 0) {
        resolve(rows[0].number);
      }
      resolve(-1);
    });
  });
};

// get the data of the incomes with Vat
const incomeWithVatData = async (isLock, idVAT, month, year, where) => {
  const sql =
    'SELECT *, DATE_FORMAT(`date`, "%d/%m/%Y") AS new_date, credit_amount AS amount, DATE_FORMAT(`input_date`, "%d/%m/%Y") AS new_input_date FROM `command` ' +
    where +
    ' AND`credit_account`=?';
  const account = await getIncomeWithVatAccount(idVAT);
  const date = getNextMonthFirstDay(month, year);
  const vat = month + monthCalc * year;
  const unlockData = [idVAT, date, date, date, account];
  const lockData = [idVAT, vat, account];
  const data = isLock ? lockData : unlockData;
  const sum =
    'SELECT SUM(`credit_amount`) AS sum FROM `command` ' +
    where +
    ' AND`credit_account`=?';

  return new Promise((resolve, reject) => {
    con.query(sum, data, (err, rows) => {
      if (err) {
        reject(err);
      }
      const mySum = rows[0].sum;
      con.query(sql, data, (err, rows) => {
        if (err) {
          reject(err);
        }
        // console.log(rows);
        resolve({ rows, mySum });
      });
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
      if (rows.length !== 0) {
        resolve(rows[0].number);
      }
      resolve(-1);
    });
  });
};

// get the sum of the incomes Vat
const vatIncomeSum = async (isLock, idVAT, month, year, where) => {
  // const sql = 'SELECT * FROM `command` ' + where + ' AND`credit_account`=?';
  const account = await getVatIncomeAccount(idVAT);
  const date = getNextMonthFirstDay(month, year);
  const vat = month + monthCalc * year;
  const unlockData = [idVAT, date, date, date, account];
  const lockData = [idVAT, vat, account];
  const data = isLock ? lockData : unlockData;
  const sum =
    'SELECT SUM(`other_amount`) AS sum FROM `command` ' +
    where +
    ' AND `other_account`=?';

  return new Promise((resolve, reject) => {
    con.query(sum, data, (err, rows) => {
      if (err) {
        reject(err);
      }
      const mySum = rows[0].sum;
      resolve({ mySum });
    });
  });
};

// get the account of expenses on assets
const getExpensesOnAssetsAccount = idVAT => {
  const sql = `SELECT number FROM accounts WHERE id_vat_num=? AND type='מע"מ רכוש קבוע'`;

  return new Promise((resolve, reject) => {
    con.query(sql, [idVAT], (err, rows) => {
      if (err) {
        reject(err);
      }
      // console.log(rows);
      if (rows.length !== 0) {
        resolve(rows[0].number);
      }
      resolve(-1);
    });
  });
};

// get the data of the expenses on assets
const expensesOnAssetsData = async (isLock, idVAT, month, year, where) => {
  const sql =
    'SELECT *, DATE_FORMAT(`date`, "%d/%m/%Y") AS new_date, credit_amount AS amount, DATE_FORMAT(`input_date`, "%d/%m/%Y") AS new_input_date FROM `command` ' +
    where +
    ' AND`other_account`=?';
  const account = await getExpensesOnAssetsAccount(idVAT);
  // console.log(account);
  const date = getNextMonthFirstDay(month, year);
  const vat = month + monthCalc * year;
  const unlockData = [idVAT, date, date, date, account];
  const lockData = [idVAT, vat, account];
  const data = isLock ? lockData : unlockData;
  const sum =
    'SELECT SUM(`other_amount`) AS sum FROM `command` ' +
    where +
    ' AND `other_account`=?';

  return new Promise((resolve, reject) => {
    con.query(sum, data, (err, rows) => {
      if (err) {
        reject(err);
      }
      const mySum = rows[0].sum;
      con.query(sql, data, (err, rows) => {
        if (err) {
          reject(err);
        }
        // console.log(rows);
        resolve({ rows, mySum });
      });
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
      if (rows.length !== 0) {
        resolve(rows[0].number);
      }
      resolve(-1);
    });
  });
};

// get the data of other expenses
const getExpensesData = async (isLock, idVAT, month, year, where) => {
  const sql =
    'SELECT *, DATE_FORMAT(`date`, "%d/%m/%Y") AS new_date, credit_amount AS amount, DATE_FORMAT(`input_date`, "%d/%m/%Y") AS new_input_date FROM `command` ' +
    where +
    ' AND`other_account`=?';
  const account = await getExpensesAccount(idVAT);
  // console.log(account);
  const date = getNextMonthFirstDay(month, year);
  const vat = month + monthCalc * year;
  const unlockData = [idVAT, date, date, date, account];
  const lockData = [idVAT, vat, account];
  const data = isLock ? lockData : unlockData;
  const sum =
    'SELECT SUM(`other_amount`) AS sum FROM `command` ' +
    where +
    ' AND `other_account`=?';

  return new Promise((resolve, reject) => {
    con.query(sum, data, (err, rows) => {
      if (err) {
        reject(err);
      }
      const mySum = rows[0].sum;
      con.query(sql, data, (err, rows) => {
        if (err) {
          reject(err);
        }
        // console.log(rows);
        resolve({ rows, mySum });
      });
    });
  });
};

const lockReport = (idVAT, month, year, where) => {
  const vat = month + monthCalc * year;
  const date = getNextMonthFirstDay(month, year);
  const sql1 = 'UPDATE `command` SET `vat_report`=? ' + where;
  const data1 = [vat, idVAT, date, date, date];

  const sql2 =
    'INSERT INTO `vat_report`(`id_vat_num`, `year`, `month`) VALUES (?,?,?)';
  const data2 = [idVAT, year, month];

  return new Promise((resolve, reject) => {
    con.query(sql1, data1, (err, rows) => {
      if (err) {
        reject(err);
      }
    });

    con.query(sql2, data2, (err, rows) => {
      if (err) {
        reject(err);
      }
    });

    resolve();
  });
};

const unlockReport = (idVAT, month, year, where) => {
  const vat = month + monthCalc * year;
  const date = getNextMonthFirstDay(month, year);
  const sql1 = 'UPDATE `command` SET `vat_report`=? ' + where;
  const data1 = [0, idVAT, vat];

  const sql2 =
    'DELETE FROM `vat_report` WHERE `id_vat_num`=? AND `year`=? AND `month`=?';
  const data2 = [idVAT, year, month];

  return new Promise((resolve, reject) => {
    con.query(sql1, data1, (err, rows) => {
      if (err) {
        reject(err);
      }
    });

    con.query(sql2, data2, (err, rows) => {
      if (err) {
        reject(err);
      }
    });

    resolve();
  });
};

router.post('/getData', (req, res) => {
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
        const result = {
          lock: reportLocked,
          noVat: await incomeNoVatData(
            true,
            obj.thisVatId,
            obj.month.value,
            obj.year.value,
            whereLocked
          ),
          withVat: await incomeWithVatData(
            true,
            obj.thisVatId,
            obj.month.value,
            obj.year.value,
            whereLocked
          ),
          vat: await vatIncomeSum(
            true,
            obj.thisVatId,
            obj.month.value,
            obj.year.value,
            whereLocked
          ),
          vatOnAssets: await expensesOnAssetsData(
            true,
            obj.thisVatId,
            obj.month.value,
            obj.year.value,
            whereLocked
          ),
          vatOnOthers: await getExpensesData(
            true,
            obj.thisVatId,
            obj.month.value,
            obj.year.value,
            whereLocked
          ),
        };
        console.log('locked result: ', result);
        res.end(JSON.stringify(result));
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
          withVat: await incomeWithVatData(
            false,
            obj.thisVatId,
            obj.month.value,
            obj.year.value,
            whereUnlocked
          ),
          vat: await vatIncomeSum(
            false,
            obj.thisVatId,
            obj.month.value,
            obj.year.value,
            whereUnlocked
          ),
          vatOnAssets: await expensesOnAssetsData(
            false,
            obj.thisVatId,
            obj.month.value,
            obj.year.value,
            whereUnlocked
          ),
          vatOnOthers: await getExpensesData(
            false,
            obj.thisVatId,
            obj.month.value,
            obj.year.value,
            whereUnlocked
          ),
        };
        console.log('unlocked result: ', result);
        res.end(JSON.stringify(result));
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

router.post('/lockReport', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);
    try {
      await lockReport(
        obj.thisVatId,
        obj.month.value,
        obj.year.value,
        whereUnlocked
      );
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
      await unlockReport(
        obj.thisVatId,
        obj.month.value,
        obj.year.value,
        whereLocked
      );
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
