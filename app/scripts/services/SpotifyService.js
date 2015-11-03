// Client ID: b53f5fe714194e2cbd6db54d42301617
// Client Secret: 0044b8159edf4afdb1e4a7879e3bdd5a

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
        },
        authorizeUser: {
          url: 'https://accounts.spotify.com/authorize',
          method: 'GET',
        }
      });

    });

})();