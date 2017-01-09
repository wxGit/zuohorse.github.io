'use strict';

app.controller('BasicInfoCtrl', ['$scope','$modal','dbUtils','$stateParams',function($scope,$modal,dbUtils,$stateParams) {
    console.log($stateParams.mysqlName);
    $scope.projectName = 'asdsadas';

}]);