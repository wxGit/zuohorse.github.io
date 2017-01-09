'use strict';

app.controller('PurchaseOssCtrl', ['$scope','$modal','dbUtils','$state',function($scope,$modal,dbUtils,$state) {
    $scope.data = {};

    $scope.gotoBucket = function () {
        $state.go('paas.oss.bucketlist');
    }

}]);