// this class used to collect all the class for the apiController

const login = require('./queries/login');
const addCustomer = require('./queries/addCustomer');
const customerTable = require('./queries/customerTable');
const sortCode = require('./queries/sortCode');
const userSettings = require('./queries/userSettings');
const accounts = require('./queries/accounts');
const uploadingDocument = require('./queries/uploadingDocument');
const commandType = require('./queries/commandType');
const worker = require('./queries/worker');
const commands = require('./queries/commands');
const ledgerReport = require('./queries/ledgerReport');
const vatReport = require('./queries/vatReport');
const incomeReport = require('./queries/incomeReport');
const documents = require('./queries/documents');

module.exports = {
  login,
  addCustomer,
  customerTable,
  sortCode,
  userSettings,
  accounts,
  uploadingDocument,
  commandType,
  worker,
  commands,
  ledgerReport,
  vatReport,
  incomeReport,
  documents,
};
