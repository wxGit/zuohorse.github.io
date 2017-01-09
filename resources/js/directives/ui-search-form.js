'use strict';
angular.module('app')
    .directive('uiSearchForm', ['dbUtils','$timeout', '$window',function (dbUtils,$timeout,$window) {
    return {
        restrict: 'E',
        templateUrl: "../resources/templates/uiSearchForm.html",
        replace: true,
        scope: {
            options:'=options'
        },
        controller: ['$scope', function ($scope) {

            $scope.queryParams = $scope.options.form.params || {};

            var selectFields = [];
            //计算每个占用的列数
            var fieldCols = 12 / $scope.options.form.settings.cols;
            angular.forEach($scope.options.form.fields, function (field) {
                if (angular.isUndefined(field.cols)) {
                    field.cols = fieldCols;
                }
                if (angular.isUndefined(field.labelCols)) {
                    field.labelCols = 4;
                }
                $scope.queryParams[field.name] = null;

                if(field.dataUrl && (field.type === "select"|| field.type=="multiple")){
                    //console.log(field.dataUrl);

                    dbUtils.get(field.dataUrl,{}, function (data) {

                        field.data = data;

                    },function (data) {

                    });

                }

            });

            /**
             * 为表单对象设置值
             * @param fieldName 要设置的属性名称
             * @param value 值
             */
            $scope.setFormDataField = function (fieldName, value) {
                $scope.queryParams[fieldName] = value;
            };
            
            $scope.getParamsData = function () {
                console.log($scope.options.params);
            }

        }],
        link: function (scope, element, attrs,controller) {
            $timeout(
                function () {
                    //如果定义datePickerInit方法则不执行默认事件
                    if (scope.options.datePickerInit) {
                        scope.options.datePickerInit();
                    } else {
                        var $ = $window.jQuery;
                        if ($().datepicker) {
                            $('.date-picker').datepicker({
                                isRTL: true,
                                orientation: "left",
                                autoclose: true,
                                language: 'cn',
                                endDate: '0d'
                            });
                        }
                    }

                },
                100
            );
        }
    }
}]);