(function () {

  var module = angular.module('spotifyApp');
  module.controller('playlistController', function (spotifyService, spotifyFactory, nowPlayingService, Auth, $scope, $log) {

    $log.debug('in playlist controller');


    spotifyFactory.getPlaylists(Auth.getUsername()).then(function(data){
      console.log(data);
      $scope.results = data;
    });

    $scope.openPlaylist = function(playlist_id, user_id){
      console.log(playlist_id);
      $scope.playlist_opened = true;

      if ($scope.clicked_list == playlist_id) {
        // if the previous click was this element -> hide it.
        $scope.clicked_list = "";
        $scope.playlist_opened = false;  
      } else {
        // not necessary to fetch the data for element closing click.
        $scope.clicked_list = playlist_id;
        spotifyFactory.getPlaylist(user_id, playlist_id).then(function(data){
          console.log('Got playlist:\n');
          console.log(data);

          $scope.playlistdata = data;
        });  
      }
    };

    $scope.trackTap = function(tracks, trackindex, imageUrl) {
      nowPlayingService.setTracks(tracks, true, trackindex, imageUrl);
    };


    $scope.trackSwipeLeft = function(track) {
      console.log('Track "' + track.name + '" swiped left');  
    };


    $scope.trackSwipeRight = function(track, position) {

      var element = angular.element(document.querySelector("#track_" + track.id));
      
      element.addClass('removed-track').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        
        console.log('Removing "' +track.name + '"')
        
        // This is done to prevent there being conflicting indices between this scope and the server model
        $scope.playlistdata.tracks.items.splice(position, 1);
        $scope.$apply(); // Applies the changes made to the scope
   

        console.log('username: ' + Auth.getUsername());
        console.log('playlist: ' + $scope.playlistdata.id);
        console.log('track: ' + track.uri);
        console.log('position: ' + position);
        
        spotifyFactory.removeTrackFromPlaylist(Auth.getUsername(), $scope.playlistdata.id, track, position).then(function(data) {
          console.log(data);
          console.log('"'+ track.name + '" is really removed');
        });
      });
      
      console.log('Track "' + track.name + '" swiped right');   
    };

    
    $scope.createNewPlaylist = function() {
      console.log('Creating new playlist: "' + $scope.newPlaylistName  + '"');
      spotifyFactory.createNewPlaylist($scope.newPlaylistName).then(function(data) {
        console.log("new playlist created" + data);

      });
      $scope.newPlaylistName = "";
    };
  })
})();
