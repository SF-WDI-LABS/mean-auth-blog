var auth = require('../middleware/auth');
var db = require('../models'),
    User = db.User,
    Post = db.Post;

function index(req, res) {
  Post
    .find({})
    .populate('user')
    .exec(function(err, posts){
      if (err || !posts || !posts.length) {
        return res.status(404).send({message: 'Posts not found.'})
      }
      res.send(posts);
    })
}

function create(req, res){
  var new_post = new Post(req.body);
  new_post.user = req.user_id;
  new_post.save(function(err, new_post){
    res.send(new_post);
  })
}

function show(req, res){
  Post
    .findById(req.params.id)
    .populate('user')
    .exec(function(err, found_post){
      if (err || !found_post) {
        return res.status(404).send({message: 'Post not found.'})
      }

      res.send(found_post);
    })
}

function update(req, res){
  var query = {
    _id: req.params.id
  };

  if (req.user_id) {
    query.user = req.user_id;
  }

  Post
    .findOneAndUpdate(query, req.body)
    .exec(function(err, post){
      if (err || !post) {
        console.log(post)
        return res.status(404).send({messsage: 'Failed to update post.'})
      }
      res.status(204).send();
    })
}

function destroy(req, res){
  var query = {
    _id: req.params.id
  };

  if (req.user_id) {
    query.user = req.user_id;
  }

  Post
    .findOneAndRemove(query)
    .exec(function(err, post){
      if (err || !post) {
        return res.status(404).send({messsage: 'Failed to delete post.'})
      }
      res.status(204).send();
    })
}

module.exports = {
  index: index
  , create: create
  , show: show
  , update: update
  , destroy: destroy
};
