(function() {
  'use strict';

  angular.module('spotifyApp')
    .service('nowPlayingService', function() {
      this.tracks = {};

      this.setTracks = function(tracks) {
        this.tracks = tracks;
      };

      this.getTracks = function() {
        return this.tracks;
      };
    });
})();