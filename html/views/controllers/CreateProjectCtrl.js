/**
 * Created by wash on 16/3/28.
 */
'use strict';

app.controller("CreateProjectCtrl", ['$scope','$modalInstance','dbUtils', 'source', createProjectCtrl]);

//显示数据
function createProjectCtrl($scope,$modalInstance,dbUtils,source){

    $scope.uiForm = {
        settings: {transCode: "", cols: 1, showClose: true},
        title: {show:true,label: "项目", icon: "github-alt"},
        formData:source || {},
        sections: [{
            sectionTitle: {show: true, icon: "hand-o-right", label: "属性"},
            fields: [
                {name: "partyName", label: "角色名(中文)", type: "text", required: true, placeholder: "请输入角色名称", labelCols:3, cols: 12},
                {name: "partyNo", label: "角色名(英文)", type: "multiple",placeholder:"角色名",dataUrl:"../data/selectdata.json",valField:"country",required: true, labelCols:3, cols: 12},
                {name: "treeData", label: "资源树", type: "resourceTree",placeholder:"资源树",dataUrl:"../data/resourceTree.json",required: true, labelCols:3, cols: 12},
                {name: "organizationName", label: "描述", type: "text", required: true, readonly: false, placeholder: "请输入描述", labelCols:3, cols: 12},
            ]
        },{
            sectionTitle: {show: true, icon: "hand-o-right", label: "参数"},
            fields: [
                {name: "name", label: "日期", type: "dateRange", required: true, labelCols:3, cols: 12},
                {name: "typeCode", label: "类型", type: "select", dataUrl:"../data/selectdata.json", valField:"name", showDelete:true, required: true, labelCols:3, cols: 12},
                {name: "imageName", label: "图片描述", type: "textarea", required: true, readonly: false, placeholder: "请输入图片名称", labelCols:3, cols: 12},
                {name: "icheck", label: "可编辑", type: "checkbox", required: true,labelCols:3, cols: 12},
            ]
        }],
        events:{
            modalClose: function () {
                $modalInstance.dismiss("cancel");
            }
        }
    };

    $scope.uiForm.changeItem = function(item,model){   //触发select的change事件
        console.log(item);
    }


    //提交成功
    $scope.uiForm.submit = function (isValid) {
        $scope.uiForm.submited = true;

        console.log($scope.uiForm.formData);  //读取表单提交的数据

        /*if (isValid) {
            var reqBody = angular.copy($scope.data);
            dbUtils.post(angular.isUndefined(source) ? 'system.role.add' : 'system.role.edit',reqBody, function (data) {
                dbUtils.success('操作成功!');
                $modalInstance.close();
            }, function (error) {
                dbUtils.error(error);
            });
        }*/

    };
}
