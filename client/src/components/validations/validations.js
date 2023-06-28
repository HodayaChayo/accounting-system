// 'use strict';

// Function that checking if the mail is correct.
const checkUserName = tmpUserName => {
  if (tmpUserName !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tmpUserName)) {
    return true;
  }
  return false;
};

// if password hes minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
const checkPassword = tmpPassword => {
  const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (tmpPassword !== '' && passPattern.test(tmpPassword)) {
    return true;
  }
  return false;
};

// check if customer name is not empty and contain at least one letter and max length is 30
const checkCusName = cusName => {
  if (cusName !== '' && /[א-תa-zA-Z]+$/.test(cusName)) {
    return true;
  }
  return false;
};

// check if phone number is not empty and contain numbers only
const checkPhone = phone => {
  if (phone !== '' && /^\d{10}$/.test(phone)) {
    return true;
  }
  return false;
};

const checkVatId = vatId => {
  if (vatId !== '' && /^\d{9}$/.test(vatId)) {
    return true;
  }
  return false;
};

const checkTaxPercent = taxPercent => {
  if (
    taxPercent !== '' &&
    /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/.test(taxPercent)
  ) {
    return true;
  }
  return false;
};

// check if contain numbers only
const numbersOnly = number => {
  if (number !== '' && /^[0-9]*$/.test(number)) {
    return true;
  }
  return false;
};

export {
  checkUserName,
  checkPassword,
  checkCusName,
  checkPhone,
  checkVatId,
  checkTaxPercent,
  numbersOnly,
};
