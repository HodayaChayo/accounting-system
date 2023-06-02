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
  const [VATFrequency, setVATFrequency] = useState('one');
  const [taxFrequency, setTaxFrequency] = useState('one');
  const [taxPercent, setTaxPercent] = useState('');
  const [manager, setManager] = useState('');
  const [note, swtNote] = useState('');

  const checkCusName = cusName => {
    if (cusName.length() > 0 && cusName.length() <= 30) {
      setCusName(cusName);
    }
  };

  const tryPhone = e => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex

    if (e.target.value === '' || re.test(e.target.value)) {
      setPhone(e.target.value);
    }
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

  const creatNewCustomer = () => {};

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
            onChange={e => setUserName(e.target.value)}
          ></input>
        </p>
        <p>
          *סיסמה:
          <input
            type='text'
            name='password'
            placeholder='סיסמה'
            onChange={e => setPassword(e.target.value)}
          ></input>
        </p>
        <p>
          *שם עוסק:
          <input
            type='text'
            name='cusName'
            placeholder='שם עוסק'
            onChange={e => tryPhone(e)}
          ></input>
        </p>
        <p>
          *טלפון נייד:
          <input
            type='text'
            name='phone'
            placeholder='טלפון נייד'
            onChange={e => setPhone(e.target.value)}
          ></input>
        </p>
        <p>
          *מספר עוסק / ח.פ:
          <input
            type='text'
            name='vatNum'
            placeholder='מספר עוסק / ח.פ'
            onChange={e => setIdVAT(e.target.value)}
          ></input>
        </p>
      </div>
      <h3>נתוני רשויות</h3>
      <div className={css.downForm}>
        <p>
          סוג עוסק:
          <select name='type'>
            <option label='עוסק מורשה' value='dealer'></option>
            <option label='חברה' value='company'></option>
            <option label='עוסק פטור' value='noVAT'></option>
          </select>
        </p>
        <p>
          תדירות מע"מ:
          <select name='VAT' onChange={e => setVATFrequency(e.target.value)}>
            <option label='חד חודשי' value='one'></option>
            <option label='דו חודשי' value='two'></option>
          </select>
        </p>
        <p>
          תדירות מ.ה:
          <select
            name='incomeTax'
            onChange={e => setTaxFrequency(e.target.value)}
          >
            <option label='חד חודשי' value='one'></option>
            <option label='דו חודשי' value='two'></option>
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
          <textarea name='note' cols='30' rows='5'></textarea>
        </p>
      </div>

      <div className={css.buttons}>
        <Button
          text='צור לקוח'
          fun={() => {
            props.display(false);
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
