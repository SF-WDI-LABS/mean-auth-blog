configRoutes.$inject = ["$routeProvider", "$locationProvider"]; // minification protection
function configRoutes($routeProvider, $locationProvider) {

  //this allows us to use routes without hash params!
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $routeProvider
    .when('/', {
      templateUrl: 'templates/posts/index.html',
      controller: 'PostsIndexController',
      controllerAs: 'postsIndexCtrl'
    })
    .when('/signup', {
      templateUrl: 'templates/user/signup.html',
      controller: 'SignupController',
      controllerAs: 'sc',
      resolve: {
        skipIfLoggedIn: skipIfLoggedIn
      }
    })
    .when('/login', {
      templateUrl: 'templates/auth/login.html',
      controller: 'LoginController',
      controllerAs: 'lc',
      resolve: {
        skipIfLoggedIn: skipIfLoggedIn
      }
    })
    .when('/logout', {
      template: null,
      controller: 'LogoutController',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .when('/profile', {
      templateUrl: 'templates/user/profile.html',
      controller: 'ProfileController',
      controllerAs: 'profileCtrl',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .when('/posts', {
      templateUrl: 'templates/posts/index.html',
      controller: 'PostsIndexController',
      controllerAs: 'postsIndexCtrl'
    })
    .when('/posts/new', {
      templateUrl: 'templates/posts/new.html',
      controller: 'PostsNewController',
      controllerAs: 'postsNewCtrl',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .when('/posts/:id', {
      templateUrl: 'templates/posts/show.html',
      controller: 'PostsShowController',
      controllerAs: 'postsShowCtrl'
    })
    .when('/posts/:id/edit', {
      templateUrl: 'templates/posts/edit.html',
      controller: 'PostsEditController',
      controllerAs: 'postsEditCtrl',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .otherwise({redirectTo: '/'});


    function skipIfLoggedIn($location, $auth) {
      if ($auth.isAuthenticated()) {
        $location.path('/');
      }
    }

    function loginRequired($location, $auth) {
      if (!$auth.isAuthenticated()) {
        $location.path('/login');
      }
    }

}
