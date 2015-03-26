'use strict';

/**
 * @ngdoc function
 * @name spotifyAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the spotifyAppApp
 */
angular.module('spotifyAppApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
