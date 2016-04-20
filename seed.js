var db = require("./models");

var user_a = {
  email: "a",
  password: "a",
  displayName: "Alan Perlis"
}

var posts = [
  {
    title: "The early bird",
    content: "In software systems, it is often the early bird that makes the worm."
  },
  {
    title: "Purpose",
    content: "Every program has (at least) two purposes: the one for which it was written, and another for which it wasn't."
  },
  {
    title: "Moral",
    content: "One man's constant is another man's variable."
  }
]

db.User.remove({}, function(){
  db.Post.remove({}, function(){
    db.User.create(user_a, function(err, user){
      if (err || !user) { return console.log(err); }
      var user_a_posts = posts.map(function(p){p.user = user._id; return p;})
      db.Post.create(user_a_posts, function(err, posts){
          if (err) { return console.log(err); }
          console.log("Created", posts.length, "posts")
          process.exit()
        }
      )
    })
  });
});
