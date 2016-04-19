// var auth = require('../middleware/auth');
// var db = require('../models'),
//     User = db.User,
//     Post = db.Post;

function index(req, res) {
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
}

module.exports = {
  index: index
  // , show: show
  // , update: update
  // , destroy: destroy
};
