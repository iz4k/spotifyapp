(function () {

    angular
    .module('spotifyApp')
    .controller('searchController', function (spotifyService, spotifyFactory, nowPlayingService, Auth, $scope, $log, $timeout) {
        $scope.searchType = 'Album';
        $scope.selectedAlbum = '';
        $scope.tapped_item_id = '';
        $scope.top_tracks = [];
        $scope.results = [];
        $scope.search = function () {
            spotifyService.getResults({
                q: $scope.searchTerm,
                type: $scope.searchType
            }).$promise.then(function (data) {
                if ($scope.searchType == 'Album') {
                    console.log('album items', data.albums.items);
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
                    console.log($scope.results);
                }
            });
        };

        $scope.selectItem = function(item) {
            if (item.type == 'album') {
                // Selected item is an album
                var tracks = item.info.tracks.items;
                nowPlayingService.setTracks(tracks, false, 0, item.images[0].url);
            } else if (item.type == 'artist') {
                // TODO: Handle artist search
                // GET top popular songs
                
                console.log('artist tapped')
                
                if ($scope.tapped_item_id == item.id) {
                    $scope.tapped_item_id = '';

                } else {

                    $scope.tapped_item_id = item.id
                        spotifyFactory.getArtistTopTracks(item.id,Auth.getUserCountry()).then(function(data) {
                            console.log('got top tracks ', data);
                            $scope.top_tracks=data.tracks;
                        });     
                }


            }
        };

        $scope.trackTapped = function( position, imageUrl) {
            console.log("Track tapped");
            console.log("position: " + position);
            nowPlayingService.setTracks($scope.top_tracks, false, position, imageUrl);
        };


    })
})();
