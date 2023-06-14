'use strict';

const express = require('express');
const router = express.Router();
const con = require('../dbConnection');
const { resolve } = require('path');
const { rejects } = require('assert');
const { error } = require('console');

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

router.post('/', (req, res) => {
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

module.exports = router;
