import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuid } from 'uuid';
import css from '../Home/addCustomer.module.css';
import Button from '../../Button/Button';
import cssPopup from '../../AlertDialog/popupGeneral.module.css';
import {
  checkUserName,
  checkPassword,
  checkCusName,
} from '../../validations/validations.js';

export default function EditWorkerSettings(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [workerName, setWorkerName] = useState('');
  const [workerType, setWorkerType] = useState('');
  const [isActive, setIsActive] = useState('');
  const [mailSelected, setMailSelected] = useState('');
  const sentUserName = props.selectedUserRow;

  useEffect(() => {
    fetch('/worker/getSelectedWorkerData', {
      method: 'POST',
      body: JSON.stringify({ sentUserName }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        setWorkerType(res.worker_type);
        // console.log(res);
        setUserName(res.user_name);
        setPassword(res.password);
        setWorkerName(res.full_name);
        setIsActive(res.is_active);

        // console.log(workerType);
      });
  }, []);

  const editWorker = async () => {
    const editWorker = {
      userName,
      password,
      workerName,
      workerType,
      isActive,
      sentUserName
    };

    fetch('/worker/editWorker', {
      method: 'POST',
      body: JSON.stringify(editWorker),
    })
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        if (res.isUpDate) {
          toast.success(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          props.dataChange(prevValue => prevValue + 1);
          // props.setDisplay(false);
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
        <p>
          *שם העובד:
          <input
            value={workerName}
            type='text'
            name='workerName'
            placeholder='שם העובד'
            maxLength={30}
            onChange={e => setWorkerName(e.target.value)}
          ></input>
        </p>
        <p>
          שם משתמש:
          <input
            value={userName}
            type='email'
            name='userName'
            placeholder='מייל: xxx@yyy.zzz'
            maxLength={35}
            onChange={e => setUserName(e.target.value)}
          ></input>
        </p>
        <p>
          סיסמה:
          <input
            value={password}
            type='text'
            name='password'
            placeholder='סיסמה'
            maxLength={20}
            onChange={e => setPassword(e.target.value)}
          ></input>
        </p>
        <p>
          תפקיד:
          <select
            name='workerType'
            value={workerType}
            onChange={e => {
              setWorkerType(e.target.value);
            }}
          >
            <option label='בחר סוג עובד' value='null'></option>
            <option value='עובד' label='עובד'></option>
            <option value='מנהל ' label='מנהל'></option>
          </select>
        </p>
        <p>
          פעיל/לא פעיל:
          <select
            name='isActive'
            value={isActive}
            onChange={e => {
              setIsActive(e.target.value);
            }}
          >
            <option label='בחר סטאטוס עובד' value='null'></option>
            <option value='פעיל' label='פעיל'></option>
            <option value='לא פעיל' label='לא פעיל'></option>
          </select>
        </p>
        <div className={css.buttons}>
          <Button
            text='עדכן עובד'
            fun={() => {
              editWorker();
              props.displayEdit(false);
            }}
            isDisable={
              !checkUserName(userName) ||
              !checkPassword(password) ||
              !checkCusName(workerName) ||
              workerType === 'null' ||
              isActive === 'null'
            }
          />
          <Button
            text='ביטול'
            fun={() => {
              props.displayEdit(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
