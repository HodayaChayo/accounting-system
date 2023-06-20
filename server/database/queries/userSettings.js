const express = require('express');
const router = express.Router();
const con = require('../dbConnection');

router.post('/getUserData', (req, res) => {
  const getSettings =
    'SELECT customers.user_name, users.password, customers.id_vat_num, customers.name, customers.phone, customers.business_type, customers.vat_frequency, customers.tax_income_frequency, customers.tax_income_percent, customers.note FROM customers, users WHERE customers.user_name=? AND users.user_name=?';

  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    const obj = JSON.parse(body);

    return new Promise((resolve, reject) => {
      con.query(getSettings, [obj, obj], (err, rows) => {
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

async function isUserExist(userName) {
  const selectUser = 'SELECT * FROM users WHERE user_name = ?';

  return new Promise((resolve, reject) => {
    con.query(selectUser, [userName], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('rows:', rows);
      resolve(rows.length != 0);
    });
  });
}

async function isVatIdExist(vatId) {
  const selectId = 'SELECT id_vat_num FROM customers WHERE id_vat_num=?';

  return new Promise((resolve, reject) => {
    con.query(selectId, [vatId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('rows:', rows);
      resolve(rows.length != 0);
    });
  });
}

async function canUpdate(obj) {
  if (obj.thisMail !== obj.userName) {
    const exist = await isUserExist(obj.userName);

    if (exist) {
      return false;
    }
  }
  if (obj.thisVatId !== obj.idVAT) {
    const vatExist = await isVatIdExist(obj.idVAT);

    if (vatExist) {
      return false;
    }
  }

  return true;
}

function upDateCustomer(cusObj) {
  const userUpDate =
    'UPDATE `customers` SET `user_name`=?,`id_vat_num`=?,`name`=?,`phone`=?,`business_type`=?,`vat_frequency`=?,`tax_income_frequency`=?,`tax_income_percent`=?,`note`=? WHERE `user_name`=?';

  const cusValues = [
    cusObj.userName,
    cusObj.idVAT,
    cusObj.cusName,
    cusObj.phone,
    cusObj.type,
    cusObj.VATFrequency,
    cusObj.taxFrequency,
    Number(cusObj.taxPercent),
    cusObj.note,
    cusObj.thisMail,
  ];

  return new Promise((resolve, reject) => {
    con.query(userUpDate, cusValues, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

router.post('/updateCus', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    try {
      const obj = JSON.parse(body);
      console.log(obj);
      if (canUpdate) {
        await upDateCustomer(obj);
        
        res.end(
          JSON.stringify({ isUpDate: true, message: 'השינויים בוצעו בהצלחה!' })
        );
      } else {
        console.log('not upDate');
        res.end(
          JSON.stringify({
            isUpDate: false,
            message: 'לא ניתן לעדכן שם משתמש או מספר עוסק לנתונים שכבר קיימים!',
          })
        );
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

module.exports = router;
