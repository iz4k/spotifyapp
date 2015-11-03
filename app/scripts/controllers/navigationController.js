(function () {

  angular
    .module('spotifyApp')
    .controller('navController', function ($scope, $log) {
      $scope.navOpen = false;
      $scope.openNav = function () {
   console.log('asfg');
   $scope.navOpen = !$scope.navOpen;
 }

//      var e = document.getElementById('side-navigation');
//      var ham = new Hammer(e);
//      //            console.log('ham is ', ham);
//      ham.get('swipe').set({
//        direction: Hammer.DIRECTION_ALL
//      });
//      ham.on('swipe', function (event) {
//        $log.debug('swiping', event);
//      });
//
//      ham.on('pandown', function (event) {
//        $(event.target).css({
//          'transform': 'translateY(0px)'
//        });
//      });
//
//      ham.on('panup', function (event) {
//        $(event.target).css({
//          'transform': 'translateY(-70%)'
//        });
//      });
      //
      //      ham.on('panend', function (event) {
      //        console.log('dragend', event.target);
      //        $(event.target).parent().css({
      //          'color': 'red'
      //        });
      //        $(event.target).css({
      //          'transform': 'translate(0,0)'
      //        });
      //        debugger;
      //        var dropEl = document.elementFromPoint(event.gesture.center.pageX, event.gesture.center.pageY);
      //        console.log('dropped on', dropEl);
      //        if ($(dropEl).hasClass('drop-target')) {
      //          console.log('dropped on drop target');
      //        }
      //      });
      //
      //      ham.on('tap', function (event) {
      //        $log.debug('wat', event);
      //      });
      //      ham.on('swipedown', function (event) {
      //        $scope.navOpen = true;
      //      })

      //      $(document.body).on('mousedown', '[draggable]', function (event) {
      //
      //        console.log('mousedown', event);
      //      })
      //      $(document.body).on('mouseup', '[draggable]', function (event) {
      //
      //        console.log('mouseup', event);
      //        event.preventDefault()
      //      })
    })
})();