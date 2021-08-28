const mongoose = require('mongoose');
const { noteModel } = require('../../models');

const addNote = async (note) => {
    return new Promise(async (resolve, reject) => {
        const record = new noteModel(note);
        record.save()
            .then(doc => {
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}

module.exports = addNote;