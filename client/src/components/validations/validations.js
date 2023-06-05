'use strict';

// Function that checking if the mail is correct.
const checkUserName = tmpUserName => {
  if (tmpUserName != '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tmpUserName)) {
    return true;
  }
  return false;
};

// if password hes minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
const checkPassword = tmpPassword => {
  const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (tmpPassword != '' && passPattern.test(tmpPassword)) {
    return true;
  }
  return false;
};

export default {checkUserName, checkPassword};