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
  const [isActive, setIsActive] = useState(true);
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
        console.log(res);
        setUserName(res.user_name);
        setPassword(res.password);
        setWorkerName(res.full_name);
        // setWorkerType("עובד");

        console.log(workerType);
      });
  }, []);

  const editWorker = async () => {
    const editWorker = {
      userName,
      password,
      workerName,
      workerType,
      isActive,
    };

    fetch('/worker/editWorker', {
      method: 'POST',
      body: JSON.stringify(editWorker),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.isAdd) {
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
            {/* <option
              value='מנהל'
              label='מנהל'
              selected={workerType === 'מנהל'}
            ></option>
            <option
              value='עובד'
              label='עובד'
              selected={workerType === 'עובד'}
            ></option> */}
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
              workerType === 'null'
            }
          />
          <Button
            text='ביטול'
            fun={() => {
              props.displayEdit(false);
              console.log(workerType);
            }}
          />
        </div>
      </div>
    </div>
  );
}
