angular
  .module('AuthSampleApp', [
    'ngRoute',
    'satellizer'
  ])
  .controller('MainController', MainController)
  .controller('PostsIndexController', PostsIndexController)
  .controller('LoginController', LoginController)
  .controller('SignupController', SignupController)
  .controller('LogoutController', LogoutController)
  .controller('ProfileController', ProfileController)
  .service('UserService', UserService)
  .config(configRoutes)
  ;

