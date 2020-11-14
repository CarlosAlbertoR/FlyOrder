const express = require('express');
const passport = require('passport');

const index = require('../controller/mainRoute');
const customer = require('../controller/customer');
const establishment = require('../controller/establishment');
const auth = require('../middlewares/auth');

const app = express.Router();

app.get('/', index.index);

app.get('/listCustomers', customer.getCustomers);
app.get('/customer/:customerId', customer.getCustomer);
app.put('/customer/:customerId', customer.updateCustomer);
app.delete('/customer/:customerId', customer.deleteCustomer);
app.post('/customer/search', customer.search);
app.get('/error', customer.error);

app.get('/listEstablishments', establishment.getEstablihments);
app.get('/establishment/:establishmentId', establishment.getEstablishment);
app.put('/establishment/:establishmentId', establishment.updateEstablishment);
app.delete('/establishment/:establishmentId', establishment.deleteEstablishment);
app.post('/establishment/search', establishment.search);
app.get('/error', customer.error);

app.post('/signupCustomer', passport.authenticate('local-signup-customer', {
    successRedirect: '/listCustomers',
    failureRedirect: '/error',
    passReqToCallback: true
}));

app.post('/signinCustomer', passport.authenticate('local-signin-customer', {
    successRedirect: '/listCustomers',
    failureRedirect: '/error',
    passReqToCallback: false
}));

app.post('/signupEstablishment', passport.authenticate('local-signup-establishment', {
    successRedirect: '/listEstablishments',
    failureRedirect: '/error',
    passReqToCallback: true
}));

app.post('/signinEstablishment', passport.authenticate('local-signin-establishment', {
    successRedirect: '/listEstablishment',
    failureRedirect: '/error',
    passReqToCallback: false
}));

module.exports = app;