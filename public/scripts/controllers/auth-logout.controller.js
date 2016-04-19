LogoutController.$inject = ["$location", "UserService"]; // minification protection
function LogoutController ($location, UserService) {
  UserService
    .logout()
    .then(function onSuccess() {
        $location.path('/login');
    });
}
