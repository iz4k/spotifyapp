'use strict';

/**
 * @ngdoc overview
 * @name spotifyAppApp
 * @description
 * # spotifyAppApp
 *
 * Main module of the application.
 */
angular
  .module('spotifyAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
