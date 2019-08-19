const express = require('express');
const app = express();
// const https = require('https');
// const fs = require('fs')
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const passport = require('passport');
// const verifyJWT = require('./middlewares')
require('./config/passport');


const { noteRoute, userRoute } = require('./middlewares');

// app.use(passport.initialize());
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', userRoute);
app.use('/note', passport.authenticate('jwt', {session: false}), noteRoute);

// https.createServer({
//     key: fs.readFileSync('noteify_server.key'),
//     cert: fs.readFileSync('noteify_server.cert')
// }, app).listen(process.env.PORT || 4001, () => {
//     console.log("Listening to port 4001");
// })

app.listen(process.env.PORT || 4001);
