const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Customer = require('../models/local-customer');

passport.serializeUser((customer, done) => {
    done(null, customer.id);
});

passport.deserializeUser(async (id, done) => {
    const customer = await Customer.findById(id);
    done(null, customer);
});

passport.use('local-signup-customer', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
    const customer = await Customer.findOne({'email': email})
    console.log(customer)
    if(customer){
        return done(null, false, console.log('El usuario ya se encuentra registrado'));
    }else{
        const newCustomer = new Customer();
        newCustomer.name = req.body.name;
        newCustomer.address = req.body.address;
        newCustomer.city = req.body.city;
        newCustomer.phone = req.body.phone;

        newCustomer.email = email;
        newCustomer.password = newCustomer.encryptPassword(password);
        console.log(newCustomer);
        await newCustomer.save();
        done(null, newCustomer);
    }
}));

passport.use('local-signin-customer', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const customer = await Customer.findOne({email: email});
    if(!customer){
        return done(null,false, console.log('Usuario no encontrado'));
    }
    if(!customer.validatePassword(password)){
        return done(null, false, console.log('Contraseña incorrecta'));
    }
    done(null, customer);
}));