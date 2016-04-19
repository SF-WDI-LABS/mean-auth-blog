PostsIndexController.$inject = ["$http"]; // minification protection
function PostsIndexController ($http) {
  var vm = this;
  vm.posts = [];
  vm.new_post = {}; // form data

  $http.get('/api/posts')
    .then(function onSuccess(response) {
      vm.posts = response.data;
    });

  vm.createPost = function() {
    $http.post('/api/posts', vm.new_post)
      .then(function onSuccess(response) {
        vm.new_post = {};
        vm.posts.push(response.data);
      });
  };
}
