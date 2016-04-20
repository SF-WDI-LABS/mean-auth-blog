PostsIndexController.$inject = ["$http"]; // minification protection
function PostsIndexController ($http) {
  var vm = this;
  vm.posts = [];

  query(); // fetch all the posts (index)

  ////

  function query() {
    $http
      .get('/api/posts')
      .then(function onSuccess(response) {
        vm.posts = response.data;
      });
  }
}
