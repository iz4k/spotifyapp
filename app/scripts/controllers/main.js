'use strict';

/**
 * @ngdoc function
 * @name spotifyAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the spotifyAppApp
 */
angular.module('spotifyAppApp')
  .controller('MainCtrl', function ($scope, $http, $log) {
  	$scope.type = 'album';
    $scope.search = function(){
    	if($scope.query.length > 3){
	    	$http.get('https://api.spotify.com/v1/search', {
	    		params : {
	    			'q' : $scope.query,
	    			'type' : 'Album'
	    		}
	    	}).success(function(data){
	    		$scope.albums = data.albums;
	    		$log.debug($scope.albums);
	    	});
	    	$http.get('https://api.spotify.com/v1/search', {
	    		params : {
	    			'q' : $scope.query,
	    			'type' : 'Artist'
	    		}
	    	}).success(function(data){
	    		$scope.artists = data.artists;
	    		$log.debug($scope.artists);
	    	});
	    }
    };
  });
