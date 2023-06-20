import React, { useState, useEffect } from 'react';
import Button from '../../Button/Button';
import css from './accounts.module.css';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  numbersOnly,
  checkCusName,
  checkVatId,
} from '../../validations/validations';

export default function AddAccountPopup(props) {
  const thisVatId = localStorage.getItem('CusVAT_Id');
  const [selectSortCode, setSelectSortCode] = useState([]);
  const [accountNumber, setAccountNumber] = useState('');
  const [sortCode, setSortCode] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [vatId, setVatId] = useState('');

  // get sort code list for select from the database
  useEffect(() => {
    fetch('/sortCode/getSelectData', {
      method: 'POST',
      body: JSON.stringify({ thisVatId }),
    })
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        setSelectSortCode(res);
      });
  }, []);

  // close list of options for select type
  const typeList = [
    { value: 'ספקים', label: 'ספקים' },
    { value: 'לקוחות', label: 'לקוחות' },
    { value: 'עובדים', label: 'עובדים' },
    { value: 'ספק רש"פ', label: 'ספק רש"פ' },
    { value: 'ספק חשבונית עצמית', label: 'ספק חשבונית עצמית' },
    { value: 'הכנסות חייבות במע"מ', label: 'הכנסות חייבות במע"מ' },
    { value: 'הכנסות פטורות ממע"מ', label: 'הכנסות פטורות ממע"מ' },
    {
      value: 'הכנסות חייבות במע"מ ופטורות ממס הכנסה',
      label: 'הכנסות חייבות במע"מ ופטורות ממס הכנסה',
    },
    { value: 'מע"מ עסקאות', label: 'מע"מ עסקאות' },
    { value: 'מע"מ תשומות', label: 'מע"מ תשומות' },
    { value: 'רכוש קבוע', label: 'רכוש קבוע' },
    { value: 'ניכוי במקור מלקוחות', label: 'ניכוי במקור מלקוחות' },
    { value: 'ניכוי במקור לספקים', label: 'ניכוי במקור לספקים' },
    { value: 'בנקים', label: 'בנקים' },
    { value: 'חו"ז כללי', label: 'חו"ז כללי' },
    { value: 'הון ועודפים', label: 'הון ועודפים' },
  ];

  // select style:
  const selectStyle = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#9e9e9e',
      minHeight: '25px',
      height: '25px',
      // maxWidth: '180px',
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '25px',
      padding: '0 4px',
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '25px',
    }),
  };

  // send data to server to create new account
  const createNewAccount = () => {
    const accountObj = {
      accountNumber,
      thisVatId,
      accountName,
      sortCode,
      accountType,
      vatId,
    };

    fetch('/accounts/createAccount', {
      method: 'POST',
      body: JSON.stringify(accountObj),
    })
      .then(res => res.json())
      .then(res =>{
        console.log(res);
        if(res.isAdd){
          toast.success(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          props.dataChange((prevValue) => prevValue + 1)
          props.setDisplay(false);
        }else{
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }

      });
  };

  return (
    <div className={css.popup}>
      <h2>הוספת חשבון</h2>
      <div>
        <p>
          *מספר חשבון:{' '}
          <input
            type='number'
            placeholder='מספר חשבון'
            onChange={e => {
              setAccountNumber(e.target.value);
            }}
          />
        </p>
        <p>*קוד מיון:</p>
        <Select
          options={selectSortCode}
          styles={selectStyle}
          placeholder='בחר קוד מיון'
          onChange={e => {
            setSortCode(e.value);
          }}
        />
        <p>
          *שם חשבון:{' '}
          <input
            type='text'
            placeholder='שם חשבון'
            maxLength={35}
            onChange={e => {
              setAccountName(e.target.value);
            }}
          />
        </p>
        <p>*סוג חשבון: </p>
        <Select
          options={typeList}
          styles={selectStyle}
          placeholder='בחר סוג חשבון'
          onChange={e => {
            setAccountType(e.value);
          }}
        />
        <p>
          מספר עוסק / ח.פ:
          <input
            type='number'
            placeholder='עבור ספקים/לקוחות/עובדים'
            onChange={e => {
              setAccountType(e.target.value);
            }}
          />
        </p>
      </div>
      <div className={css.buttons}>
        <Button
          text='הוספה'
          isDisable={
            !numbersOnly(accountNumber) ||
            sortCode === '' ||
            !checkCusName(accountName) ||
            accountType === ''
          }
          fun={createNewAccount}
        />
        <Button
          text='ביטול'
          fun={() => {
            props.setDisplay(false);
          }}
        />
      </div>
    </div>
  );
}
