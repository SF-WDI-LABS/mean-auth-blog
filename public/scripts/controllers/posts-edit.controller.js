PostsEditController.$inject = ["$location", "$http", "$routeParams"]; // minification protection
function PostsEditController ($location, $http, $routeParams) {
  var vm = this;
  vm.update = update;
  vm.destroy = destroy;
  vm.post = {}; // form data

  var id = $routeParams.id;
  get(); // fetch one post (show)

  ////

  function update() {
    $http
      .put('/api/posts/' + id, vm.post)
      .then(onUpdateSuccess, onUpdateError);

    function onUpdateSuccess(response){
      $location.path("/posts/" + id);
    }

    function onUpdateError(response){
      console.error("Failed to update post", response);
    }
  }

  function destroy() {
    $http
      .delete('/api/posts/' + id)
      .then(onDeleteSuccess, onDeleteError);

    function onDeleteSuccess(response){
      $location.path("/");
    }

    function onDeleteError(response){
      console.error("Failed to delete post", response);
    }
  }

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
