'use strict';

app.controller('EditInstanceCtrl', ['$scope','$modal','dbUtils',function($scope,$modal,dbUtils) {
    $scope.data = {};

    $scope.data.count = 1;

    $scope.monthArr = [{
        num:1,
        checked:true
    },{
        num:2,
        checked:false
    },{
        num:3,
        checked:false
    },{
        num:4,
        checked:false
    },{
        num:5,
        checked:false
    },{
        num:6,
        checked:false
    },{
        num:7,
        checked:false
    },{
        num:8,
        checked:false
    },{
        num:9,
        checked:false
    },{
        num:10,
        checked:false
    },{
        num:11,
        checked:false
    },{
        num:12,
        checked:false
    }];

    //Slider with selection bar
    $scope.slider_visible_bar = {
        value: 500,
        options: {
            showSelectionBar: true,
            //showTicks: true,
            //showTicksValues: true,
            ceil: 2000,
            floor: 0,
            step:5
        }
    };

    $scope.monthNum = 1;


    $scope.chooseLi = function(obj){

        $scope.monthNum = obj.num;

        var i;

        angular.forEach($scope.monthArr,function(v,i){
            v.checked = false;
        });

        for(i=0;i<=parseInt(obj.num)-1;i++){
            $scope.monthArr[i].checked = true;
        }
    }
}]);