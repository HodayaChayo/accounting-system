import React, { Component } from 'react';
import Button from '../../Button/Button';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import css from './login.module.css';

export default class Login extends Component {
  state = {
    userName: '',
    password: '',
  };

  editUserName = event => {
    this.setState(() => {
      return {
        userName: event.target.value,
        password: this.state.password,
      };
    });
  };

  editPassword = event => {
    this.setState(() => {
      return {
        userName: this.state.userName,
        password: event.target.value,
      };
    });
  };

  loginVerification = (name, pass) => {
    const data = { name, pass };
    console.log(this.state);
    console.log(data);
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
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className='body'>
        <Header title='מערכת הנהלת חשבונות' />
        <main className={css.main}>
          <form className={css.login}>
            <input
              type='email'
              name='userName'
              placeholder='שם משתמש'
              onChange={this.editUserName}
            ></input>
            <input
              type='password'
              name='password'
              placeholder='סיסמה'
              onChange={this.editPassword}
            ></input>
            <Button
              text='כניסה'
              fun={() => {
                this.loginVerification(this.state.userName, this.state.password);
              }}
            />
          </form>
        </main>
        <Footer />
      </div>
    );
  }
}
