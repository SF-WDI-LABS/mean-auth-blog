PostsNewController.$inject = ["$location", "$http"]; // minification protection
function PostsNewController ($location, $http) {
  var vm = this;
  vm.create = create;
  vm.post = {}; // form data

  ////

  function create() {
    $http
      .post('/api/posts', vm.post)
      .then(onCreateSuccess, onCreateError);

    function onCreateSuccess(response){
      $location.path('/posts/' + response.data._id)
    }

    function onCreateError(response){
      console.error("Failed to create post", response);
    }
  };
}
