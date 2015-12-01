(function () {
  'use strict';

  /* This is doing the same stuff as the spotifyService, but for 
   some reason the login works only properly with this. 

  */

  var module = angular.module('spotifyApp');

  module.factory('spotifyFactory', function (Auth, $q, $http) {
    var baseUrl = 'https://api.spotify.com/v1';

    return {
      userInformation: function() {
        var ret = $q.defer();
        $http.get(baseUrl + '/me', {
          headers: {
            'Authorization': 'Bearer ' + Auth.getAccessToken()
          }
        }).success(function(r) {
          console.log('got userinfo', r);
          ret.resolve(r);
        }).error(function(err) {
          console.log('failed to get userinfo', err);
          ret.reject(err);
        });
        return ret.promise;
      }
    }   
     
  });

})();