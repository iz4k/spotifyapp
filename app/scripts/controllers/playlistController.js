(function () {

  angular
    .module('spotifyApp')
    .controller('playlistController', function (spotifyService, $scope, $log) {
      //      $scope.searchType = 'Album';
      //      $scope.selectedAlbum = '';
      //      $scope.results = [];
      //      $scope.search = function () {
      //        spotifyService.getResults({
      //          q: $scope.searchTerm,
      //          type: $scope.searchType
      //        }).$promise.then(function (data) {
      //          $scope.results = data.albums.items;
      //        });
      //      };
      $log.debug('in playlist controller');
      spotifyService.userInformation().$promise.then(function (data) {
        console.log('userdata', data);
        spotifyService.getPlaylists({
          userid: data.id
        }).$promise.then(function (data2) {
          console.log(data2, 'afte playlists');
        })
      });
    })
})();