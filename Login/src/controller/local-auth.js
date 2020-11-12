const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Customer = require('../models/local-customer');
const Establishment = require('../models/local-establishment');

passport.serializeUser((customer, done) => {
    done(null, customer.id);
});

passport.serializeUser((establishment, done) => {
    done(null, establishment.id);
});

passport.deserializeUser(async (id, done) => {
    const establishment = await Establishment.findById(id);
    done(null, establishment);
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

passport.use('local-signup-establishment', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
    const establishment = await Establishment.findOne({'email': email})
    console.log(establishment)
    if(establishment){
        return done(null, false, console.log('El usuario ya se encuentra registrado'));
    }else{
        const newEstablishment = new Establishment();
        newEstablishment.name = req.body.name;
        newEstablishment.address = req.body.address;
        newEstablishment.city = req.body.city;
        newEstablishment.phone = req.body.phone;
        newEstablishment.NIT = req.body.NIT;
        newEstablishment.nameAdmin = req.body.nameAdmin;

        newEstablishment.email = email;
        newEstablishment.password = newEstablishment.encryptPassword(password);
        console.log(newEstablishment);
        await newEstablishment.save();
        done(null, newEstablishment);
    }
}));

passport.use('local-signin-establishment', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const establishment = await Establishment.findOne({email: email});
    if(!establishment){
        return done(null,false, console.log('Usuario no encontrado'));
    }
    if(!establishment.validatePassword(password)){
        return done(null, false, console.log('Contraseña incorrecta'));
    }
    done(null, establishment);
}));