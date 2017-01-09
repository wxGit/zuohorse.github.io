var dbUtils = angular.module("dbUtils",[]);

dbUtils.factory("dbUtils", ["$http", "$window","$q","toaster","$modal", DbFetch]);

    function DbFetch($http, $window,$q,toaster,$modal) {
        var promise = false;
        var deferred = $q.defer();

        function getHtml(content, type) {
            var html = [];
            html.push('<div class="modal-header">');
            html.push('<h4 class="modal-title">提示</h4>');
            html.push('</div>');
            html.push('<div class="modal-body">');
            html.push(content);
            html.push('</div>');
            html.push('<div class="modal-footer">');
            html.push('<button class="btn btn-dark" type="button" ng-click="ok()">确定</button>');
            if (type == "confirm") {
                html.push('<button class="btn btn-default" type="button" ng-click="cancel()">取消</button>');
            }
            html.push('</div>');
            return html.join('');
        }

        function DialogController($scope, $modalInstance) {
            $scope.ok = function () {
                $modalInstance.close('cancel');
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            }
        }

        function dbAlert(content, okFun) {
            $modal.open({
                animation: true,
                template: getHtml(content),
                controller: ['$scope', '$modalInstance', DialogController],
                size: "sm",
                backdrop: "static"
            }).result.then(function () {
                if (angular.isFunction(okFun)) {
                    okFun.call();
                }
            });
        }

        function doTip(content) {
            var html = [];
            html.push('<div class="modal-header">');
            html.push('<h3 class="modal-title">提示</h3>');
            html.push('<div class="modal-body">');
            html.push(content);
            html.push('</div>');
            html.push('</div>');
            html.push('<div class="modal-footer">');
            html.push('</div>');

            $modal.open({
                animation: true,
                template: html.join(""),
                controller: ['$scope', '$modalInstance', DialogController],
                size: "sm"
            })
        }

        function doToasterTip(type, title, content) {
            toaster.pop({
                type: type,
                title: title,
                body: content,
                timeout: 4000,
                bodyOutputType: 'trustedHtml'
            });
        }

        return {
            success: function (content, title) {
                doToasterTip('success', title, content);
            },
            info: function (content, title) {
                doToasterTip('info', title, content);
            },
            warning: function (content, title) {
                doToasterTip('warning', title, content);
            },
            error: function (content, title) {
                doToasterTip('error', title, content);
            },
            alert: function (content, okFun) {
                dbAlert(content, okFun);
            },
            tip: function (content) {
                doToasterTip(content);
            },
            confirm: function (content, okFun, cancerFun) {
                $modal.open({
                    animation: true,
                    template: getHtml(content, 'confirm'),
                    controller: ['$scope', '$modalInstance', DialogController],
                    size: "sm",
                    backdrop: "static"
                }).result.then(function () {
                    okFun.call();
                }, function () {
                    if (angular.isFunction(cancerFun)) {
                        cancerFun.call();
                    }
                });
            },
            post: function (transCode, reqBody, success, error) {

                var ApiRequest = {};
                ApiRequest["transCode"] = transCode;
                ApiRequest["requestBody"] = reqBody;

                if(!promise){
                    promise = deferred.promise;
                }

                // var apiUrl = "http://hp.xiqing.info/mobile/api.do";
                 var apiUrl = "http://localhost:8080/mobile/api.do";
                $http.post(apiUrl, ApiRequest).success(function (data, status, headers, config) {
                    if(data['status']===200) {
                        success(data.responseBody);
                    }else if (data['status']===500){

                        console.log("网络通讯异常，请稍后再试！");
                    }else{

                        console.log("网络通讯异常，请稍后再试！");
                    }
                    deferred.resolve(data);
                    //判断返回值是系统异常，还是业务异常，来决定是否需要调用error回调
                }).error(function (data, status, headers, config) {

                    console.log("网络通讯异常，请稍后再试！");

                    deferred.reject();
                });

                return deferred.promise;

            },
            get: function (transCode, reqBody,success,error) {
                var ApiRequest = {};
                ApiRequest["transCode"] = transCode;
                ApiRequest["requestBody"] = reqBody;

                if(!promise){
                    promise = deferred.promise;
                }

                var apiUrl = "http://localhost:8080/mobile/api.do";
                $http.get(transCode, ApiRequest).success(function (data, status, headers, config) {

                    success(data.responseBody);
                    deferred.resolve(data);

                    //判断返回值是系统异常，还是业务异常，来决定是否需要调用error回调
                }).error(function (data, status, headers, config) {
                    error(data);

                    deferred.reject();

                });

                return deferred.promise;
            },
            dateFormat: function (date) {
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var date = date.getDate();
                return year + "-" + (month > 9 ? month : ("0" + month)) + "-" + (date > 9 ? date : ("0" + date));
            },

            /*
             * 根据指定变量获取集合中此变量的数组数据返回.
             * @param name
             * @param rows
             * @returns {Array}
             */
            getFieldArray: function (objectList, name) {
                var data = [];
                angular.forEach(objectList, function (record) {
                    data.push(record[name]);
                });
                return data;
            }
        }
    }


/**
 * 表单校验自定义标签
 在需要校验的表单input元素上添加：db-validator="required number" 属性，其中required number为校验方法的名称
 如需额外添加校验方法，可以在这里的method 当中添加
 * */

dbUtils.directive('dbValidator', ['$log', function ($log) {
    var methods = {};
    methods["required"] = function (value) {
        var msg = "字段为必录项!";
        var valid = (value != "");
        return {valid: valid, msg: msg};
    };
    methods["date"] = function (value) {
        var msg = "日期格式不正确";
        var valid = (/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value));
        return {valid: valid, msg: msg};
    };
    methods["number"] = function (value) {
        var msg = "非有效数字";
        var valid = (/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value));
        return {valid: valid, msg: msg};
    };
    methods["email"] = function (value) {
        var msg = "邮箱格式不正确";
        var valid = false;
        if (value != null && value != "") {
            valid = (/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
                .test(value));
        }
        return {valid: valid, msg: msg};
    };
    methods["mobile"] = function (value) {
        var msg = "手机格式不正确";
        var valid = (/^(13|14|15|17|18)\d{9}$/.test(value));
        return {valid: valid, msg: msg};
    };
    methods["idCard"] = function (value) {
        var msg = "身份证号格式不正确";
        var valid = (/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value));
        return {valid: valid, msg: msg};
    };

    methods["specialName"] = function (value) {
        var msg = "格式不正确";
        var valid = (/^[a-z0-9]{1}[a-z0-9\\-]{1,62}[a-z0-9]{1}$/.test(value));
        return {valid: valid, msg: msg};
    };

    return {
        require: 'ngModel',
        link: function ($scope, $element, $attrs, $ngModelCtrl) {
            var name = $attrs.name;
            $scope.$dbForm = {};
            //解析规则
            var rules = $attrs.dbValidator;
            // 校验
            var rs = rules.split(" ");
            var check = function (value) {
                for (var index in rs) {
                    var method = rs[index];
                    if (!angular.isFunction(methods[method])) {
                        continue;
                    }
                    if ($ngModelCtrl.$isEmpty(value)) {
                        value = "";
                    }
                    if (angular.isString(value)) {
                        value = value.replace(/\r/g, "");
                    }
                    var result = methods[method](value);
                    if (!result.valid) {
                        return result;
                    }
                }
                return {valid: true, msg: ""};
            };
            //输入框输入值时会调用此方法
            $ngModelCtrl.$parsers.push(function (input) {
                var validity = check(input);
                $ngModelCtrl.$setValidity('custom', validity.valid);
                $scope.$dbForm[name] = validity;
                return validity.valid ? input : false;
            });
            //第一次渲染时会调用此方法
            $ngModelCtrl.$formatters.push(function (input) {
                var validity = check(input);
                $ngModelCtrl.$setValidity('custom', validity.valid);
                $scope.$dbForm[name] = validity;
                console.log($scope.$dbForm);
                return validity.valid ? input : "";
            });
        }
    }

}]);