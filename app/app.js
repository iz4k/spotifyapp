angular.module('spotifyApp', ['ui.router', 'ngResource'])

.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/login");

  $stateProvider
    .state('login', {
      url: '/login',
      controller: 'loginController',
      templateUrl: 'partials/login.html'
    })
    .state('playlist', {
      url: '/playlist',
      controller: 'playlistController',
      templateUrl: 'partials/playlist.html'
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