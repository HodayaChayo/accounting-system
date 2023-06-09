'use strict';

const { login, addCustomer, customerTable } = require('./allQueries');

module.exports = function (app) {
  app.use('/login', login);
  app.use('/addCus', addCustomer);
  app.use('/cusTable', customerTable);

  app.all('*', (req, res) => {
    res.status(404).send('resource not found');
  });
};
