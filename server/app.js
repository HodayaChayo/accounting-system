// Made by Hodaya & Ezra Chayu
'use strict';

const path = require('path');
const express = require('express');
const app = express();
const port = process.env.port || 3001;

const apiController = require('./database/apiController')

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// connection to react html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

apiController(app)

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
