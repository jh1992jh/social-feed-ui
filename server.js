const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./api/routes/users');
const posts = require('./api/routes/posts');
const profiles = require('./api/routes/profiles'); 
const stories = require('./api/routes/stories');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/post/uploads', express.static(__dirname + '/uploads'));
app.use('/profile/uploads', express.static(__dirname + '/uploads'));
app.use('/profile/followers/uploads', express.static(__dirname + '/uploads'));
app.use('/profile/following/uploads', express.static(__dirname + '/uploads'));
app.use('/story/uploads', express.static(__dirname + '/uploads'));
//app.use('/story/watchall/uploads', express.static(__dirname + '/uploads')); 
const db = require('./config/keys').mongoURI;
 /* TEST */
mongoose
.connect(db)
    .then(() => console.log('db connected'))
    .catch((err) => console.log(err));

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profiles', profiles);
app.use('/api/stories', stories);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
  }
  
  app.get('/', (req, res) => {
    res.json({ msg: 'The root route works' });
  });

const port = process.env.PORT || 5000;

app.listen(port, console.log(`The server is on`))