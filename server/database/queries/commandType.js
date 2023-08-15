'use strict';

const express = require('express');
const router = express.Router();
const con = require('../dbConnection');

const isCodeExist = (idVat, code) => {
  const searchSortCode =
    'SELECT * FROM `command_type_credit` WHERE `id_vat_num`=? AND `code`=?';

  return new Promise((resolve, reject) => {
    con.query(searchSortCode, [idVat, code], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('rows:', rows);
      resolve(rows.length != 0);
    });
  });
};

const AddCommandType = obj => {
  const addDebit =
    'INSERT INTO `command_type_debit`(`code`, `id_vat_num`, `debit_account`, `percent`, `name`, `is_main`) VALUES (?,?,?,?,?,?)';

  const addCredit =
    'INSERT INTO `command_type_credit`(`code`, `id_vat_num`, `credit_account`, `percent`, `name`, `is_main`) VALUES (?,?,?,?,?,?)';

  let i = 0;
  while (i < obj.debitArr.length) {
    console.log(obj.debitArr.length);
    let debitData = [
      obj.code,
      obj.thisVatId,
      Number(obj.debitArr[i].account),
      Number(obj.debitArr[i].percent),
      obj.name,
      obj.debitArr[i].isMain
    ];
    console.log(debitData);

    con.query(addDebit, debitData, (err, rows)=>{
      if(err) throw err
    })

    i++;
  }

  i=0;
  while (i < obj.creditArr.length) {
    console.log(obj.creditArr.length);
    let creditData = [
      obj.code,
      obj.thisVatId,
      Number(obj.creditArr[i].account),
      Number(obj.creditArr[i].percent),
      obj.name,
      obj.creditArr[i].isMain
    ];
    console.log(creditData);

    con.query(addCredit, creditData, (err, rows)=>{
      if(err) throw err
    })

    i++;
  }

};

router.post('/add', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);
    try {
      const isExist = await isCodeExist(obj.thisVatId, obj.code);

      if (!isExist) {
        await AddCommandType(obj);
        res.end(
          JSON.stringify({ isAdd: true, message: 'סוג פקודה נוסף בהצלחה' })
        );
      }else {
        res.end(
          JSON.stringify({
            isAdd: false,
            message: 'לא ניתן להוסיף סוג פקודה עם קוד שכבר קיים',
          })
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  });
});

module.exports = router;
