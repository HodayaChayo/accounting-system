'use strict';

// this class handle all request the server gets and routing the request to the correct class

const {
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
  documents
} = require('./allQueries');

module.exports = function (app) {
  app.use('/login', login);
  app.use('/addCus', addCustomer);
  app.use('/cusTable', customerTable);
  app.use('/sortCode', sortCode);
  app.use('/userSettings', userSettings);
  app.use('/accounts', accounts);
  app.use('/uploadingDocument', uploadingDocument);
  app.use('/commandType', commandType)
  app.use('/worker',worker);
  app.use('/commands', commands)
  app.use('/ledgerReport', ledgerReport)
  app.use('/vatReport', vatReport)
  app.use('/documents', documents)
  app.all('*', (req, res) => {
    res.status(404).send('resource not found');
  });
};
