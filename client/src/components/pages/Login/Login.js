import Button from '../../Button/Button';
import React from 'react';
import css from './login.module.css'
export default function Loading() {
  return (
    <main>
      <form className={css.login}>
        <input type='email' name='userName' placeholder='שם משתמש'></input>
        <input type='email' name='password' placeholder='סיסמה'></input>
        <Button text='כניסה' />
      </form>
    </main>
  );
}
