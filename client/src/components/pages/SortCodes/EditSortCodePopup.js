import React, { useState, useEffect } from 'react';
import css from './sortCodes.module.css';
import Button from '../../Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkCusName, numbersOnly } from '../../validations/validations';

export default function EditSortCodePopup(props) {
  const thisVatId = localStorage.getItem('CusVAT_Id');
  const [codeNum, setCodeNum] = useState(props.selectedRow.number);
  const [codeName, setCodeName] = useState(props.selectedRow.name);

  const updateSortCode = () => {
    const selectedCode = props.selectedRow.number;
    const codeNumber = Number(codeNum);
    fetch('/sortCode/updateSortCode', {
      method: 'POST',
      body: JSON.stringify({ thisVatId, selectedCode, codeNumber, codeName }),
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
    <div className={css.popup}>
      <h2>עדכון קוד מיון</h2>
      <form action=''>
        <p>
          מספר:{' '}
          <input
            value={codeNum}
            type='number'
            placeholder='מספר קוד מיון'
            onChange={e => {
              setCodeNum(e.target.value);
            }}
          />
        </p>
        <p>
          שם:{' '}
          <input
            value={codeName}
            type='text'
            maxLength={20}
            placeholder='שם קוד מיון'
            onChange={e => {
              setCodeName(e.target.value);
            }}
          />
        </p>
        <div className={css.buttons}>
          <Button
            text='שמור'
            isDisable={!checkCusName(codeName) || !numbersOnly(codeNum)}
            fun={() => {
              updateSortCode();
            }}
          />
          <Button
            text='ביטול'
            fun={() => {
              props.setDisplay(false);
            }}
          />
        </div>
      </form>
    </div>
  );
}
