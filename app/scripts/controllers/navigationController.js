(function () {

  angular
    .module('spotifyApp')
    .controller('navController', function ($scope, $log) {
      $scope.navOpen = false;
      $scope.openNav = function () {
        $scope.navOpen = !$scope.navOpen;
      }

      //      var e = document.getElementById('side-navigation');
      //      var ham = new Hammer(e);
      //      console.log('ham is ', ham);
      //      ham.get('pan').set({
      //        direction: Hammer.DIRECTION_ALL
      //      });
      //      ham.on('panstart', function (event) {
      //        $log.debug('drag started', event);
      //      });
      //
      //      ham.on('pan', function (event) {
      //        console.log($(event.target).parent()[0]);
      //        //        if (event.deltaY <= 0) {
      //        $(event.target).parent().css({
      //          'transform': 'translateY(' + event.deltaY + 'px)'
      //        });
      //        //        }
      //        console.log('pan', event, event.deltaY);
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