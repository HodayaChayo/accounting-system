import React, { useState, useEffect } from 'react';
import Sidebars from '../../Sidebars/Sidebars';

export default function UserSettings(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [cusName, setCusName] = useState('');
  const [phone, setPhone] = useState('');
  const [idVAT, setIdVAT] = useState('');
  const [type, setType] = useState('מורשה');
  const [VATFrequency, setVATFrequency] = useState('1');
  const [taxFrequency, setTaxFrequency] = useState('1');
  const [taxPercent, setTaxPercent] = useState('');
  const [manager, setManager] = useState('');

  const thisVatId = localStorage.getItem('CusVAT_Id');

  const updateCustomer = async () => {
    const updateCus = {
      userName,
      password,
      cusName,
      phone,
      idVAT,
      type,
      VATFrequency,
      taxFrequency,
      taxPercent,
      manager,
    };

  };
  useEffect(() => {
    fetch('/getUserSettings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ thisVatId }),
    })
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className='body'>
      <Sidebars />
      <h1>הגדרות עוסק</h1>
      <h2>פרטי לקוח</h2>
      <input
        type='email'
        name='userName'
        placeholder='מייל: xxx@yyy.zzz'
        onChange={e => setUserName(e.target.value)}
      ></input>
      <input
        type='text'
        name='password'
        placeholder='סיסמה'
        onChange={e => setPassword(e.target.value)}
      ></input>
      <input
        type='text'
        name='cusName'
        placeholder='שם לקוח/חברה'
        onChange={e => setCusName(e.target.value)}
      ></input>
      <input
        type='text'
        name='phone'
        placeholder='טלפון נייד'
        onChange={e => setPhone(e.target.value)}
      ></input>
      <input
        type='text'
        name='vatNum'
        placeholder='מספר עוסק ח.פ'
        onChange={e => setIdVAT(e.target.value)}
      ></input>
      <h2>נתוני רשויות</h2>
      <p>
        סוג עוסק:
        <select name='type' onChange={e => setType(e.target.value)}>
          <option label='עוסק מורשה' value='מורשה'></option>
          <option label='חברה' value='חברה'></option>
          <option label='עוסק פטור' value='פטור'></option>
        </select>
      </p>
      <p>
        תדירות מע"מ:
        <select
          name='VAT'
          onChange={e => setVATFrequency(e.target.value)}
          disabled={type === 'פטור'}
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
        *אחוז מקדמות:
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
    </div>
  );
}
