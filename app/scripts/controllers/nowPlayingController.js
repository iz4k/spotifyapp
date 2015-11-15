(function () {

  angular
    .module('spotifyApp')
    .controller('nowPlayingController', function ($scope, $log, nowPlayingService) {
      $scope.playerOpen = false;

      $scope.$on('tracksUpdated', function() {
        // TODO: React to updated tracks
      });
    });
})();