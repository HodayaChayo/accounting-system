const login = require('./queries/login');
const addCustomer = require('./queries/addCustomer');
const customerTable = require('./queries/customerTable');
const sortCode = require('./queries/sortCode');
const userSettings = require('./queries/userSettings');
const accounts = require('./queries/accounts');
const documents = require('./queries/uploadingDocument');
const commandType = require('./queries/commandType')
const commands = require('./queries/commands')

module.exports = {
  login,
  addCustomer,
  customerTable,
  sortCode,
  userSettings,
  accounts,
  documents,
  commandType,
  commands
};
