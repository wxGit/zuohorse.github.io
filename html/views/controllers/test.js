/**
 * Created by wash on 16/3/28.
 */
'use strict';

app.controller("testCtrl", ['$scope','$modalInstance','dbUtils', 'source', test]);

//显示数据
function test($scope,$modalInstance,dbUtils,source){

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
