const login = require('./queries/login');
const addCustomer = require('./queries/addCustomer');
const customerTable = require('./queries/customerTable');
const sortCode = require('./queries/sortCode');
const userSettings = require('./queries/userSettings');
const accounts = require('./queries/accounts');
const documents = require('./queries/uploadingDocument');
const commandType = require('./queries/commandType');
const worker = require('./queries/worker');
const commands = require('./queries/commands')
const ledgerReport = require('./queries/ledgerReport')

module.exports = {
  login,
  addCustomer,
  customerTable,
  sortCode,
  userSettings,
  accounts,
  documents,
  commandType,
  worker,
  commands,
  ledgerReport
};
