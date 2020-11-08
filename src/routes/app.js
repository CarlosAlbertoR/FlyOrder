const express = require('express');
const passport = require('passport');

const index = require('../controller/mainRoute');
const signupCustomer = require('../controller/listCustomer');
const listCustomer = require('../controller/listCustomer');
const profile = require('../controller/profile');

const app = express.Router();

app.get('/', index.index);

app.get('/listCustomer', signupCustomer.listCustomer);

app.get('/signupCustomer', listCustomer.error);

app.get('/profile', profile.listCustomer);

app.get('/signinCustomer', profile.error);

app.post('/signupCustomer', passport.authenticate('local-signup-customer', {
    successRedirect: '/listCustomer',
    failureRedirect: '/signupCustomer',
    passReqToCallback: true
}));

app.post('/signinCustomer', passport.authenticate('local-signin-customer', {
    successMessage: '/profile',
    failureRedirect: '/signinCustomer',
    passReqToCallback: false
}));

module.exports = app;