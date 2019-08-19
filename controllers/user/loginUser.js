const mongoose = require('mongoose');
const { userModel } = require('./../../models');
const passport = require('passport');

const loginUser = async (user) => {
    return new Promise(async (resolve, reject) => {
        passport.authenticate('local', { session: false }, (req, res) => {
            const user = req.user;
            user.token = user.generateJWT();
            resolve(user.toAuthJSON);
        });
    });
};

module.exports = loginUser;