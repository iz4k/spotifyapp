(function () {

  angular
    .module('spotifyApp')
    .controller('searchController', function (spotifyService, $scope, $log) {
      $scope.searchType = 'Album';
      $scope.selectedAlbum = '';
      $scope.results = [];
      $scope.search = function () {
        spotifyService.getResults({
          q: $scope.searchTerm,
          type: $scope.searchType
        }).$promise.then(function (data) {
          if ($scope.searchType == 'Album') {
            $scope.results = data.albums.items;
          } else {
            $scope.results = data.artists.items;
          }
        });
      };

    })
})();