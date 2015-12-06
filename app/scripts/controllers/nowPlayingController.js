(function () {

  angular
  .module('spotifyApp')
  .controller('nowPlayingController', function ($scope, $log, nowPlayingService) {
    $scope.playerOpen = false;
    $scope.tracks = [];
    $scope.trackIndex = 0;
    $scope.trackString = '';
    $scope.isplaylist = false;

    $scope.currentlyPlaying = false;
    var audio = new Audio();

    $scope.$on('tracksUpdated', function () {
      $scope.tracks = nowPlayingService.getTracks();
      $scope.isplaylist = nowPlayingService.getListType();
      $scope.trackIndex = nowPlayingService.getTrackIndex();
      // Pause audio when track list is updated
      pauseSong();
      resetSongPosition();
      if ($scope.isplaylist) {
        audio.src = $scope.tracks[$scope.trackIndex].track.preview_url;
      } 
      else {
        audio.src = $scope.tracks[$scope.trackIndex].preview_url;
      }
    updateTrackString();
    });

    $scope.nextTrack = function () {
      $scope.trackIndex = ($scope.trackIndex + 1) % $scope.tracks.length;
      if ($scope.isplaylist) {
        audio.src = $scope.tracks[$scope.trackIndex].track.preview_url;
      } 
      else {
        audio.src = $scope.tracks[$scope.trackIndex].preview_url;
      }

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

      if ($scope.isplaylist) {
        audio.src = $scope.tracks[$scope.trackIndex].track.preview_url;
      } 
      else {
        audio.src = $scope.tracks[$scope.trackIndex].preview_url;
      }




      if ($scope.currentlyPlaying)
        playSong();
      updateTrackString();
    };

    var updateTrackString = function () {
      if ($scope.tracks == {}) {
        $scope.trackString = '';
      }

      if ($scope.isplaylist) {
        var artistName = $scope.tracks[$scope.trackIndex].track.artists[0].name;
        var trackName = $scope.tracks[$scope.trackIndex].track.name;
      }
      else {
        var artistName = $scope.tracks[$scope.trackIndex].artists[0].name;
        var trackName = $scope.tracks[$scope.trackIndex].name;
      }
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

      if ($scope.isplaylist) {
        audio.src = $scope.tracks[$scope.trackIndex].track.preview_url;
      } 
      else {
        audio.src = $scope.tracks[$scope.trackIndex].preview_url;
      }
    };
  });
})();
