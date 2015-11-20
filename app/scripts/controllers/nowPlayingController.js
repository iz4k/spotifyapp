(function () {

  angular
    .module('spotifyApp')
    .controller('nowPlayingController', function ($scope, $log, nowPlayingService) {
      $scope.playerOpen = false;
      $scope.tracks = [];
      $scope.trackIndex = 0;
      $scope.trackString = '';

      $scope.$on('tracksUpdated', function() {
        $scope.tracks = nowPlayingService.getTracks();
        $scope.trackIndex = 0;
        updateTrackString();
      });

      $scope.nextTrack = function() {
        $scope.trackIndex = ($scope.trackIndex + 1) % $scope.tracks.length;
      };

      $scope.previousTrack = function() {
        var temp = $scope.trackIndex - 1;
        if (temp < 0) {
          temp = temp + $scope.tracks.length;
        }
        $scope.trackIndex = temp % $scope.tracks.length;
      };

      var updateTrackString = function() {
        if ($scope.tracks == {}) {
          $scope.trackString = '';
        }

        var artistName = $scope.tracks[$scope.trackIndex].artists[0].name;
        var trackName = $scope.tracks[$scope.trackIndex].name;
        $scope.trackString = artistName + ' - ' + trackName;
      };
    });
})();