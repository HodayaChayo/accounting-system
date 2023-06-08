import React, { useState } from 'react';
import css from './addCustomer.module.css';
import Button from '../../Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  checkUserName,
  checkPassword,
  checkCusName,
  checkPhone,
  checkVatId,
} from '../../validations/validations';

export default function AddCustomer(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [cusName, setCusName] = useState('');
  const [phone, setPhone] = useState('');
  const [idVAT, setIdVAT] = useState('');
  const [type, setType] = useState('dealer');
  const [VATFrequency, setVATFrequency] = useState('1');
  const [taxFrequency, setTaxFrequency] = useState('1');
  const [taxPercent, setTaxPercent] = useState('');
  const [manager, setManager] = useState('');
  const [note, setNote] = useState('');
  const [isCreated, setIsCreated] = useState(false);

  // send the new customer data to server, and return a message if customer created or not.
  const createNewCustomer = async () => {
    const addCus = {
      userName,
      password,
      cusName,
      phone,
      idVAT,
      type,
      VATFrequency,
      taxFrequency,
      taxPercent,
      // manager,
      note,
    };

    fetch('addCus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addCus),
    })
      .then(async res => res.json())
      .then(async res => {
        // console.log(res);
        if (res.isAdd) {
          // console.log('add!');
          // console.log(res.message);
          toast.success(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          // console.log('not add');
          // console.log(res.message);
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className={css.addPopup}>
      <h2>פתיחת לקוח חדש</h2>
      <h3>פרטי לקוח</h3>
      {/* <ToastContainer /> */}
      <div className={css.topForm}>
        <p>
          *שם משתמש:
          <input
            type='email'
            name='userName'
            placeholder='מייל: xxx@yyy.zzz'
            maxLength={35}
            onChange={e => setUserName(e.target.value)}
          ></input>
        </p>
        <p>
          *סיסמה:
          <input
            type='text'
            name='password'
            placeholder='סיסמה'
            maxLength={20}
            onChange={e => setPassword(e.target.value)}
          ></input>
        </p>
        <p>
          *שם עוסק:
          <input
            type='text'
            name='cusName'
            placeholder='שם עוסק'
            maxLength={30}
            onChange={e => setCusName(e.target.value)}
          ></input>
        </p>
        <p>
          *טלפון נייד:
          <input
            type='text'
            name='phone'
            placeholder='ללא סימני -'
            minLength={10}
            maxLength={10}
            onChange={e => setPhone(e.target.value)}
          ></input>
        </p>
        <p>
          *מספר עוסק / ח.פ:
          <input
            type='text'
            name='vatNum'
            placeholder='9 ספרות'
            minLength={9}
            maxLength={9}
            pattern='[0-9]'
            onChange={e => setIdVAT(e.target.value)}
          ></input>
        </p>
      </div>
      <h3>נתוני רשויות</h3>
      <div className={css.downForm}>
        <p>
          סוג עוסק:
          <select name='type' onChange={e => setType(e.target.value)}>
            <option label='עוסק מורשה' value='dealer'></option>
            <option label='חברה' value='company'></option>
            <option label='עוסק פטור' value='noVAT'></option>
          </select>
        </p>
        <p>
          תדירות מע"מ:
          <select
            name='VAT'
            onChange={e => setVATFrequency(e.target.value)}
            disabled={type === 'noVAT'}
          >
            <option label='חד חודשי' value='1'></option>
            <option label='דו חודשי' value='2'></option>
          </select>
        </p>
        <p>
          תדירות מ.ה:
          <select
            name='incomeTax'
            onChange={e => setTaxFrequency(e.target.value)}
          >
            <option label='חד חודשי' value='1'></option>
            <option label='דו חודשי' value='2'></option>
          </select>
        </p>
        <p>
          אחוז מקדמות:
          <input
            type='text'
            name='taxPercent'
            placeholder='אחוז מקדמות מ.ה'
            onChange={e => setTaxPercent(e.target.value)}
          ></input>
        </p>

        <p>
          עובד מטפל:
          <select name='manager' onChange={e => setManager(e.target.value)}>
            <option label='עובד מטפל - לא פעיל'></option>
          </select>
        </p>

        <p>
          הערות ללקוח:
          <textarea
            name='note'
            cols='30'
            rows='5'
            onChange={e => setNote(e.target.value)}
          ></textarea>
        </p>
      </div>
      {(!checkUserName(userName) ||
        !checkPassword(password) ||
        !checkCusName(cusName) ||
        !checkPhone(phone) ||
        !checkVatId) && <div>נא לוודא שהשדות חובה מלאים כראוי</div>}
      {(userName === '' ||
        password === '' ||
        cusName === '' ||
        phone === '' ||
        idVAT === '') && <div>נא לוודא שכל השדות חובה מלאים</div>}
      <div className={css.buttons}>
        <Button
          text='צור לקוח'
          fun={() => {
            createNewCustomer();
            props.display(false);
          }}
          isDisable={
            !checkUserName(userName) ||
            !checkPassword(password) ||
            !checkCusName(cusName) ||
            !checkPhone(phone) ||
            !checkVatId
          }
        />
        <Button
          text='ביטול'
          fun={() => {
            props.display(false);
          }}
        />
      </div>
    </div>
  );
}
