// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    auth = require('./middleware/auth'),
    controllers = require("./controllers");

// require and load dotenv
require('dotenv').load();

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// connect to mongodb
mongoose.connect('mongodb://localhost/angular_auth');

/*
 * Auth Routes
 */

app.post('/auth/signup', controllers.users.signup);
app.post('/auth/login', controllers.users.login);

app.get('/api/me', auth.ensureAuthenticated, controllers.users.showCurrentUser);
app.put('/api/me', auth.ensureAuthenticated, controllers.users.updateCurrentUser);

/*
 * API Routes
 */

app.get('/api/posts', function (req, res) {
  res.json([
  {
    title: "Hardcoded Title",
    content: "Here is some great hardcoded content for the body of a blog post. Happy coding!"
  },
  {
    title: "Another Post",
    content: "MEAN stack is the best stack."
  }
  ]);
});


/*
 * Catch All Route
 */
app.get(['/', '/signup', '/login', '/logout', '/profile'], function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * Listen on localhost:3000
 */
app.listen(9000, function() {
  console.log('server started');
});
