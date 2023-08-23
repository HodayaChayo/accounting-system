'use strict';

const {
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
} = require('./allQueries');

module.exports = function (app) {
  app.use('/login', login);
  app.use('/addCus', addCustomer);
  app.use('/cusTable', customerTable);
  app.use('/sortCode', sortCode);
  app.use('/userSettings', userSettings);
  app.use('/accounts', accounts);
  app.use('/uploadingDocument', documents);
  app.use('/commandType', commandType)
<<<<<<< HEAD
  app.use('/worker',worker);
=======
  app.use('/commands', commands)
>>>>>>> fc5ac3677914cee1f3954f6a2194d3ee34a4c5e3
  app.all('*', (req, res) => {
    res.status(404).send('resource not found');
  });
};
