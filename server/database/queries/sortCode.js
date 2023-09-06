'use strict';

// this class handle all the requests about sort code

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

// insert sort code to database
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

// update sort code in database
const updateSortCode = async obj => {
  const update =
    'UPDATE `sort_code` SET `number`=?,`name`=? WHERE `id_vat_num`=? AND `number`=?';
  console.log(obj);
  return new Promise((resolve, reject) => {
    con.query(
      update,
      [obj.codeNumber, obj.codeName, obj.thisVatId, obj.selectedCode],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve();
      }
    );
  });
};

// use to check if sort code have accounts before deleting
const isCodeHaveAccounts = (obj) => {
  const check = 'SELECT * FROM `accounts` WHERE `id_vat_num`=? AND `sort_code`=?'
  return new Promise((resolve, reject) => {
    con.query(
      check,
      [obj.thisVatId, obj.number],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows.length != 0);
      }
    );
  });
};

// delete sort code from database
const deleteSortCode = async obj => {
  const deleteCode =
    'DELETE FROM `sort_code` WHERE `id_vat_num`=? AND `number`=?';

  con.query(deleteCode, [obj.thisVatId, obj.number], (err, rows) => {
    if (err) {
      throw err;
    }
  });
};

// add sort code to database and send a message if succeeded or not
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
  const selectData =
    'SELECT `number` AS value, CONCAT(`number`,"-", `name`) AS label FROM `sort_code` WHERE `id_vat_num`=?';

  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    // console.log(obj.thisVatId);
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

// handel the request to update sort code
router.post('/updateSortCode', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);
    try {
      if (obj.codeNumber !== obj.selectedCode) {
        const exist = await isCodeExist([obj.thisVatId, obj.codeNumber]);
        if (exist) {
          res.end(
            JSON.stringify({
              isUpdate: false,
              message: 'לא ניתן לעדכן לקוד מיון שכבר קיים',
            })
          );
        }
      }
      await updateSortCode(obj);
      res.end(
        JSON.stringify({
          isUpdate: true,
          message: 'קוד מיון עודכן בהצלחה',
        })
      );
    } catch (error) {
      console.error(error.message);
      res.end(
        JSON.stringify({
          isUpdate: false,
          message: 'שגיאה משרת',
        })
      );
    }
  });
});

// handel request to delete sort code
router.post('/delete', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    // console.log(obj);
    try {
      const haveAccounts = await isCodeHaveAccounts(obj)
      if(!haveAccounts){
        await deleteSortCode(obj);
        res.end(
          JSON.stringify({
            isDelete: true,
            message: 'קוד מיון נמחק בהצלחה',
          })
        );
      }else{
        res.end(
          JSON.stringify({
            isDelete: false,
            message: 'לא ניתן למחוק קוד מיון שמשוייכים אליו חשבונות',
          })
        );
      }
    } catch (error) {
      console.error(error.message);
      res.end(
        JSON.stringify({
          isDelete: false,
          message: 'שגיאה משרת',
        })
      );
    }
  });
});

module.exports = router;
