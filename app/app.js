var app = angular.module('spotifyApp', ['ui.router', 'ngResource']);

app.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/search");

  $stateProvider
    .state('playlist', {
      url: '/playlist',
      controller: 'playlistController',
      templateUrl: 'partials/playlist.html'
    }).state('search', {
      url: '/search',
      controller: 'searchController',
      templateUrl: 'partials/search.html'
    });
});

app.controller('AppController', function ($scope, Auth, $location, spotifyService, spotifyFactory) {
  $scope.playing = true;
  console.log('in AppController');

  console.log(location);

  /*function checkUser(redirectToLogin) {
    // this doesn't work for login
      spotifyService.userInformation().$promise.then(function(userInfo) {
        Auth.setUsername(userInfo.id);
        Auth.setUserCountry(userInfo.country);
        if (redirectToLogin) {
          $scope.$emit('login');
        }
      }, function(err) {
        $scope.$emit('login');
      });
  }*/

  function checkUser(redirectToLogin) {
    spotifyFactory.userInformation().then(function(userInfo) {
      Auth.setUsername(userInfo.id);
      Auth.setUserCountry(userInfo.country);
      if (redirectToLogin) {
        $scope.$emit('login');
        $location.replace();
      }
    }, function(err) {
      $scope.showplayer = false;
      $scope.showlogin = true;
      $location.replace();
    });
  }


  window.addEventListener("message", function(event) {
    console.log('got postmessage', event);
    var hash = JSON.parse(event.data);
    if (hash.type == 'access_token') {
      Auth.setAccessToken(hash.access_token, hash.expires_in || 60);
        
      checkUser(true);

    }
  }, false);

  $scope.isLoggedIn = (Auth.getAccessToken() != '');
  $scope.showplayer = $scope.isLoggedIn;
  $scope.showlogin = !$scope.isLoggedIn;

  $scope.$on('login', function() {
    $scope.showplayer = true;
    $scope.showlogin = false;
    $location.replace('/search');
  });

  $scope.$on('logout', function() {
    $scope.showplayer = false;
    $scope.showlogin = true;
  });


  if ($scope.isLoggedIn) {
    checkUser();  
  }
    


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