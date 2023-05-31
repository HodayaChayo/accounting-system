import React, { Component } from 'react';
import Button from '../../Button/Button';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import css from './login.module.css';

export default class Login extends Component {
  state = {
    userName: '',
    password: '',
    errUser: '',
    errPass: '',
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

  // Function that checking if the mail is contain @ and dot.
  checkUserName = tmpUserName => {
    if (tmpUserName === '') {
      this.setState(() => {
        return {
          userName: this.state.userName,
          password: this.state.password,
          errUser: 'שם משתמש לא יכול להיות ריק',
          errPass: this.state.errPass,
        };
      });
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tmpUserName)) {
      this.setState(() => {
        return {
          userName: this.state.userName,
          password: this.state.password,
          errUser: '',
          errPass: this.state.errPass,
        };
      });
      return true;
    } else {
      this.setState(() => {
        return {
          userName: this.state.userName,
          password: this.state.password,
          errUser: 'שם משתמש לא תקין',
          errPass: this.state.errPass,
        };
      });
    }
    return false;
    // return /\S+@\S+\.\S+/.test(tmpUserName);
  };

  // check that password length is above 8 and contain at least one letter and number
  checkPassword = tmpPassword => {
    if (tmpPassword === '') {
      this.setState(() => {
        return {
          userName: this.state.userName,
          password: this.state.password,
          errUser: this.state.errUser,
          errPass: 'סיסמה לא יכולה להיות ריקה',
        };
      });
    } else if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(tmpPassword)
    ) {
      this.setState(() => {
        return {
          userName: this.state.userName,
          password: this.state.password,
          errUser: this.state.errUser,
          errPass: '',
        };
      });
      return true;
    } else {
      this.setState(() => {
        return {
          userName: this.state.userName,
          password: this.state.password,
          errUser: this.state.errUser,
          errPass: 'סיסמה לא תקינה',
        };
      });
    }
    return false;
  };

  loginVerification = (name, pass) => {
    const data = { name, pass };
    console.log(this.state);
    console.log(data);
    if (this.checkUserName(name) && this.checkPassword(pass)) {
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
    }
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
            {this.state.errUser !== '' && (
              <span className={css.errMessage}>{this.state.errUser}</span>
            )}
            <input
              type='password'
              name='password'
              placeholder='סיסמה'
              onChange={this.editPassword}
            ></input>
            {this.state.errPass !== '' && (
              <span className={css.errMessage}>{this.state.errPass}</span>
            )}
            <Button
              text='כניסה'
              fun={() => {
                this.loginVerification(
                  this.state.userName,
                  this.state.password
                );
              }}
            />
          </form>
        </main>
        <Footer />
      </div>
    );
  }
}
