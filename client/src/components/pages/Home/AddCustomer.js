import React, { useState } from 'react';
import css from './addCustomer.module.css';
import Button from '../../Button/Button';

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

  const checkCusName = cusName => {
    if (cusName.length() > 0 && cusName.length() <= 30) {
      setCusName(cusName);
    }
  };

  const tryPhone = e => {
    const re = /^[0-9\b]+$/;

    setPhone(e.target.value.replace(/[^A-Za-z\d]/gi, ''));

    // if value is not blank, then test the regex

    // if (e.target.value === '' || re.test(e.target.value)) {
    //   setPhone(e.target.value);
    // }
    console.log(phone);
  };

  const checkPhoneNumber = phone => {
    if (phone.match('[0-9]{10}')) {
      return true;
    } else {
      return false;
    }
  };

  // console.log(checkPhoneNumber('787'));

  const createNewCustomer = () => {
    console.log('in create');
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
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.isAdd) {
          console.log('add!');
        } else {
          console.log('not add');
          console.log(res.message);
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
      <div className={css.topForm}>
        <p>
          *שם משתמש:
          <input
            type='email'
            name='userName'
            placeholder='שם משתמש'
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
            placeholder='טלפון נייד'
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
            placeholder='מספר עוסק / ח.פ'
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
          <select name='VAT' onChange={e => setVATFrequency(e.target.value)}>
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
          <textarea name='note' cols='30' rows='5' onChange={e => setNote(e.target.value)}></textarea>
        </p>
      </div>

      <div className={css.buttons}>
        <Button
          text='צור לקוח'
          fun={() => {
            props.display(false);
            createNewCustomer()
          }}
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
