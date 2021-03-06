(function () {

  angular
  .module('spotifyApp')
  .controller('nowPlayingController', function ($scope, $log, nowPlayingService) {
    $scope.tracks = [];
    $scope.trackIndex = 0;
    $scope.trackString = '';
    $scope.isPlaylist = false;
    $scope.trackImage = '';

    $scope.currentlyPlaying = false;
    var audio = new Audio();

    $scope.$on('tracksUpdated', function () {
      $scope.tracks = nowPlayingService.getTracks();
      $scope.isPlaylist = nowPlayingService.getListType();
      $scope.trackIndex = nowPlayingService.getTrackIndex();
      $scope.trackImage = nowPlayingService.getImageUrl();
      // Pause audio when track list is updated
      pauseSong();
      resetSongPosition();
      if ($scope.isPlaylist) {
        audio.src = $scope.tracks[$scope.trackIndex].track.preview_url;
      } 
      else {
        audio.src = $scope.tracks[$scope.trackIndex].preview_url;
      }
      updateTrackString();
    });

    $scope.nextTrack = function () {
      $scope.trackIndex = ($scope.trackIndex + 1) % $scope.tracks.length;
      if ($scope.isPlaylist) {
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

      if ($scope.isPlaylist) {
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

      if ($scope.isPlaylist) {
        var artistName = $scope.tracks[$scope.trackIndex].track.artists[0].name;
        var trackName = $scope.tracks[$scope.trackIndex].track.name;      
        $scope.trackImage = $scope.tracks[$scope.trackIndex].track.album.images[0].url;

      }
      else {
        var artistName = $scope.tracks[$scope.trackIndex].artists[0].name;
        var trackName = $scope.tracks[$scope.trackIndex].name;
        if ($scope.tracks[$scope.trackIndex].album) {
            $scope.trackImage = $scope.tracks[$scope.trackIndex].album.images[0].url;
        }
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

      var windowHeight = window.innerHeight;
      // Multiplier must match app.css height for .now-playing
      var nowPlayingTotalHeight = 0.6 * windowHeight;
      var y = event.center.y;
      var height = 80 - 100 * (windowHeight - y) / nowPlayingTotalHeight;

      if (height > 40) {
        element.css({
          'transform': 'translateY(' + 80 + '%)',
          'transition': 'ease-in 0.25s all'
        });
      } else if (height < 40) {
        element.css({
          'transform': 'translateY(' + 0 + '%)',
          'transition': 'ease-in 0.25s all'
        });
      }

      $scope.enableBackgroundScrolling();
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

      if ($scope.isPlaylist) {
        audio.src = $scope.tracks[$scope.trackIndex].track.preview_url;
      } 
      else {
        audio.src = $scope.tracks[$scope.trackIndex].preview_url;
      }
    };

    $scope.trackSwipeRight = function() {
      // this to do the previous song
      console.log("Doing swiperight");
      
      var element = angular.element(document.querySelector('#track_'+$scope.trackIndex));
      
     element.addClass('previous-track-animation').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        element.removeClass('previous-track-animation');
        $scope.previousTrack();
        $scope.$apply();
      });



    }

    $scope.trackSwipeLeft = function() {
      // this to do the next song
     
     console.log("Doing swipeleft"); 
      
       
      var element = angular.element(document.querySelector('#track_'+$scope.trackIndex));
      
     element.addClass('next-track-animation').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        element.removeClass('next-track-animation');
        $scope.nextTrack();
        $scope.$apply();
      });
 
    }

  });
})();
