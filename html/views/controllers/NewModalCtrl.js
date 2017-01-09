/**
 * Created by wash on 16/3/28.
 */
'use strict';

app.controller("NewModalCtrl", ['$scope','$modalInstance','dbUtils', 'source', NewModalCtrl]);

//显示数据
function NewModalCtrl($scope,$modalInstance,dbUtils,source){

    $scope.formdata = {};

    $scope.formdata.type = '性能型';


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

    $scope.formdata.area = $scope.fields[2];

    $scope.slider_visible_bar_month = {
        value: 1,
        options: {
            // showSelectionBar: true,
            // showTicks: true,
            // showTicksValues: true,
            ceil: 12,
            floor: 1,
            step:1,
            translate: function(value) {
                return value + '个月';
            }
        }
    };


    $scope.slider_visible_bar_mem = {
        value: 10,
        options: {
            showSelectionBar: true,
            //showTicks: true,
            //showTicksValues: true,
            ceil: 1000,
            floor: 10,
            step:5,
            translate: function(value) {
                return value + 'GB';
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
