(function () {

  angular
  .module('spotifyApp')
  .controller('nowPlayingController', function ($scope, $log, nowPlayingService) {
    $scope.playerOpen = false;
    $scope.tracks = [];
    $scope.trackIndex = 0;
    $scope.trackString = '';
    $scope.isplaylist = false;
    $scope.trackImage = '';

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
        $scope.trackImage = '';
      }

      if ($scope.isplaylist) {
        var artistName = $scope.tracks[$scope.trackIndex].track.artists[0].name;
        var trackName = $scope.tracks[$scope.trackIndex].track.name;
        $scope.trackImage = $scope.tracks[$scope.trackIndex].track.album.images[0].url;

      }
      else {
        var artistName = $scope.tracks[$scope.trackIndex].artists[0].name;
        var trackName = $scope.tracks[$scope.trackIndex].name;
        //$scope.trackImage = $scope.tracks[$scope.trackIndex].album.images[0].url;
        $scope.trackImage = '';


      }
      $scope.trackString = artistName + ' - ' + trackName;
    };

    $scope.touchMove = function (event) {
      var element = angular.element(document.querySelector('.now-playing'));
      element.css({
        'transition': 'none'
      });

      var windowHeight = window.innerHeight;
      // Multiplier must match app.css height for .now-playing
      var nowPlayingTotalHeight = 0.6 * windowHeight;
      var y = event.center.y;
      var height = 80 - 100 * (windowHeight - y) / nowPlayingTotalHeight;
      if (height > 80) {
        height = 80;
      } else if (height < 0) {
        height = 0;
      }
      element.css({
        'transform': 'translateY(' + height + '%)'
      });
    };

    $scope.touchEnd = function (event) {
      var element = angular.element(document.querySelector('.now-playing'));
      var y = event.center.y;
      var windowHeight = window.innerHeight;
    };

    /*
    $scope.onSwipeUp = function () {
      $scope.playerOpen = true;
    };

    $scope.onSwipeDown = function () {
      $scope.playerOpen = false;
    };
    */

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
