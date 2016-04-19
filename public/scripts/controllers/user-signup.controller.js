SignupController.$inject = ["$location", "UserService"]; // minification protection
function SignupController ($location, UserService) {
  var vm = this;
  vm.new_user = {}; // form data

  vm.signup = function() {
    UserService
      .signup(vm.new_user)
      .then(
        function onSuccess(response) {
          vm.new_user = {}; // clear sign up form
          $location.path('/profile'); // redirect to '/profile'
        }
      );
  };
}
