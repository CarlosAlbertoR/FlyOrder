const express = require('express');
const passport = require('passport');

const index = require('../controller/mainRoute');
const signupCostumer = require('../controller/listCostumer');
const listCostumer = require('../controller/listCostumer');

const app = express.Router();

app.get('/', index.index);

app.get('/listCostumer', signupCostumer.listCostumer);

app.get('/signupCostumer', listCostumer.error);

app.post('/signupCostumer', passport.authenticate('local-signup-costumer', {
    successRedirect: '/listCostumer',
    failureRedirect: '/signupCostumer',
    passReqToCallback: true
}));

module.exports = app;