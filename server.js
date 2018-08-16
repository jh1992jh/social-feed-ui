const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./api/routes/users');
const posts = require('./api/routes/posts');
const profiles = require('./api/routes/profiles'); 

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const db = require('./config/keys').mongoURI;

mongoose
.connect(db)
    .then(() => console.log('db connected'))
    .catch((err) => console.log(err));

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/posts', posts)
app.use('/api/profiles', profiles)

const port = process.env.PORT || 5000;

app.listen(port, console.log(`The server is running`))