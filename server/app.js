'use strict';

const path = require('path');
const express = require('express');
const {db, isUserExist} = require('./db-connection')
const port = process.env.port || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// 
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.post('/login', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', () => {
    try {
      // we get here when all the data has been received (all chunks)
      console.log('No more data');
      console.log(body);
      const obj = JSON.parse(body);

      // do something with JSON
      console.log(obj);
      const name = obj[0];
      const pass = obj[1];

      console.log(name);
      console.log(pass);

      let connect = false;
      // check if the userName and password exist and correct

      let result = {};
      result.isConnect = connect;
      // return answer to client
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    } catch (error) {
      console.error(error.message);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
