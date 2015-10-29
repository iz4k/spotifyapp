(function () {
  'use strict';

  angular.module('spotify')
    .service('spotifyService', function ($resource) {
      return $resource('https://api.spotify.com/v1/search', {}, {
        getResults: {
          method: 'GET',
          params: {},
          isArray: false
        },
        getAlbumDetails: {
          url: 'https://api.spotify.com/v1/albums/:id',
          method: 'GET',
          params: {
            id: 'id'
          },
          isArray: false
        }
      });

    });

})();