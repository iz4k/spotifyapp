var app = angular.module('spotifyApp', ['ui.router', 'ngResource']);

app.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('playlist', {
      url: '/playlist',
      controller: 'playlistController',
      templateUrl: 'partials/playlist.html'
    });
});

app.controller('AppController', function($scope, Auth, $location) {
    console.log('in AppController');

    console.log(location);   

    window.addEventListener("message", function(event) {
      console.log('got postmessage', event);
      var hash = JSON.parse(event.data);
      if (hash.type == 'access_token') {
        Auth.setAccessToken(hash.access_token, hash.expires_in || 60);
        // checkUser(true);
      }
    }, false);

    $scope.isLoggedIn = (Auth.getAccessToken() != '');
    $scope.showplayer = $scope.isLoggedIn;
    $scope.showlogin = !$scope.isLoggedIn;

    console.log('showlogin:' + $scope.showlogin);
    console.log('showplayer:' + $scope.showplayer);

    $scope.$on('login', function() {
      $scope.showplayer = true;
      $scope.showlogin = false;
      $location.path('/');
    });

    $scope.$on('logout', function() {
      $scope.showplayer = false;
      $scope.showlogin = true;
      $location.path('/');
    });

  });

//    var myElement = document.getElementById('myElement');
//
//    // create a simple instance
//    // by default, it only adds horizontal recognizers
//    var mc = new Hammer(myElement);
//    mc.get('pan').set({
//      direction: Hammer.DIRECTION_ALL
//    });
//    // listen to events...
//    mc.on("panleft panright panup pandown tap press", function (ev) {
//      console.log(ev.type + " gesture detected.");
//    });