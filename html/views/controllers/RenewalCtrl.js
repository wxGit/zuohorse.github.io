'use strict';

app.controller('RenewalCtrl', ['$scope','$modal','dbUtils','$localStorage',function($scope,$modal,dbUtils,$localStorage) {

    console.log($localStorage.rowData);

    //购买时长
    $scope.month_slider = {
        min:1,
        max:12,
        currentValue:$localStorage.rowData.times,
        rangeChangeCallback:function (sliderObj) {
            $scope.month_slider_value = sliderObj.from;
        },
        rangeFinishCallback:function (sliderObj) {
            $scope.month_slider_value = sliderObj.from;
        }
    };

    $scope.month_slider_value = $scope.month_slider.currentValue;

}]);