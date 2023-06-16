'use strict';

const express = require('express');
const router = express.Router();
const con = require('../dbConnection');

// check if the sort code is already exist for this user
async function isCodeExist(sortCodeData) {
  const searchSortCode =
    'SELECT * FROM sort_code WHERE id_vat_num = ? AND number = ?';
  console.log(sortCodeData);
  return new Promise((resolve, reject) => {
    con.query(searchSortCode, sortCodeData, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('rows:', rows);
      resolve(rows.length != 0);
    });
  });
}

async function insertSortCode(sortCodeData) {
  const insert =
    'INSERT INTO `sort_code`(`id_vat_num`, `number`, `name`) VALUES (?,?,?)';
  console.log(sortCodeData);

  return new Promise((resolve, reject) => {
    con.query(insert, sortCodeData, (err, rows) => {
      if (err) {
        reject(err);
      }
      // console.log('in insert: ', rows);
      resolve();
    });
  });
}

// add sort cod to database and send a message if succeeded or not
router.post('/add', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);
    const checkObj = [obj.thisVatId, obj.codeNumber, obj.codeName];
    try {
      const codeExist = await isCodeExist(checkObj);
      if (!codeExist) {
        await insertSortCode(checkObj);
        res.end(
          JSON.stringify({ isAdd: true, message: 'קוד מיון נוסף בהצלחה' })
        );
      } else {
        res.end(
          JSON.stringify({
            isAdd: false,
            message: 'לא ניתן להוסיף קוד מיון שכבר קיים',
          })
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  });
});

// get all sort code data for a customer and send it to client
router.post('/getTableData', (req, res) => {
  const getSortCode =
    'SELECT `number`,`name` FROM `sort_code` WHERE `id_vat_num`=?';

  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    return new Promise((resolve, reject) => {
      con.query(getSortCode, [obj.thisVatId], (err, rows) => {
        if (err) {
          reject(err);
        }
        res.end(JSON.stringify(rows));
        resolve();
      });
    });
  });
});

// send sort code to select bar - when opening a new account
router.post('/getSelectData', (req, res) => {
  const selectData = 'SELECT `number` AS value, CONCAT(`number`,"-", `name`) AS lable FROM `sort_code` WHERE `id_vat_num`=?'

  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj.thisVatId);
    return new Promise((resolve, reject) => {
      con.query(selectData, [obj.thisVatId], (err, rows) => {
        if (err) {
          reject(err);
        }
        console.log(rows);
        res.end(JSON.stringify(rows));
        resolve();
      });
    });
  });

  
});

module.exports = router;
