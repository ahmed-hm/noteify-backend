const mongoose = require('mongoose');
const { noteModel } = require('../../models');

const updateNote = async (id, user, title, body, dateModified, alarmDate, tag, isDone) => {
    return new Promise(async (resolve, reject) => {
        await noteModel.findOneAndUpdate({ _id: id, author: user._id }, { title, body, dateModified, alarmDate, tag, isDone }, { new: true, useFindAndModify: false }, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    })
}

module.exports = updateNote;