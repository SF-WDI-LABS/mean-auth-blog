var auth = require('../middleware/auth');
var db = require('../models'),
    User = db.User;

function login(req, res) {
  User.findOne({ email: req.body.email }, '+password', function (err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password.' });
    }
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Invalid email or password.' });
      }
      res.send({ token: auth.createJWT(user) });
    });
  });
}

function signup(req, res) {
  User.findOne({ email: req.body.email }, function (err, existingUser) {
    if (existingUser) {
      return res.status(409).send({ message: 'Email is already taken.' });
    }
    var user = new User({
      displayName: req.body.displayName,
      email: req.body.email,
      password: req.body.password
    });
    user.save(function (err, result) {
      if (err) {
        res.status(500).send({ message: err.message });
      }
      res.send({ token: auth.createJWT(result) });
    });
  });
}

function updateCurrentUser(req, res) {
  User.findById(req.user_id, function (err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found.' });
    }
    user.displayName = req.body.displayName || user.displayName;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.save(function(err, result) {
      res.send({ token: auth.createJWT(result) });
    });
  });
}

function showCurrentUser (req, res) {
  User.findById(req.user_id, function (err, user) {
    res.send(user);
    // res.send(user.populate('posts'));
  });
}

module.exports = {
  signup: signup,
  login: login,
  updateCurrentUser: updateCurrentUser,
  showCurrentUser: showCurrentUser
};
