(function () {

  angular
    .module('spotifyApp')
    .controller('playlistController', function (spotifyService, $scope, $log) {
      $scope.searchType = 'Album';
      $scope.selectedAlbum = '';
      $scope.results = [];
      $scope.search = function () {
        spotifyService.getResults({
          q: $scope.searchTerm,
          type: $scope.searchType
        }).$promise.then(function (data) {
          $scope.results = data.albums.items;
        });
      };

    })
})();