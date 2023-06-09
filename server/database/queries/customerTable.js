'use strict';

const express = require('express');
const router = express.Router();
const con = require('../dbConnection');

router.post('/', (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', async () => {
    try {
    } catch (error) {
      console.error(error.message);
    }
  });
});

module.exports = router;
