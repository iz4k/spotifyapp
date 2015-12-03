(function () {

  angular
    .module('spotifyApp')
    .controller('navController', function ($scope, $log) {

      $scope.navOpen = false;
      $scope.openNav = function () {
        console.log('asfg');
        $scope.navOpen = !$scope.navOpen;
      }

      $scope.touchMove = function (event) {
        var element = angular.element(document.querySelector('#side-navigation'));
        element.css({
          'transition': 'none'
        });
        var y = event.center.y;
        if (y > 200) y = 200;
        element.css({
          'top': y + 'px'
        });
      };

      $scope.touchEnd = function (event) {
        var element = angular.element(document.querySelector('#side-navigation'));
        var y = event.center.y;
        if (y > 100) {
          element.css({
            'top': '200px',
            'transition': 'ease-in 0.25s all'
          });
        } else if (y < 100) {
          element.css({
            'top': '0px',
            'transition': 'ease-in 0.25s all'
          });
        }
      };
      //      DO WE NEED SEPARATE SWIPE SHIT
      //      $scope.swipeDown = function (event) {
      //        var element = angular.element(document.querySelector('#side-navigation'));
      //        console.log('IT WAS SWIPE DOWN');
      //        element.css({
      //          'top': '200px',
      //          'transition': 'ease-in 0.25s all'
      //        });
      //      };
      //
      //      $scope.swipeUp = function (event) {
      //        var element = angular.element(document.querySelector('#side-navigation'));
      //        console.log('IT WAS SWIPE UP');
      //        element.css({
      //          'top': '0px',
      //          'transition': 'ease-in 0.25s all'
      //        });
      //      };
    })
})();