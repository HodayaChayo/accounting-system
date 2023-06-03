'use strict';

const path = require('path');
const express = require('express');
const app = express();
const port = process.env.port || 3001;

const login = require('./login');
const addCustomer = require('./addCustomer');

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// connection to react html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.use('/login', login);
app.use('/addCus', addCustomer);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
