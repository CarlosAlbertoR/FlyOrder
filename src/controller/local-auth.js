const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Costumer = require('../models/local_costumer');

passport.serializeUser((costumer, done) => {
    done(null, costumer.id);
});

passport.deserializeUser(async (id, done) => {
    const costumer = await Costumer.findById(id);
    done(null, costumer);
});

passport.use('local-signup-costumer', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
    const costumer = await Costumer.findOne({'email': email})
    console.log(costumer)
    if(costumer){
        return done(null, false, console.log('El usuario ya se encuentra registrado'));
    }else{
        const newCostumer = new Costumer();
        newCostumer.email = email;
        newCostumer.password = newCostumer.encryptPassword(password);
        console.log(newCostumer);
        await newCostumer.save();
        done(null, newCostumer);
    }
}));