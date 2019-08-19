const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const secretKey = process.env.secretKey;

const schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const userSchema = schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    hash: {
        type: String,
        require: true,
    },
    salt: {
        type: String,
        require: true,
    },
    notes: [{
        type: schema.Types.ObjectId,
        ref: 'note'
    }]
},
    { timestamps: true }
);

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

// userSchema.methods.validateToken = function (token) {
//     const now = new Date();
//     const date = parseInt(now.getTime() / 1000, 10);
//     const userToken = jwt.verify(token, 'secret');
//     if(userToken.expirationDate < date){
//         return userToken;
//     }
//     return null;
// };

userSchema.methods.generateJWT = function () {
    const now = new Date();
    const expirationDate = new Date(now);
    expirationDate.setDate(now.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        expirationDate: parseInt(expirationDate.getTime() / 1000, 10)
    }, secretKey);
};

userSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};

userSchema.plugin(uniqueValidator);

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;