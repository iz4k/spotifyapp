(function () {
  'use strict';

  angular.module('spotifyApp')
    .service('spotifyService', function ($resource, Auth) {
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
          method: 'GET'
        },
        userInformation: {
          url: 'https://api.spotify.com/v1/me',
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + Auth.getAccessToken()
          }
        },
        getPlaylists: {
          url: 'https://api.spotify.com/v1/users/:userid/playlists',
          method: 'GET',
          params: {
            userid: '@userid'
          }
        }
      });

    });

})();