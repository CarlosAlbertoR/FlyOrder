const express = require('express');
const passport = require('passport');

const index = require('../controller/mainRoute');
const listCustomer = require('../controller/listCustomer');
const profile = require('../controller/profile');

const app = express.Router();

app.get('/', index.index);

app.get('/listCustomer', listCustomer.listCustomer);

app.get('/signupCustomer', listCustomer.error);

app.get('/listEstablishment', profile.listEstablishment);
app.get('/error', profile.error);

app.get('/profile', profile.listCustomer);
app.get('/signinCustomer', profile.error);

app.post('/signupCustomer', passport.authenticate('local-signup-customer', {
    successRedirect: '/listCustomer',
    failureRedirect: '/signupCustomer',
    passReqToCallback: true
}));

app.post('/signinCustomer', passport.authenticate('local-signin-customer', {
    successRedirect: '/profile',
    failureRedirect: '/signinCustomer',
    passReqToCallback: false
}));

app.post('/signupEstablishment', passport.authenticate('local-signup-establishment', {
    successRedirect: '/listEstablishment',
    failureRedirect: '/error',
    passReqToCallback: true
}));

app.post('/signinEstablishment', passport.authenticate('local-signin-establishment', {
    successRedirect: '/listEstablishment',
    failureRedirect: '/error',
    passReqToCallback: false
}));

module.exports = app;