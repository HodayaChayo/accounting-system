'use strict';

// this class handle all the requests about commands

const express = require('express');
const router = express.Router();
const con = require('../dbConnection');

// check if the commands is a duplicate or not
const checkDuplicates = obj => {
  const check =
    'SELECT * FROM `command` WHERE `id_vat_num`=? AND `reference`=? AND (`debit_account`=? OR `credit_account`=?)';

  return new Promise((resolve, reject) => {
    con.query(
      check,
      [
        obj.thisVatId,
        obj.reference,
        Number(obj.debitAccount),
        Number(obj.creditAccount),
      ],
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
};

// function for adding a command
const addCommand = (obj, photo) => {
  const add =
    'INSERT INTO `command`(`command_type`, `reference`, `debit_account`, `credit_account`, `other_account`, `date`, `debit_amount`, `credit_amount`, `other_amount`, `details`,`photo`, `input_date`, `input_by`, `id_vat_num`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

  const command = [
    obj.commandType,
    obj.reference,
    Number(obj.debitAccount),
    Number(obj.creditAccount),
    obj.otherAccount,
    obj.date,
    Number(obj.debitAmount),
    Number(obj.creditAmount),
    Number(obj.otherAmount),
    obj.note,
    photo,
    new Date(),
    obj.connectedUser,
    obj.thisVatId,
  ];

  return new Promise((resolve, reject) => {
    con.query(add, command, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      // console.log('rows:', rows);
      resolve(rows);
    });
  });
};

const updatePhoto = (photo, user) => {
  const sqlPhoto =
    'UPDATE `photos` SET `input_date`=? WHERE `user_name`=? AND `name`=?';

  const data = [new Date(), user, photo];

  return new Promise((resolve, reject) => {
    con.query(sqlPhoto, data, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      // console.log('rows:', rows);
      resolve(rows);
    });
  });
};

const getBarChartData = (year, thisVatId) => {
  const sql =
    'SELECT year, ' +
    'month, ' +
    'COALESCE(SUM(expenses), 0) AS expenses, ' +
    'COALESCE(SUM(income), 0) AS income ' +
    'FROM (' +
    'SELECT YEAR(`date`) AS year, ' +
    'MONTH(`date`) AS month, ' +
    'SUM(debit_amount) AS expenses, ' +
    'NULL AS income ' +
    'FROM command ' +
    'WHERE id_vat_num=? ' +
    'AND debit_account BETWEEN 700 AND 900 ' +
    'AND `date` BETWEEN DATE_SUB("?-01-01", INTERVAL 12 MONTH) AND "?-01-02" ' +
    'AND `date` != "?-01-01" ' +
    'GROUP BY YEAR(`date`), MONTH(`date`) ' +
    'UNION ALL ' +
    'SELECT YEAR(`date`) AS year, ' +
    'MONTH(`date`) AS month, ' +
    'NULL AS expenses, ' +
    'SUM(credit_amount) AS income ' +
    'FROM command ' +
    'WHERE id_vat_num=? ' +
    'AND credit_account BETWEEN 300 AND 350 ' +
    'AND `date` BETWEEN DATE_SUB("?-01-01", INTERVAL 12 MONTH) AND "?-01-02" ' +
    'AND `date` != "?-01-01" ' +
    'GROUP BY YEAR(`date`), MONTH(`date`) ' +
    ') AS combined_data ' +
    'GROUP BY year, month; ';

  const data = [thisVatId, year, year, year, thisVatId, year, year, year];

  return new Promise((resolve, reject) => {
    con.query(sql, data, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      // console.log('rows:', rows);
      resolve(rows);
    });
  });
};

// handler the request of adding a command
router.post('/addCommand', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);

    try {
      const isExist = await checkDuplicates(obj.commandData);

      if (!isExist) {
        await addCommand(obj.commandData, obj.selectedDoc.name);
        if (obj.selectedDoc.name !== '') {
          await updatePhoto(obj.selectedDoc.name, obj.selectedCus);
        }
        res.end(JSON.stringify({ isAdd: true, message: 'פקודה נקלטה בהצלחה' }));
      } else {
        res.end(
          JSON.stringify({
            isAdd: false,
            message: 'פקודה חשודה ככפולה',
          })
        );
      }
    } catch (error) {
      console.error(error.message);
      console.log(error.message);
      res.end(
        JSON.stringify({
          isAdd: false,
          message: 'שגיאה משרת',
        })
      );
    }
  });
});

// send BarChartData
router.post('/barChartData', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);
    const result = await getBarChartData(obj.currentYear, obj.thisVatId)
    res.end(JSON.stringify(result));

  });
});

module.exports = router;
