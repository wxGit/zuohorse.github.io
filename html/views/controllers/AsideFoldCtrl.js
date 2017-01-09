'use strict';

/* Controllers */

angular.module('app')
    .controller('AsideFoldCtrl', ['$scope', '$translate', '$localStorage', '$window',
        function( $scope,   $translate,   $localStorage,   $window ) {
            $scope.app.settings.asideFolded = true;
    }]);