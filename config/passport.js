const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

require('dotenv').config();
const secretKey = process.env.secretKey;

const { userModel } = require('./../models')

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    userModel.findOne({ email: email })
        .then(user => {
            if (!user || !user.validatePassword(password)) {
                return done(null, false, { errors: { 'email or password': 'is invalid' } });
            }
            return done(null, user);
        }).catch(done);
}));

passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey
}, (payload, done) => {
    console.log('inside passport config');
    userModel.findOne({ email: payload.email })
        .then(user => {
            const now = new Date();
            const date = parseInt(now.getTime() / 1000, 10);
            if (payload.expirationDate < date){
                return done(null, false, { errors: { 'token': 'is invalid' } });
            } 
            return done(null, user);
        }).catch(err => {
            done(err);
        })
}))