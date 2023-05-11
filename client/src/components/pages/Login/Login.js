import React from 'react';
import Button from '../../Button/Button';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import css from './login.module.css';

export default function Loading() {
  return (
    <div className='body'>
        <Header title="מערכת הנהלת חשבונות"/>
      <main className={css.main}>
        <form className={css.login}>
          <input type='email' name='userName' placeholder='שם משתמש'></input>
          <input type='email' name='password' placeholder='סיסמה'></input>
          <Button text='כניסה' />
        </form>
      </main>
        <Footer />
    </div>
  );
}
