(function () {

  angular
    .module('spotifyApp')
    .directive('nowPlaying', function () {
      return {
        templateUrl: 'partials/nowPlaying.html',
        controller: 'nowPlayingController'
      }
    })
})();