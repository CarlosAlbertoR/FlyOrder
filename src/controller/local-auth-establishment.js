const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Establishment = require('../models/local-establishment');

passport.serializeUser((establishment, done) => {
    done(null, establishment.id);
});

passport.deserializeUser(async (id, done) => {
    const establishment = await Establishment.findById(id);
    done(null, establishment);
})

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

        newEstablishmentr.email = email;
        newEstablishment.password = newEstablishment.encryptPassword(password);
        console.log(newEstablishment);
        await newEstablishmentr.save();
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