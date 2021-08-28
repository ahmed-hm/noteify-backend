const addNote = require('./addNote');
const updateNote = require('./updateNote');
const deleteNote = require('./deleteNote');
const getNote = require('./getNote');
const getNotes = require('./getNotes');
const deleteAllNotes = require('./deleteAllNotes');


module.exports = {
    addNote: addNote,
    updateNote: updateNote,
    deleteNote: deleteNote,
    deleteAllNotes: deleteAllNotes,
    getNote: getNote,
    getNotes: getNotes
}