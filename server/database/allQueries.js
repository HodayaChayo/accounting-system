const login = require('./queries/login');
const addCustomer = require('./queries/addCustomer');
const customerTable = require('./queries/customerTable');
const sortCode = require('./queries/sortCode');
const userSettings = require('./queries/userSettings');
const accounts = require('./queries/accounts');
const documents = require('./queries/uploadingDocument');
<<<<<<< HEAD
const commandType = require('./queries/commandType');
const worker = require('./queries/worker');
=======
const commandType = require('./queries/commandType')
const commands = require('./queries/commands')

>>>>>>> fc5ac3677914cee1f3954f6a2194d3ee34a4c5e3
module.exports = {
  login,
  addCustomer,
  customerTable,
  sortCode,
  userSettings,
  accounts,
  documents,
  commandType,
<<<<<<< HEAD
  worker,
=======
  commands
>>>>>>> fc5ac3677914cee1f3954f6a2194d3ee34a4c5e3
};
