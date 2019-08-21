const mongoose = require('mongoose');
const userModel = require('./user');
const noteModel = require('./note');
require('dotenv').config();


const dbuser = process.env.dbUser;
const dbpassword = process.env.dbPassword;
const connectionString = `mongodb://${dbuser}:${dbpassword}@ds129770.mlab.com:29770/note-ify`; //get connection string from mlab database
mongoose.connect(connectionString, { useNewUrlParser: true });

mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.once('open', () => console.log('[!] Connected to DB: ', connectionString));
db.on('error', (error) => {
    console.log('[X] ERROR conecting to DB:', error);
    process.exit(-1);
});


module.exports = {
    userModel: userModel,
    noteModel: noteModel
};
