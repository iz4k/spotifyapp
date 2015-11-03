(function () {

  angular
    .module('spotify')
    .controller('SpotifyController', function (spotifyService, $scope, $log) {
      $scope.searchType = 'Album';
      $scope.selectedAlbum = '';
      $scope.search = function () {
        spotifyService.getResults({
          q: $scope.searchTerm,
          type: $scope.searchType
        }).$promise.then(function (data) {
          $scope.results = data.albums.items;
        });
      };

      /*open bottom sheet for the selected album*/
      $scope.openBottomSheet = function (album) {

//        $mdBottomSheet.show({
         //          templateUrl: './src/spotify/view/albumSheet.html',
         //          controller: function ($scope, $mdBottomSheet, album) {
         //            $scope.selectedAlbum = album;
         //
         //            var audio = new Audio();
         //            $scope.playSong = function (song) {
         //              audio.pause();
         //              audio.currentTime = 0;
         //              audio.src = song.preview_url;
         //              audio.play();
         //            }
         //          },
         //          resolve: {
         //            album: function (spotifyService) {
         //              return spotifyService.getAlbumDetails({
         //                id: album.id
         //              }).$promise;
         //            }
         //          }
         //        });

      };
    });
})();