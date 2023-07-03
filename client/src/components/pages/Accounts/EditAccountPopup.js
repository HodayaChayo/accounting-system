import React, { useState, useEffect, useRef } from 'react';
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

export default function EditAccountPopup(props) {
  const thisVatId = localStorage.getItem('CusVAT_Id');
  const [selectSortCode, setSelectSortCode] = useState([]);
  const [accountNumber, setAccountNumber] = useState('');
  const [sortCodeValue, setSortCodeValue] = useState('');
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
        setSelectSortCode(res);
      });
  }, []);

  // get selected account data from database
  useEffect(() => {
    const selectedNum = props.selectedRow.number;
    const selectedSort = props.selectedRow.sort_code;
    fetch('/accounts/selectedAccountData', {
      method: 'POST',
      body: JSON.stringify({ thisVatId, selectedNum, selectedSort }),
    })
      .then(async res => await res.json())
      .then(async res => {
        setAccountNumber(res.number);
        setSortCodeValue(res.sort_code);
        setAccountName(res.name);
        setAccountType(res.type);
        setSortCodeValue(res.sort_code);
        setVatId(res.vat_number);
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

  // send data to server to save changes
  const updateAccount = () => {
    const sortCode = Number(sortCodeValue);
    const selectedNum = props.selectedRow.number;
    const accountObj = {
      accountNumber,
      thisVatId,
      selectedNum,
      accountName,
      sortCode,
      accountType,
      vatId,
    };

    fetch('/accounts/updateAccount', {
      method: 'POST',
      body: JSON.stringify(accountObj),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.isUpdate) {
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
        <h2>עדכון חשבון</h2>
        <div>
          <p>
            *מספר חשבון:{' '}
            <input
              value={accountNumber}
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
              value={sortCodeValue}
              onChange={e => {
                setSortCodeValue(e.target.value);
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
            </select>
          </p>
          <p>
            *שם חשבון:{' '}
            <input
              value={accountName}
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
            </select>
          </p>
          <p>
            מספר עוסק / ח.פ:
            <input
              value={vatId}
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
            text='שמור'
            isDisable={
              !numbersOnly(accountNumber) ||
              sortCodeValue === '' ||
              !checkCusName(accountName) ||
              accountType === '' ||
              (vatId !== '' && !checkVatId(vatId))
            }
            fun={updateAccount}
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
