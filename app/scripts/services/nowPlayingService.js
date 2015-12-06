(function() {
  angular.module('spotifyApp')
    .service('nowPlayingService', function ($rootScope) {
      this.tracks = [];
      this.isPlaylist = false;
      this.trackindex = 0;
      this.imageUrl = '';

      this.setTracks = function(tracks, isPlaylist, trackindex, imageUrl) {
        this.tracks = tracks;
        this.isPlaylist = isPlaylist;
        this.trackindex = trackindex
        // Default value for imageUrl is ''
        this.imageUrl = typeof imageUrl !== 'undefined' ? imageUrl : '';
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

      this.getImageUrl = function() {
        return this.imageUrl;
      }

    });
})();
