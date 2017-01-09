'use strict';

/* Controllers */

angular.module('app')
    .controller('PaasZooKeeperCtrl', ['$scope', '$localStorage', '$window',
        function( $scope,  $localStorage,   $window ) {
            $scope.app.settings.asideFolded = true;
        }]);