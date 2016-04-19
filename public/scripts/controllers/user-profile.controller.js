ProfileController.$inject = ["$location", "UserService"]; // minification protection
function ProfileController ($location, UserService) {
  var vm = this;
  vm.new_profile = {}; // form data

  vm.updateProfile = function() {
    UserService
      .updateProfile(vm.new_profile)
      .then(function onSuccess() {
        vm.showEditForm = false;
      });
  };
}
