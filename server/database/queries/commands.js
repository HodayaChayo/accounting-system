'use strict';

const express = require('express');
const router = express.Router();
const con = require('../dbConnection');

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

const addCommand = obj => {
  const add =
    'INSERT INTO `command`(`command_type`, `reference`, `debit_account`, `credit_account`, `other_account`, `date`, `debit_amount`, `credit_amount`, `other_amount`, `details`, `input_date`, `input_by`, `id_vat_num`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';

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
      console.log('rows:', rows);
      resolve(rows);
    });
  });
};

router.post('/addCommand', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);

    try {
      const isExist = await checkDuplicates(obj);

      if (!isExist) {
        await addCommand(obj);
        res.end(
          JSON.stringify({ isAdd: true, message: 'פקודה נקלטה בהצלחה' })
        );
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
    }
  });
});

module.exports = router;