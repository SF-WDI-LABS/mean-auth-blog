UserService.$inject = ["$http", "$q", "$auth"]; // minification protection
function UserService($http, $q, $auth){
  var self = this;

  var empty_user = {
    sub: null, // aka user._id
    created: null,
    updated: null,
    displayName: null,
    email: null
  }

  self.user = angular.extend({}, empty_user, {
    isLoggedIn: isLoggedIn
  });

  self.currentUser = setCurrentUser;
  self.signup = signup;
  self.updateProfile = updateProfile;
  self.login = login;
  self.logout = logout;

  //// UserService Methods

  function setCurrentUser(user){
    console.log("newly updated", user)
    console.log("jwt user", $auth.getPayload())
    var user = user || $auth.getPayload();
    return angular.extend(self.user, user || empty_user);
  }

  function signup(user_data){
    return (
      $auth
       .signup(user_data) // signup (https://github.com/sahat/satellizer#authsignupuser-options)
       .then(
         function onSuccess(response) {
           $auth.setToken(response.data.token); // set token (https://github.com/sahat/satellizer#authsettokentoken)
           setCurrentUser();
         },

         function onError(error) {
           console.error(error);
         }
       )
    );
  }

  function updateProfile(profileData) {
    return (
      $http
        .put('/api/me', profileData)
        .then(
          function (response) {
            $auth.setToken(response.data.token); // set token (https://github.com/sahat/satellizer#authsettokentoken)
            setCurrentUser();
          },

          function onError(error) {
            console.error(error);
          }
        )

    );
  }

  function login(userData) {
    return (
      $auth
        .login(userData) // login (https://github.com/sahat/satellizer#authloginuser-options)
        .then(
          function onSuccess(response) {
            $auth.setToken(response.data.token); // set token (https://github.com/sahat/satellizer#authsettokentoken)
            setCurrentUser();
          },

          function onError(error) {
            console.error(error);
          }
        )
    );
  }

  function logout() {
    return (
      $auth
        .logout() // delete token (https://github.com/sahat/satellizer#authlogout)
        .then(function() {
          setCurrentUser();
        })
    );
  }

  //// Current User Methods

  function isLoggedIn(){
    return !!self.user.sub;
  }


}
