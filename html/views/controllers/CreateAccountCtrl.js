'use strict';

app.config(["w5cValidatorProvider", function (w5cValidatorProvider) {

    // 全局配置
    w5cValidatorProvider.config({
        blurTrig   : false,
        showError  : true,
        removeError: true
    });

    w5cValidatorProvider.setRules({
        username   : {
            required: "*输入的账户名不能为空"
        },
        password:{
            required: "*输入的密码不能为空"
        },
        confirm:{
            required: "*输入的确认密码不能为空"
        }
    });

}]);

app.controller('CreateAccountCtrl', ['$scope','$modal','dbUtils',function($scope,$modal,dbUtils) {

    //$scope.app.settings.showActive = true;

    $scope.noAuthData = [
        {id:0,name:'wemall',label:'wemall',rw:'readwrite',checked:false},
        {id:1,name:'msdl',label:'msdl',rw:'readonly',checked:false},
        {id:2,name:'ddsdsadas',label:'ddsdsadas',rw:'readonly',checked:false},
        {id:3,name:'ergffd',label:'ergffd',rw:'readwrite',checked:false},
        {id:4,name:'ythhf',label:'ythhf',rw:'readonly',checked:false}
    ];

    $scope.hasAuthData = [];

    $scope.selectItem = function (obj) {
        obj.checked = !obj.checked;
    }

    $scope.allSetTxt = '全部设为读写';

    var flag = true;

    checkData();

    $scope.startAuth = function () {

        var checkArr = [];

        angular.forEach($scope.noAuthData, function (val,inx) {
            if(val.checked){
                val.checked = false;
                checkArr.push(val);
                $scope.hasAuthData.push(val);
            }else{
                return;
            }
        })
        
        angular.forEach(checkArr, function (val,inx) {
            $scope.noAuthData.splice($scope.noAuthData.indexOf(val),1);
        })

        checkData();
    }

    $scope.removeAuth = function(){
        var checkArr = [];

        angular.forEach($scope.hasAuthData, function (val,inx) {
            if(val.checked){
                val.checked = false;
                checkArr.push(val);
                $scope.noAuthData.push(val);
            }else{
                return;
            }
        })

        angular.forEach(checkArr, function (val,inx) {
            $scope.hasAuthData.splice($scope.hasAuthData.indexOf(val),1);
        })

        checkData();
    }
    
    $scope.allAetRW = function () {
        if(flag){
            angular.forEach($scope.hasAuthData, function (val,inx) {
                val.rw = 'readwrite';
            })

            $scope.allSetTxt = '全部设为只读';

            flag = false;
        }else{
            angular.forEach($scope.hasAuthData, function (val,inx) {
                val.rw = 'readonly';
            })

            $scope.allSetTxt = '全部设为读写';

            flag = true;
        }
    }

    function checkData(){
        if($scope.hasAuthData.length == 0){
            $scope.noHasAuthData = true;
        }else{
            $scope.noHasAuthData = false;
        }
    }


    /*表单提交*/
    var vm = $scope.vm = {
        data : {}
    };

    vm.validateOptions = {
        blurTrig: true
    };

    vm.saveEntity = function (data) {
        if($scope.hasAuthData.length == 0){
            $scope.showAuthError = true;
        }else{

            //遍历一遍$scope.hasAuthData进行数据封装,然后加载到data中,此处省略

            console.log(data);
        }
    };

}]);