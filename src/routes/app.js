const express = require('express');
const index = require('../controller/mainRoute');

const app = express.Router();

app.get('/', index.index);

module.exports = app;