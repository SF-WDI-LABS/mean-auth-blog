LoginController.$inject = ["$location", "UserService"]; // minification protection
function LoginController ($location, UserService) {
  var vm = this;
  vm.new_user = {}; // form data

  vm.login = function() {
    UserService
      .login(vm.new_user)
      .then(function onSuccess(){
        vm.new_user = {}; // clear sign up form
        $location.path('/profile'); // redirect to '/profile'
      })
  };
}
