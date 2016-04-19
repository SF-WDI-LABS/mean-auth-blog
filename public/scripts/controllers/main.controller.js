MainController.$inject = ["UserService"]; // minification protection
function MainController (UserService) {
  var vm = this;
  vm.currentUser = UserService.currentUser();
}
