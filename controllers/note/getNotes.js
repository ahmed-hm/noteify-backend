const mongoose = require('mongoose');
const { noteModel } = require('../../models');

const getNotes = async (user) => {
    return new Promise(async (resolve, reject) => {
        noteModel.find({ author: user._id }, (err, res) => {
            if (err) reject(err);
            resolve(res);
        }).select({ updatedAt: 0, createdAt: 0, __v: 0 });
    })
}

module.exports = getNotes;