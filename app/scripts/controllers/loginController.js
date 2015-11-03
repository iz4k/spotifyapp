(function () {

  angular
    .module('spotifyApp')
    .controller('loginController', function (spotifyService, $scope, $log) {
      spotifyService.authorizeUser({
          client_id: 'b53f5fe714194e2cbd6db54d42301617',
          response_type: 'code',
          redirect_url: ''
        })
        .$promise.then(function (data) {
          $log.debug('mitä', data);
        });
    })
})();