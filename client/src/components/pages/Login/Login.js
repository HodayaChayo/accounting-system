import React, { useState } from 'react';
import Button from '../../Button/Button';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import css from './login.module.css';

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errUser, setErrUser] = useState('');
  const [errPass, setErrPass] = useState('');
  const [loginMess, setLoginMess] = useState('');

  // Function that checking if the mail is correct.
  const checkUserName = tmpUserName => {
    if (tmpUserName === '') {
      setErrUser('שם משתמש לא יכול להיות ריק');
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tmpUserName)) {
      setErrUser('');
      return true;
    } else {
      setErrUser('שם משתמש לא תקין');
    }
    return false;
    // return /\S+@\S+\.\S+/.test(tmpUserName);
  };

  // if password hes minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  const checkPassword = tmpPassword => {
    if (tmpPassword === '') {
      setErrPass('סיסמה לא יכולה להיות ריקה');
    } else if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        tmpPassword
      )
    ) {
      setErrPass('');
      return true;
    } else {
      setErrPass('סיסמה לא תקינה');
    }
    return false;
  };

  // send userName and password to server to check if user exist - then connect
  const loginVerification = () => {
    const data = { userName, password };
    console.log({ userName }, { password });
    console.log(data);
    if (checkUserName(userName) && checkPassword(password)) {
      fetch('login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.isConnect) {
            window.location.href = '/home';
          } else {
            console.log('not connected');
            setLoginMess('שם משתמש או סיסמה לא נכונים');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <div className='body'>
      <Header title='מערכת הנהלת חשבונות' />
      <main className={css.main}>
        <form className={css.login}>
          <input
            type='email'
            name='userName'
            placeholder='שם משתמש'
            onChange={e => setUserName(e.target.value)}
          ></input>
          {{ userName } !== '' && (
            <span className={css.errMessage}>{errUser}</span>
          )}
          <input
            type='password'
            name='password'
            placeholder='סיסמה'
            onChange={e => setPassword(e.target.value)}
          ></input>
          {{ errPass } !== '' && (
            <span className={css.errMessage}>{errPass}</span>
          )}
          {{ loginMess } !== '' && (
            <span className={css.errMessage}>{loginMess}</span>
          )}
          <Button
            text='כניסה'
            fun={() => {
              loginVerification();
            }}
          />
        </form>
      </main>
      <Footer />
    </div>
  );
}
