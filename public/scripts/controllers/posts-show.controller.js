PostsShowController.$inject = ["$location", "$http", "$routeParams"]; // minification protection
function PostsShowController ($location, $http, $routeParams) {
  var vm = this;
  vm.post = {};

  var id = $routeParams.id;
  get(); // fetch one post (show)

  ////

  function get() {
    $http
      .get('/api/posts/' + id)
      .then(onGetSuccess, onGetError);

    function onGetSuccess(response){
      vm.post = response.data;
    }

    function onGetError(response){
      console.error("Failed to get post", response);
      $location.path("/");
    }
  };
}
