'use strict';

/* Controllers */


angular.module('app').config(["w5cValidatorProvider", function (w5cValidatorProvider) {

    // 全局配置
    w5cValidatorProvider.config({
        blurTrig   : false,
        showError  : true,
        removeError: true
    });

    w5cValidatorProvider.setRules({
        email   : {
            required: "*输入的邮箱地址不能为空1111222",
            email   : "*邮箱地址格式不正确111222"
        },
        password:{
            required: "*输入的密码不能为空111222"
        },
        username : {
            required: "*输入的姓名不能为空111222",
            pattern:"*用户名必须输入字母、数字、下划线,以字母开头111222"
        }
    });

}]);


angular.module('app')
    .controller('FormWizardCtrl', ['$scope', '$localStorage', '$window',
        function( $scope,   $localStorage,   $window ) {

            //初始化
            $scope.steps = {
                percent:25,
                step1:true,
                step2:false,
                step3:false
            };

            var vm = $scope.vm = {
                entity : {},
                entity1 : {},
                entity2 : {}
            };

            vm.validateOptions = {
                blurTrig: true
            };

            vm.saveEntity = function (data) {
                console.log(data);

                $scope.steps.step1 = false;
                $scope.steps.step2 = true;
                $scope.steps.done1 = true;

                $scope.steps.percent = 50;

            };

            vm.saveEntity1 = function(data){
                console.log(data);

                $scope.steps.step2 = false;
                $scope.steps.step3 = true;
                $scope.steps.done2 = true;

                $scope.steps.percent = 75;

            }

            vm.saveEntity2 = function(data){
                console.log(data);

                $scope.steps.step3 = false;
                $scope.steps.step4 = true;
                $scope.steps.done3 = true;

                $scope.steps.percent = 100;

            }

        }]);