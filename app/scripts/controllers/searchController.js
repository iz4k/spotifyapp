(function () {

  angular
    .module('spotifyApp')
    .controller('searchController', function (spotifyService, nowPlayingService, $scope, $log, $timeout) {
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
            _.each($scope.results, function (album) {
              spotifyService.getAlbumDetails({
                id: album.id
              }).$promise.then(function (info) {
                album.info = info;
              });
            });
          } else {
            $scope.results = data.artists.items;
          }
        });
      };

      $scope.selectItem = function(item) {
        if (item.type == 'album') {
          // Selected item is an album
          var tracks = item.info.tracks.items;
          console.log(tracks);
          nowPlayingService.setTracks(tracks, false, 0);
        }
      };
    })
})();
