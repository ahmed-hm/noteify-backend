const express = require('express');
const userRoute = express.Router();
const passport = require('passport');

const { loginUser, registerUser, currentUser } = require('../../controllers/user');

userRoute.use('/validate', passport.authenticate('jwt', { session: false }));

userRoute.post('/register', (req, res) => {
    if (!req.body.email || !req.body.password)
        return res.status(422).send('missing email or password or both');

    const user = {
        email: req.body.email,
        password: req.body.password
    }
    registerUser(user).then(user => {
        res.json(user.toAuthJSON()).send();
    }).catch(err => {
        console.log(err);
        res.status(404).send('user registeration failed');
    })
}).post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    const user = req.user;
    console.log('inside login');
    console.log(user);
    user.token = user.generateJWT();
    res.json(user.toAuthJSON()).send();
}).post('/validate', (req, res) => {
    if (!req.user)
        res.status(200).send('Authorized');
    console.log('req.user');
    console.log(req.user);
    res.status(401).send('Unauthorized');
}).get('/current', (req, res) => {
});

module.exports = { userRoute };