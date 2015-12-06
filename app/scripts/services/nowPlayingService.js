(function() {
  angular.module('spotifyApp')
    .service('nowPlayingService', function ($rootScope) {
      this.tracks = [];
      this.isplaylist = false;
      this.trackindex = 0;

      this.setTracks = function(tracks, isplaylist, trackindex) {
        this.tracks = tracks;
        this.isplaylist = isplaylist;
        this.trackindex = trackindex
        $rootScope.$broadcast('tracksUpdated');
      };

      this.getTracks = function() {
        return this.tracks;
      };
      
      this.getListType = function() {
        return this.isplaylist;
      }

      this.getTrackIndex = function() {
        return this.trackindex;
      }

    });
})();
