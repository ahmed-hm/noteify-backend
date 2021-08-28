const { userModel } = require('./../../models');

const registerUser = async (user) => {
    return new Promise(async (resolve, reject) => {
        const record = new userModel(user);
        record.setPassword(user.password);
        record.save()
            .then(doc => {
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}

module.exports = registerUser;