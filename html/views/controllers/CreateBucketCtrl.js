/**
 * Created by wash on 16/3/28.
 */
'use strict';

angular.module('app').config(["w5cValidatorProvider", function (w5cValidatorProvider) {

    w5cValidatorProvider.config({
        blurTrig   : false,
        showError  : true,
        removeError: true
    });

    w5cValidatorProvider.setRules({
        bucketName : {
            required: "*输入的bucketName不能为空",
            pattern:"*bucketName格式不正确",
            minlength: "内容长度不能小于{minlength}",
            maxlength: "内容长度不能大于{maxlength}"
        },
        region: {
            required:"*所属地域不能为空"
        },
        commission:{
            required:"读写权限不能为空"
        }
    });

}]);


app.controller("CreateBucketCtrl", ['$scope','$modalInstance','dbUtils', 'source','$timeout', CreateBucketCtrl]);

//显示数据
function CreateBucketCtrl($scope,$modalInstance,dbUtils,source,$timeout){

    $scope.hasBucketName = false;

    $scope.selectData = $scope.selectData1 = [
        { "id": "0",      "label": "全部",      "value": "all"},
        { "id": "1",    "label": "计算机",    "value": "computer"},
        { "id": "2", "label": "金融", "value": "financial"},
        { "id": "3",    "label": "哲学",    "value": "philosophy"},
        { "id": "4",  "label": "高端办公",  "value": "Office"},
        { "id": "5",  "label": "文学",  "value": "literature"},
        { "id": "6",    "label": "网络小说", "value": "Fiction"},
        { "id": "7",   "label": "杂志", "value": "magazine" }
    ];

    var vm = $scope.vm = {
        entity : {}
    };

    vm.validateOptions = {
        blurTrig: true
    };

    vm.saveEntity = function (data) {
        if($scope.hasBucketName){
            dbUtils.info('bucketName已存在，不能提交');
        }else{
            console.log(data);
        }
    };
    
    $scope.cancel = function () {
        $modalInstance.dismiss("cancel");
    }


    var timeout;
    $scope.$watch('entity.bucketName', function(newUserName) {
        if (newUserName) {
            if (timeout) {
                $timeout.cancel(timeout);
            }
            timeout = $timeout(function() {
                //发起请求
                console.log('发起请求');
                $scope.hasBucketName = true;  //显示"bucketName已存在"那句提示
            }, 350);
        }
    });


    /*$scope.uiForm = {
        settings: {cols: 1, showClose: true},   //isDetail设置只查看,不能编辑
        title: {show:true,label: "Bucket", icon: "github-alt"},
        sections: [{
            fields: [
                {name: "BucketName", label: "BucketName", type: "text", required: true, placeholder: "请输入Bucket", labelCols:3, cols: 12,dbValidator:"specialName"},
                {name: "region", label: "所属地域", type: "select",editable:false, dataUrl:"../data/bookType.json", valField:"label", showDelete:true, required: true, labelCols:3, cols: 12},
                {name: "commission", label: "读写权限", type: "select",editable:false, dataUrl:"../data/bookType.json", valField:"label", showDelete:true, required: true, labelCols:3, cols: 12}
            ]
        }],
        defaultData:source,  //编辑模式
        // originData: source,  //查看模式
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

        if(isValid){

            console.log($scope.uiForm.formData);  //读取表单提交的数据

            $scope.uiForm.modalClose();
        }

    };*/

}
