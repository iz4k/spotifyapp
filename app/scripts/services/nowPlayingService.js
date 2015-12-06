(function() {
  angular.module('spotifyApp')
    .service('nowPlayingService', function ($rootScope) {
      this.tracks = [];
      this.isPlaylist = false;
      this.trackindex = 0;

      this.setTracks = function(tracks, isPlaylist, trackindex) {
        this.tracks = tracks;
        this.isPlaylist = isPlaylist;
        this.trackindex = trackindex
        $rootScope.$broadcast('tracksUpdated');
      };

      this.getTracks = function() {
        return this.tracks;
      };
      
      this.getListType = function() {
        return this.isPlaylist;
      }

      this.getTrackIndex = function() {
        return this.trackindex;
      }

    });
})();
