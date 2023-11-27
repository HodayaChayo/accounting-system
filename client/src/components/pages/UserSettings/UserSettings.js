import React, { useState, useEffect } from 'react';
import Sidebars from '../../Sidebars/Sidebars';
import css from './UserSettings.module.css';
import Footer from '../../Footer/Footer';
import Button from '../../Button/Button';
import Header from '../../Header/Header';
import { ToastContainer, toast } from 'react-toastify';
import ResetPassword from './ResetPassword';
import 'react-toastify/dist/ReactToastify.css';
import {
  checkUserName,
  checkPassword,
  checkCusName,
  checkPhone,
  checkVatId,
  checkTaxPercent,
} from '../../validations/validations';

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
  const [note, setNote] = useState('');
  const [display, setDisplay] = useState(false)
  const thisMail = localStorage.getItem('SelectedCus');
  const thisVatId = localStorage.getItem('CusVAT_Id');

  // A function that receives the new data and updates the new values in the database
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
      thisMail,
      thisVatId,
      note,
    };

    fetch('userSettings/updateCus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateCus),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.isUpDate) {
          toast.success(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          localStorage.setItem('SelectedCus', userName);
          localStorage.setItem('CusVAT_Id', idVAT);
        } else {
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch('/userSettings/getUserData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(thisMail),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setUserName(res[0].user_name);
        setCusName(res[0].name);
        setPhone(res[0].phone);
        setIdVAT(res[0].id_vat_num);
        setType(res[0].business_type);
        setTaxPercent(res[0].tax_income_percent);
        setTaxFrequency(res[0].tax_income_frequency);
        setVATFrequency(res[0].vat_frequency);
        setNote(res[0].note);
        setPassword(res[0].password);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className='body'>
      <ToastContainer />
      <Sidebars />
      {display && <ResetPassword setDisplay={setDisplay}/>}
      <Header title='הגדרות עוסק' />
      <h2>פרטי לקוח:</h2>
      <div className={css.userDetails}>
        <p className={css.p}>
          שם משתמש:
          <input
            value={userName}
            type='email'
            name='userName'
            placeholder='מייל: xxx@yyy.zzz'
            onChange={e => setUserName(e.target.value)}
          ></input>
        </p>
        <p className={css.p}>
          סיסמה:
          {/* <input
            value={password}
            type='text'
            name='password'
            placeholder='סיסמה חדשה'
            maxLength={20}
            onChange={e => setPassword(e.target.value)}
          ></input> */}
          <Button text='איפוס סיסמה' fun={()=>{setDisplay(true)}} />
        </p>
        <p className={css.p}>
          שם לקוח/חברה:
          <input
            value={cusName}
            type='text'
            name='cusName'
            maxLength={30}
            placeholder='שם לקוח/חברה'
            onChange={e => setCusName(e.target.value)}
          ></input>
        </p>
        <p className={css.p}>
          טלפון:
          <input
            value={phone}
            type='text'
            name='phone'
            maxLength={10}
            placeholder='טלפון נייד'
            onChange={e => setPhone(e.target.value)}
          ></input>
        </p>
        <p className={css.p}>
          ח.פ:
          <input
            value={idVAT}
            type='text'
            name='vatNum'
            maxLength={9}
            placeholder='מספר עוסק ח.פ'
            onChange={e => setIdVAT(e.target.value)}
          ></input>
        </p>
      </div>

      <h2>נתוני רשויות:</h2>
      <div className={css.AuthorityData}>
        <p className={css.p1}>
          סוג עוסק:
          <select
            value={type}
            name='type'
            onChange={e => setType(e.target.value)}
          >
            <option label='עוסק מורשה' value='מורשה'></option>
            <option label='חברה' value='חברה'></option>
            <option label='עוסק פטור' value='פטור'></option>
          </select>
        </p>
        <p className={css.p1}>
          תדירות מע"מ:
          <select
            value={VATFrequency}
            name='VAT'
            onChange={e => setVATFrequency(e.target.value)}
            disabled={type === 'פטור'}
          >
            <option label='חד חודשי' value='1'></option>
            <option label='דו חודשי' value='2'></option>
          </select>
        </p>
        <p className={css.p1}>
          תדירות מ.ה:
          <select
            value={taxFrequency}
            name='incomeTax'
            onChange={e => setTaxFrequency(e.target.value)}
          >
            <option label='חד חודשי' value='1'></option>
            <option label='דו חודשי' value='2'></option>
          </select>
        </p>
        <p className={css.p1}>
          *אחוז מקדמות:
          <input
            value={taxPercent}
            type='text'
            name='taxPercent'
            placeholder='אחוז מקדמות מ.ה'
            onChange={e => setTaxPercent(e.target.value)}
          ></input>
        </p>
        <p className={css.p1}>
          עובד מטפל:
          <select name='manager' onChange={e => setManager(e.target.value)}>
            <option label='עובד מטפל - לא פעיל'></option>
          </select>
        </p>
        <p className={css.p1}>
          הערות ללקוח:
          <textarea
            value={note}
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
        !checkVatId ||
        !checkTaxPercent(taxPercent)) && (
        <div className={css.errors}>נא לוודא שהשדות חובה מלאים כראוי</div>
      )}
      {(userName === '' ||
        password === '' ||
        cusName === '' ||
        phone === '' ||
        idVAT === '') && (
        <div className={css.errors}>נא לוודא שכל השדות חובה מלאים</div>
      )}
      <Button
        text='שמור'
        fun={() => {
          updateCustomer();
        }}
        isDisable={
          !checkUserName(userName) ||
          !checkPassword(password) ||
          !checkCusName(cusName) ||
          !checkPhone(phone) ||
          !checkVatId(idVAT) ||
          !checkTaxPercent(taxPercent)
        }
      ></Button>
      <main></main>
      <Footer />
    </div>
  );
}
