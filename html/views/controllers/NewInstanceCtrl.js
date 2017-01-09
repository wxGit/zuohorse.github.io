/**
 * Created by wash on 16/3/28.
 */
'use strict';

app.controller("NewInstanceCtrl", ['$scope','$modalInstance','dbUtils', 'source', NewInstanceCtrl]);

//显示数据
function NewInstanceCtrl($scope,$modalInstance,dbUtils,source){

    $scope.formdata = {};

    $scope.formdata.count = 1;

    $scope.formdata.monthCount = 1;

    $scope.activeId = 0;

    $scope.formdata.region = 'shanghai';

    $scope.formdata.version = '5.5';

    $scope.nextHandler = function () {
        if($scope.activeId < 2){
            $scope.activeId++;
        }else {
            return;
        }
    }

    $scope.prevHandler = function () {
        if($scope.activeId > 0){
            $scope.activeId--;
        }else {
            return;
        }
    }

    $scope.fields = [
        { "id": "0",      "label": "全部",      "value": "all"},
        { "id": "1",    "label": "计算机",    "value": "computer"},
        { "id": "2", "label": "金融", "value": "financial"},
        { "id": "3",    "label": "哲学",    "value": "philosophy"},
        { "id": "4",  "label": "高端办公",  "value": "Office"},
        { "id": "5",  "label": "文学",  "value": "literature"},
        { "id": "6",    "label": "网络小说", "value": "Fiction"},
        { "id": "7",   "label": "杂志", "value": "magazine" }
    ];

    $scope.formdata.area = $scope.formdata.memory = $scope.fields[1];


    //Slider with selection bar
    $scope.slider_bar = {
        value: 0,
        options: {
            showSelectionBar: true,
            //showTicks: true,
            //showTicksValues: true,
            ceil: 2000,
            floor: 0,
            step:5,
            translate: function(value) {
                return value + 'GB';
            },
            onStart:function () {
                // console.log($scope.slider_bar.value);
            },
            onChange:function () {
                // console.log(1111);
            }
        }
    };




    if (angular.isUndefined(source)) {
        $scope.data = {
            partyName: null,
            partyNo: null,
            organizationName: null,
            departmentName:true
        };
    } else {
        $scope.formDisabled = false;
        $scope.editData = true;
        $scope.data = angular.copy(source);
        console.log($scope.data);
    }

    //取消Modal
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


    //提交成功
    $scope.submitDialogForm = function (isValid) {
        console.log($scope.data);
        console.log(source);
        $scope.submited = true;
        if (isValid) {
            var reqBody = angular.copy($scope.data);
            dbUtils.post(angular.isUndefined(source) ? 'system.role.add' : 'system.role.edit',reqBody, function (data) {
                dbUtils.success('操作成功!');
                $modalInstance.close();
            }, function (error) {
                dbUtils.error(error);
            });
        }
    };


}
