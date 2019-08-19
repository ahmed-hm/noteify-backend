const mongoose = require('mongoose');
const { noteModel } = require('../../models');

const updateNote = async (id, title, body, dateModified, user) => {
    return new Promise(async (resolve, reject) => {
        await noteModel.findOneAndUpdate({ _id: id, author: user._id }, { title: title, body: body, dateModified: dateModified }, { new: true, useFindAndModify: false }, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    })
}

module.exports = updateNote;