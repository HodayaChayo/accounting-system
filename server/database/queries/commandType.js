'use strict';

// this class handle all the requests about command type

const express = require('express');
const router = express.Router();
const con = require('../dbConnection');

// check the code of command type exist
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

// adding new command type to database
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
      obj.debitArr[i].isMain,
    ];
    console.log(debitData);

    con.query(addDebit, debitData, (err, rows) => {
      if (err) throw err;
    });

    i++;
  }

  i = 0;
  while (i < obj.creditArr.length) {
    console.log(obj.creditArr.length);
    let creditData = [
      obj.code,
      obj.thisVatId,
      Number(obj.creditArr[i].account),
      Number(obj.creditArr[i].percent),
      obj.name,
      obj.creditArr[i].isMain,
    ];
    console.log(creditData);

    con.query(addCredit, creditData, (err, rows) => {
      if (err) throw err;
    });

    i++;
  }
};

// get the data of the debit commandType
const getDebit = obj => {
  const debitQuery =
    'SELECT `debit_account`, `percent` FROM `command_type_debit` WHERE `code`=? AND `id_vat_num`=?';

  return new Promise((resolve, reject) => {
    con.query(debitQuery, [obj.commandType, obj.thisVatId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('rows:', rows);
      resolve(rows);
    });
  });
};

// get the data of the credit commandType
const getCredit = obj => {
  const creditQuery =
    'SELECT `credit_account`, `percent` FROM `command_type_credit` WHERE `code`=? AND `id_vat_num`=?';

  return new Promise((resolve, reject) => {
    con.query(creditQuery, [obj.commandType, obj.thisVatId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('rows:', rows);
      resolve(rows);
    });
  });
};

// add command type request handler
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
      } else {
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

// send data of existing command type to client
router.post('/getTableData', (req, res) => {
  const getSCommandType =
    'SELECT `code`, `name` FROM `command_type_credit` WHERE `id_vat_num`=? GROUP BY `code`';

  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    return new Promise((resolve, reject) => {
      con.query(getSCommandType, [obj.thisVatId], (err, rows) => {
        if (err) {
          reject(err);
        }
        res.end(JSON.stringify(rows));
        resolve();
      });
    });
  });
});

// get commandType list for select
router.post('/getSelectCommandType', (req, res) => {
  const selectData =
    'SELECT `code` AS value, CONCAT(`code`, "-", `name`) AS label FROM `command_type_credit` WHERE `id_vat_num`=? GROUP BY `code`';

  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    return new Promise((resolve, reject) => {
      con.query(selectData, [obj.thisVatId], (err, rows) => {
        if (err) {
          reject(err);
        }
        // console.log(rows);
        res.end(JSON.stringify(rows));
        resolve();
      });
    });
  });
});

// get debit and credit data for command calculation
router.post('/getCalculation', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    const resObj = await getDebit(obj);
    const add = await getCredit(obj);
    add.forEach(el => {
      resObj.push(el);
    });
    res.end(JSON.stringify(resObj));
    // console.log('res:', resObj);
  });
});

module.exports = router;
