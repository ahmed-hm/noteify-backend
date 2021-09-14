const express = require('express');
const noteRoute = express.Router();

const { addNote, updateNote, deleteNote, getNote, getNotes, deleteAllNotes } = require('../../controllers/note');

noteRoute.post('/add', (req, res) => {
    console.log(req.body);
    note = {};
    note.author = req.user._id;
    note.title = req.body.title ?? '';
    note.body = req.body.body ?? '';
    note.dateCreated = req.body.dateCreated ?? new Date().toISOString();
    note.dateModified = req.body.dateModified ?? new Date().toISOString();
    note.alarmDate = req.body.alarmDate ?? null;
    note.tag = req.body.tag ?? null;
    note.isDone = req.body.isDone;

    addNote(note).then(note => {
        console.log('note saved, UUID = ' + note.id);
        res.json({ '_id': note.id }).send();
    }).catch(err => {
        console.log(err);
        res.status(404).send('error occured while saving note');
    })
}).put('/update', (req, res) => {
    updateNote({id:req.body._id, user:req.user, ...req.body} ).then(note => {
        console.log('note updated, UUID = ' + note.id);
        res.json({ '_id': note.id }).send();
    }).catch(err => {
        console.log(err);
        res.status(404).send('error occured while updating note');
    })
}).get('/getAll', (req, res) => {
    getNotes(req.user).then(notes => {
        console.log(notes.length + ' notes fetched');
        res.status(200).send(notes);
    }).catch(err => {
        console.log(err);
        res.status(404).send('error occured while fetching notes');
    })
}).get('/get', (req, res) => {
    getNote(req.query.id, req.user).then(note => {
        console.log('note fetched, UUID = ' + note.id);
        res.status(200).send(note);
    }).catch(err => {
        console.log(err);
        res.status(404).send('error occured while fetching note');
    })
}).delete('/delete', (req, res) => {
    deleteNote(req.query.id, req.user).then(note => {
        console.log('note deleted, UUID = ' + note.id);
        res.json({ '_id': note.id }).send();
    }).catch(err => {
        console.log(err);
        res.status(404).send('error occured while deleting note');
    })
}).delete('/deleteAll', (req, res) => {
    deleteAllNotes(req.user).then(note => {
        res.json({ 'message': 'success' }).send();
    }).catch(err => {
        console.log(err);
        res.status(404).send('error occured while deleting note');
    })
})

module.exports = { noteRoute };