(function () {

  angular
    .module('spotifyApp')
    .controller('nowPlayingController', function ($scope, $log) {
      $scope.playerOpen = false;
    });
})();