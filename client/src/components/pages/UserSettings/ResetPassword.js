import React, { useState } from 'react';
import css from '../../AlertDialog/AlertDialog.module.css';
import cssPopup from '../../AlertDialog/popupGeneral.module.css';
import Button from '../../Button/Button';
import { checkPassword } from '../../validations/validations';
import { ToastContainer, toast } from 'react-toastify';

export default function ResetPassword(props) {
  const thisMail = localStorage.getItem('SelectedCus');
  const [password, setPassword] = useState('');

  const resetPassword = ()=>{
    const userName = thisMail
    fetch('userSettings/resetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userName, thisMail, password}),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.isUpDate) {
          toast.success(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          props.setDisplay(false);
        } else {
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className={cssPopup.screen}>
      <div className={cssPopup.popup}>
        <h2>שחזור סיסמה</h2>
        <input
            value={password}
            type='text'
            name='password'
            placeholder='סיסמה חדשה'
            maxLength={20}
            onChange={e => setPassword(e.target.value)}
          ></input>
        <div className={css.buttons}>
          <Button
            text='שחזר'
            isDisable={!checkPassword(password)}
            fun={() => {
              resetPassword();
            }}
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
