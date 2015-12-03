(function () {

  angular
    .module('spotifyApp')
    .controller('nowPlayingController', function ($scope, $log, nowPlayingService) {
      $scope.playerOpen = false;
      $scope.tracks = [];
      $scope.trackIndex = 0;
      $scope.trackString = '';

      $scope.currentlyPlaying = false;
      var audio = new Audio();

      $scope.$on('tracksUpdated', function () {
        $scope.tracks = nowPlayingService.getTracks();
        $scope.trackIndex = 0;
        // Pause audio when track list is updated
        pauseSong();
        resetSongPosition();
        audio.src = $scope.tracks[$scope.trackIndex].preview_url;
        updateTrackString();
      });

      $scope.nextTrack = function () {
        $scope.trackIndex = ($scope.trackIndex + 1) % $scope.tracks.length;
        audio.src = $scope.tracks[$scope.trackIndex].preview_url;
        if ($scope.currentlyPlaying)
          playSong();
        updateTrackString();
      };

      $scope.previousTrack = function () {
        var temp = $scope.trackIndex - 1;
        if (temp < 0) {
          temp = temp + $scope.tracks.length;
        }
        $scope.trackIndex = temp % $scope.tracks.length;
        audio.src = $scope.tracks[$scope.trackIndex].preview_url;
        if ($scope.currentlyPlaying)
          playSong();
        updateTrackString();
      };

      var updateTrackString = function () {
        if ($scope.tracks == {}) {
          $scope.trackString = '';
        }

        var artistName = $scope.tracks[$scope.trackIndex].artists[0].name;
        var trackName = $scope.tracks[$scope.trackIndex].name;
        $scope.trackString = artistName + ' - ' + trackName;
      };

      $scope.onSwipeUp = function () {
        $scope.playerOpen = true;
      };

      $scope.onSwipeDown = function () {
        $scope.playerOpen = false;
      };

      $scope.togglePlaying = function () {
        if ($scope.currentlyPlaying) {
          pauseSong();
        } else {
          playSong();
        }
      };

      $scope.disableBackgroundScrolling = function () {
        var e = angular.element(document.querySelector('body'));
        e.addClass('stopscroll');
      };

      $scope.enableBackgroundScrolling = function () {
        var e = angular.element(document.querySelector('body'));
        e.removeClass('stopscroll');
      };

      var playSong = function () {
        audio.play();
        $scope.currentlyPlaying = true;
      };

      var pauseSong = function () {
        audio.pause();
        $scope.currentlyPlaying = false;
      };

      var resetSongPosition = function () {
        pauseSong();
        audio.src = $scope.tracks[$scope.trackIndex].preview_url;
      };
    });
})();