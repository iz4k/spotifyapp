(function() {
  angular.module('spotifyApp')
    .service('nowPlayingService', function ($rootScope) {
      this.tracks = [];

      this.setTracks = function(tracks) {
        this.tracks = tracks;
        $rootScope.$broadcast('tracksUpdated');
      };

      this.getTracks = function() {
        return this.tracks;
      };
    });
})();