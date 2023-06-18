const login = require('./queries/login');
const addCustomer = require('./queries/addCustomer');
const customerTable = require('./queries/customerTable');
const sortCode = require('./queries/sortCode');
const userSettings = require('./queries/userSettings');
const accounts = require('./queries/accounts');

module.exports = {
  login,
  addCustomer,
  customerTable,
  sortCode,
  userSettings,
  accounts,
};
