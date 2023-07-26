'use strict';

const express = require('express');
const router = express.Router();
const con = require('../dbConnection');

// check if account exist before adding
const isAccountExist = async obj => {
  const data = [obj.thisVatId, Number(obj.accountNumber)];
  const searchAccount =
    'SELECT * FROM `accounts` WHERE `id_vat_num`=? AND `number`=?';

  return new Promise((resolve, reject) => {
    con.query(searchAccount, data, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('rows:', rows);
      resolve(rows.length != 0);
    });
  });
};

// insert account to database
const insertAccount = object => {
  const data = [
    Number(object.accountNumber),
    object.thisVatId,
    object.accountName,
    object.sortCode,
    object.accountType,
    object.vatId,
  ];

  const insertSql =
    'INSERT INTO `accounts`(`number`, `id_vat_num`, `name`, `sort_code`, `type`, `vat_number`) VALUES (?,?,?,?,?,?)';

  return new Promise((resolve, reject) => {
    con.query(insertSql, data, (err, rows) => {
      if (err) {
        reject(err);
      }
      console.log(rows.affectedRows);
      resolve();
    });
  });
};

// update account data
const updateAccount = obj => {
  const update =
    'UPDATE `accounts` SET `number`=? ,`name`=? ,`sort_code`=?,`type`=?,`vat_number`=? WHERE `id_vat_num`=? AND `number`=?';

  const updateData = [
    Number(obj.accountNumber),
    obj.accountName,
    obj.sortCode,
    obj.accountType,
    obj.vatId,
    obj.thisVatId,
    obj.selectedNum,
  ];

  return new Promise((resolve, reject) => {
    con.query(update, updateData, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

// check if account have connected commands before delete
const haveCommands = obj => {
  const check =
    'SELECT * FROM `command` WHERE `id_vat_num`=? AND `duty_account`=? OR `credit_account`=?';

  return new Promise((resolve, reject) => {
    con.query(check, [obj.thisVatId, obj.number, obj.number], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows.length !== 0);
    });
  });
};

// delete account from database
const deleteAccount = obj => {
  const deleteAccount =
    'DELETE FROM `accounts` WHERE `id_vat_num` = ? AND `number`=?';

  return new Promise((resolve, reject) => {
    con.query(deleteAccount, [obj.thisVatId, obj.number], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

// handel the request to add account and return message if succeeded or not
router.post('/createAccount', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);
    try {
      const isExist = await isAccountExist(obj);
      if (!isExist) {
        await insertAccount(obj);
        res.end(
          JSON.stringify({ isAdd: true, message: 'חשבון חדש נוסף בהצלחה' })
        );
      } else {
        res.end(
          JSON.stringify({
            isAdd: false,
            message: 'לא ניתן להוסיף, מספר חשבון זה כבר קיים במערכת',
          })
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  });
});

// send account table data to client
router.post('/getAccountsTable', (req, res) => {
  const getAccounts =
    'SELECT `sort_code`, `number`, `name` FROM `accounts` WHERE `id_vat_num`=?';
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    // console.log(obj);
    return new Promise((resolve, reject) => {
      con.query(getAccounts, [obj], (err, rows) => {
        if (err) {
          reject(err);
        }
        res.end(JSON.stringify(rows));
        resolve();
      });
    });
  });
});

// send the data of the selected account on edit button
router.post('/selectedAccountData', (req, res) => {
  const selectedData =
    'SELECT accounts.number, accounts.id_vat_num, accounts.name, accounts.sort_code, CONCAT(sort_code.number,"-", sort_code.name) AS sort_codeName, accounts.type, accounts.vat_number FROM `accounts`, `sort_code` WHERE accounts.id_vat_num=? AND accounts.number=? and sort_code.id_vat_num=? AND sort_code.number=?';

  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    // console.log(obj);
    return new Promise((resolve, reject) => {
      con.query(
        selectedData,
        [obj.thisVatId, obj.selectedNum, obj.thisVatId, obj.selectedSort],
        (err, rows) => {
          if (err) {
            reject(err);
          }
          // console.log('result--',rows);
          res.end(JSON.stringify(rows[0]));
          resolve();
        }
      );
    });
  });
});

// handel the request to update account data
router.post('/updateAccount', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);
    try {
      if (obj.selectedNum !== Number(obj.accountNumber)) {
        const exist = await isAccountExist(obj);
        if (exist) {
          res.end(
            JSON.stringify({
              isUpdate: false,
              message: 'לא ניתן לעדכן למספר חשבון שכבר קיים במערכת',
            })
          );
        }
      }
      await updateAccount(obj);
      res.end(
        JSON.stringify({
          isUpdate: true,
          message: 'החשבון עודכן בהצלחה',
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

// handel the request to delete account
router.post('/delete', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    console.log(obj);
    try {
      const isHaveCommands = await haveCommands(obj);
      if (isHaveCommands) {
        res.end(
          JSON.stringify({
            isDeleted: false,
            message: 'לא ניתן למחוק חשבון שקיימים לו פקודות במערכת',
          })
        );
      }
      await deleteAccount(obj);
      res.end(
        JSON.stringify({
          isDeleted: true,
          message: 'חשבון נמחק בהצלחה',
        })
      );
    } catch (error) {
      console.error(error.message);
      res.end(
        JSON.stringify({
          isDeleted: false,
          message: 'שגיאה משרת',
        })
      );
    }
  });
});

router.post('/getSelectData', (req, res) => {
  const selectData = 'SELECT `number` AS value, CONCAT(`number`, "-", `name`) AS label FROM `accounts` WHERE `id_vat_num`=?'

  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);
    return new Promise((resolve, reject)=>{
      con.query(selectData, [obj.thisVatId], (err, rows) => {
        if (err) {
          reject(err);
        }
        // console.log(rows);
        res.end(JSON.stringify(rows));
        resolve();
      });
    })
  });
});

module.exports = router;
