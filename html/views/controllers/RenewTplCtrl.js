app.controller("RenewTplCtrl", ['$scope','$modalInstance','dbUtils', 'source','$timeout', RenewTplCtrl]);

//显示数据
function RenewTplCtrl($scope,$modalInstance,dbUtils,source,$timeout){

    console.log(source);


    $scope.cancel = function () {
        $modalInstance.dismiss("cancel");
    }

    //购买时长
    $scope.month_slider = {
        min:1,
        max:12,
        currentValue:source.times,
        rangeChangeCallback:function (sliderObj) {
            $scope.month_slider_value = sliderObj.from;
        },
        rangeFinishCallback:function (sliderObj) {
            $scope.month_slider_value = sliderObj.from;
        }
    };

    $scope.month_slider_value = $scope.month_slider.currentValue;


    $scope.subMonth = function () {
        alert($scope.month_slider_value);
    }


}
