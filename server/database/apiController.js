'use strict';

const {
  login,
  addCustomer,
  customerTable,
  sortCode,
  userSettings,
} = require('./allQueries');

module.exports = function (app) {
  app.use('/login', login);
  app.use('/addCus', addCustomer);
  app.use('/cusTable', customerTable);
  app.use('/sortCode', sortCode);
  app.use('/getUserSettings', userSettings);
  app.all('*', (req, res) => {
    res.status(404).send('resource not found');
  });
};
