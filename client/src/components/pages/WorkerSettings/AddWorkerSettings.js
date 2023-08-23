import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from '../Home/addCustomer.module.css';
import Button from '../../Button/Button';
import cssPopup from '../../AlertDialog/popupGeneral.module.css';
import {
  checkUserName,
  checkPassword,
  checkCusName,
} from '../../validations/validations.js';

export default function AddWorkerSettings(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [workerName, setWorkerName] = useState('');
  const [workerType, setWorkerType] = useState('');
  const [isActive, setIsActive] = useState(true);

  const createNewWorker = async () => {
    const addWorker = {
      userName,
      password,
      workerName,
      workerType,
      isActive,
    };

    fetch('/worker/addWorker', {
      method: 'POST',
      body: JSON.stringify(addWorker),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.isAdd) {
          toast.success(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
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
            type='text'
            name='workerName'
            placeholder='שם העובד'
            maxLength={30}
            onChange={e => setWorkerName(e.target.value)}
          ></input>
        </p>
        <p>
          *שם משתמש:
          <input
            type='email'
            name='userName'
            placeholder='מייל: xxx@yyy.zzz'
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
          תפקיד:
          <input
            type='text'
            name='workerType'
            placeholder='תפקיד'
            maxLength={20}
            onChange={e => setWorkerType(e.target.value)}
          ></input>
        </p>
        <div className={css.buttons}>
          <Button
            text='צור לקוח'
            fun={() => {
              createNewWorker();
              props.display(false);
            }}
            isDisable={
              !checkUserName(userName) ||
              !checkPassword(password) ||
              !checkCusName(workerName)
            }
          />
          <Button
            text='ביטול'
            fun={() => {
              props.display(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
