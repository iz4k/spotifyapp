(function () {

  /*angular
    .module('spotifyApp')
    .controller('loginController', function (spotifyService, $scope, $log) {
      $scope.login = function(){
          spotifyService.authorizeUser({
            client_id: 'b53f5fe714194e2cbd6db54d42301617',
            response_type: 'token',
            redirect_uri: 'http://localhost:8000',
          })
          .$promise.then(function (data) {
            $log.debug('mitä', data);
          });
        }
    })*/
  var module = angular.module('spotifyApp');

  module.controller('loginController', function($scope, Auth, $state) {
    $scope.isLoggedIn = false;
    
    $scope.login = function() {
      // do login!
      console.log('do login...');

      Auth.openLogin();
      $scope.$emit('login');
      // $state.go('playlist');
    }

    $scope.logout = function() {
      console.log('do logout...');
        $scope.showplayer = false;
        $scope.showlogin = true;
        Auth.deleteUserInfo();
        $scope.$emit('logout');

      }

  });


})();