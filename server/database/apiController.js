'use strict';

const {
  login,
  addCustomer,
  customerTable,
  sortCode,
  userSettings,
  accounts,
} = require('./allQueries');

module.exports = function (app) {
  app.use('/login', login);
  app.use('/addCus', addCustomer);
  app.use('/cusTable', customerTable);
  app.use('/sortCode', sortCode);
  app.use('/userSettings', userSettings);
  app.use('/accounts', accounts);
  app.all('*', (req, res) => {
    res.status(404).send('resource not found');
  });
};
