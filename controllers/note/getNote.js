const mongoose = require('mongoose');
const { noteModel } = require('../../models');

const getNote = async (id, user) => {
    return new Promise(async (resolve, reject) => {
        noteModel.findOne({ _id: id, author: user._id }, (err, res) => {
            if (err) reject(err);
            // console.log(ssn);
            resolve(res);
        }).select({ _id: 0, updatedAt: 0, createdAt: 0, __v: 0 });
    })
}

module.exports = getNote;