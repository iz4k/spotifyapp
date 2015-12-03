(function () {

  angular
    .module('spotifyApp')
    .controller('playlistController', function (spotifyService, spotifyFactory, Auth, $scope, $log) {
      
      $log.debug('in playlist controller');
    

      spotifyFactory.getPlaylists(Auth.getUsername()).then(function(data){
        console.log(data);
        $scope.results = data;
      });

      $scope.openPlaylist = function(playlist_id, user_id){
        console.log(playlist_id);

        if ($scope.clicked_list == playlist_id) {
          // if the previous click was this element -> hide it.
          $scope.clicked_list = "";  
        } else {
          // not necessary to fetch the data for element closing click.
          $scope.clicked_list = playlist_id;
          spotifyFactory.getPlaylist(user_id, playlist_id).then(function(data){
            console.log('Got playlist:\n');
            console.log(data);
                    
            $scope.playlistdata = data;
          });  
        }

        
      }


    })
})();