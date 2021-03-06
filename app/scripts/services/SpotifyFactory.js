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
            },

        getPlaylists: function(username) {
            var limit = 50;
            var ret = $q.defer();
            var playlists = [];

            $http.get(baseUrl + '/users/' + encodeURIComponent(username) + '/playlists', {
                params: {
                    limit: limit
                },
                headers: {
                    'Authorization': 'Bearer ' + Auth.getAccessToken()
                }
            }).success(function(r) {
                playlists = playlists.concat(r.items);

                var promises = [],
            total = r.total,
            offset = r.offset;

            while (total > limit + offset) {
                promises.push(
                    $http.get(baseUrl + '/users/' + encodeURIComponent(username) + '/playlists', {
                        params: {
                            limit: limit,
                        offset: offset + limit
                        },
                        headers: {
                            'Authorization': 'Bearer ' + Auth.getAccessToken()
                        }
                    })
                    );
                offset += limit;
            };

            $q.all(promises).then(function(results) {
                results.forEach(function(result) {
                    playlists = playlists.concat(result.data.items);
                })
                //console.log('got playlists', playlists);
                ret.resolve(playlists);
            });

            }).error(function(data, status, headers, config) {
                ret.reject(status);
            });
            return ret.promise;
        },

        getPlaylist: function(username, playlist) {
            var ret = $q.defer();
            $http.get(baseUrl + '/users/' + encodeURIComponent(username) + '/playlists/' + encodeURIComponent(playlist), {
                headers: {
                    'Authorization': 'Bearer ' + Auth.getAccessToken()
                }
            }).success(function(r) {
                ret.resolve(r);
            });
            return ret.promise;
        },

        removeTrackFromPlaylist: function(username, playlist, track, position) {
            var ret = $q.defer();
            $http.delete(baseUrl + '/users/' + encodeURIComponent(username) + '/playlists/' + encodeURIComponent(playlist) + '/tracks',
                    {
                        data: {
                            tracks: [{
                                uri: track.uri,
                position: position
                            }]
                        },
                headers: {
                    'Authorization': 'Bearer ' + Auth.getAccessToken()
                }
                    }).success(function(r) {
                        console.log('remove track from playlist', r);
                        ret.resolve(r);
                    });
            return ret.promise;
        },

        createNewPlaylist: function(playlistname) {
            var ret = $q.defer();
            $http.post(baseUrl + '/users/' + encodeURIComponent(Auth.getUsername()) + '/playlists',
                    {
                        data: {
                            name: playlistname,
                            public: true
                        },
                headers: {
                    'Authorization': 'Bearer ' + Auth.getAccessToken()
                }
                    }).success(function(r) {
                        console.log('Added a new playlist', r);
                        ret.resolve(r);
                    });
            return ret.promise;
        },

        getArtistTopTracks: function(artistid, country) {
            var ret = $q.defer();
            $http.get(baseUrl + '/artists/' + encodeURIComponent(artistid) + '/top-tracks?country=' + encodeURIComponent(country), {
                headers: {
                    'Authorization': 'Bearer ' + Auth.getAccessToken()
                }
            }).success(function(r) {
                ret.resolve(r);
            });
            return ret.promise;
        },




        }   

    });

})();
