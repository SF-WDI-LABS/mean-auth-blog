# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> MEAN Auth Seed - Protected Blog Posts

**Objective:** Your goal is to add a blog `posts` resource to the following application using *protected* client-side and server-side routes.
  * Only a logged in user should be able to hit API endpoints for creating, updating, and destroying blog posts (on the server).
  * Only a logged in user should be able to see the forms and buttons for creating, updating, and destroying blog posts (on the client).

Please familiarize yourself with [Satellizer](https://github.com/sahat/satellizer#authloginuser-options) and the file `middleware/auth.js` before beginning. Try to answer the following questions:
  * What does it mean to be "logged in"?
    - How does the server "log in" a user?
    - How does the client know a user is "logged in"?
  * What does it mean to "log out"?
    - How does the client "log out"?

## App Setup

1. Clone this repo.

1. From inside the project directoy, run `npm install` to install the required node modules.

1. In one Terminal window, run `mongod`, and in another, run `nodemon`.

1. Navigate to `localhost:9000` in the browser. You should see an empty page and an angry red error message in the Chrome console.

  > You should see `Error: ENOENT, no such file or directory '.env'` in your terminal

1. To fix it, add a ["dot env"](https://github.com/SF-WDI-LABS/mean-auth-seed) file, called **`.env`**, to the root directory. Add this line to the file:

  ```
  TOKEN_SECRET=yoursupersecrettoken
  ```

  This is the secret your server will use to encode the JWT token for each user. Note that this file is listed in `.gitignore` because you never want to expose your secret tokens on github.

1. Before hooking up the front-end, test your server routes via Postman:
  * Send a `GET` request to `/api/me`. You should see the message: "Please make sure your request has an Authorization header."
  * Send a `POST` request to `/auth/signup` with a test `email` and `password`. You should see a token that was generated by the server.
    > Make sure to use `x-www-form-urlencoded` and send your data in the `body` of the request).
  * Send a `POST` request to `/auth/login` with the `email` and `password` you just used to create a new user. You should again see a token that was generated by the server.

## Blog Posts - Server Setup

#### Setup you blog `Post` model
Add `models/post.js` with your blog post schema, and don't forget to export your `Post` model.
> You will also need to require/export `/models/post.js` in `models/index.js`.

#### Setup your User model to reference posts:

  ```js
  /*
   * models/user.js
   */

   var userSchema = new Schema({
     ...
     posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
   });
  ```

> You will also need to use `user.populate('posts')` on your current user (i.e. `req.user`), if you want to see/access all of the current user's posts.

#### Setup your posts controller actions on the server
* Make sure to `require` your blog `Post` model from your database.

## CRUDing Blog Posts

You have been supplied with a hardcoded `posts#index` controller that returns two blog posts. Your goal is to:

  * Build out the `Post` model
  * Add RESTful routes to the server for CRUDing posts
  * Build out angular templates, controllers, and routes for `new`, `edit`, and `show`.
  * Protect sensitive endpoints on the server (like `post`, `put`, `delete`).
  * Protect sensitive endpoints on the client (like `new`, `edit`, and the ability to `delete`).

#### PostsNewController (`posts-new.controller.js`)
To begin, let's create a new angular controller, template, and route for creating a single blog post.
  * When a user visits `/posts/new` on the client...
    * they should see an empty form
      * with a field for `title` (use `ng-model="postsNewCtrl.post.title"`)
      * and a field for `content` (use `ng-model="postsNewCtrl.post.content"`)
      * and a button to "save".
  * When a user clicks "save" (having filled out the form)...
    * they should trigger a `on-submit="postsNewCtrl.create()"` method on the `form`(!)
    * and the `create()` method should make an $http request to `POST /api/posts` using the data in `vm.post`.
    * and their post should be saved to the database
    * and the server should respond with the newly created post and `_id` (e.g. 12345)
    * and the user should be redirect to e.g. `/posts/12345`.

#### PostsShowController (`posts-show.controller.js`)
  * When a user visits `/posts/12345` on the client...
    * they should make an `$http` request to `GET /api/posts/12345`...
    * and they should see the `title` and `content` of post 12345...
        - using e.g. `{{postsShowCtrl.title}}`
    * and a button to `edit`
      * and be redirected to `/posts/12345/edit` 
    * and a button to `delete`
      * and should trigger a `on-click="postsShowCtrl.destroy()"` method on the `button`(!)
      * and the `destroy()` methods should make an `$http` request to `DELETE /api/posts/12345`
      * and on success, be redirected to `/` or `/posts` (posts index).
      * BONUS: and see the message "Successfully deleted post" below the navbar.

#### PostsEditController (`posts-edit.controller.js`)
  * When a user visits `/posts/12345/edit` on the client...
    * they should make an `$http` request to `GET /api/posts/12345`...
    * and see a pre-populated form for post 12345...
      * with a field for `title` (use `ng-model="postsEditCtrl.post.title"`)
      * and a field for `content`(use `ng-model="postsEditCtrl.post.content"`)
    * and a button to `Discard Changes`
      * and be redirected to `/posts/12345`
      * BONUS: and a pop-up, confirmation dialog that says "Are you sure you want to discard your changes?"
    * and a button to `Save Changes`
      * that should trigger a `on-submit="postsEditCtrl.update()"` on the `form`(!)
      * and the `update()` method should make an `$http` request to the server, using the data in `vm.post`
      * and on success, be redirected to `/posts/12345` (show).
    * and a button to `Delete Post`
      * that should trigger a `on-click="postsEditCtrl.destroy()"` on the `button`
      * and the `destroy()` method should make an `$http` delete request to the server
      * and on success, redirect the user to `/` or `/posts` (index)
      * BONUS: and a pop-up, confirmation dialog that says "Are you sure you want to delete this post?"

## Authorization
##### Protecting Server Routes
You will want to use `auth.ensureAuthenticated` (see `middleware/auth.js`) in the route to find the current user (i.e. so that you can use `req.user` to access the current user).

##### Protecting Client Routes
* You will want to use `loginRequired` (see `public/scripts/rotues.js`) in the route to ensure that only a logged in user can go to `new` and `edit` pages.

## Bonuses
1. Refactor to use a PostService, and inject your service into each of your post controllers.

1. Validate blog-posts! Ensure a user can't submit an empty title or content. (Use both backend AND frontend validations).

1. On the user's profile page, display the number of posts the user has written. **Hint:** You'll need to add `.populate('posts')` to your `GET /api/me` route in `server.js`. But make sure you are NOT storing posts in the JWT Token (it's too much data!).

1. On the user profile page, the "Joined" date isn't formatted very nicely. Use Angular's built-in <a href="https://docs.angularjs.org/api/ng/filter/date" target="_blank">date filter</a> to display the date in this format: `January 25, 2016`.
