'use strict';

/* Controllers */

angular.module('app')
    .controller('RecoveryCtrl', ['$scope', '$localStorage', '$window',
        function( $scope,  $localStorage,   $window ) {
            $scope.app.settings.asideFolded = true;
        }]);