import React, { useState, useEffect } from 'react';
import Button from '../../Button/Button';
import css from './accounts.module.css';
import cssPopup from '../../AlertDialog/popupGeneral.module.css';
import { v4 as uuid } from 'uuid';
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
    { value: 'הוצאות', label: 'הוצאות' },
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
    { value: 'מע"מ רכוש קבוע', label: 'מע"מ רכוש קבוע' },
    { value: 'הוצאות רכוש קבוע', label: 'הוצאות רכוש קבוע' },
    { value: 'ניכוי במקור מלקוחות', label: 'ניכוי במקור מלקוחות' },
    { value: 'ניכוי במקור לספקים', label: 'ניכוי במקור לספקים' },
    { value: 'בנקים', label: 'בנקים' },
    { value: 'חו"ז כללי', label: 'חו"ז כללי' },
    { value: 'הון ועודפים', label: 'הון ועודפים' },
  ];

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
      .then(res => {
        console.log(res);
        if (res.isAdd) {
          toast.success(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          props.dataChange(prevValue => prevValue + 1);
          props.setDisplay(false);
        } else {
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      });
  };

  return (
    <div className={cssPopup.screen}>
      <div className={cssPopup.popup}>
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
          <p>
            *קוד מיון:
            <select
              name='sortCode'
              value={sortCode}
              onChange={e => {
                setSortCode(e.target.value);
              }}
            >
              {selectSortCode.map(el => {
                return (
                  <option
                    key={uuid()}
                    label={el.label}
                    value={el.value}
                  ></option>
                );
              })}
              <option label='בחר קוד מיון' value=''></option>
            </select>
          </p>
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
          <p>
            *סוג חשבון:
            <select
              name='type'
              value={accountType}
              onChange={e => {
                setAccountType(e.target.value);
              }}
            >
              {typeList.map(el => {
                return (
                  <option
                    key={uuid()}
                    label={el.label}
                    value={el.value}
                  ></option>
                );
              })}
              <option label='בחר סוג חשבון' value=''></option>
            </select>
          </p>
          <p>
            מספר עוסק / ח.פ:
            <input
              type='number'
              maxLength={9}
              placeholder='עבור ספקים/לקוחות/עובדים'
              onChange={e => {
                setVatId(e.target.value);
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
              accountType === '' ||
              (vatId !== '' && !checkVatId(vatId))
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
    </div>
  );
}
