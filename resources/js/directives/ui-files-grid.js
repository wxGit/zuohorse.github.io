'use strict';
angular.module('app')
    .directive('uiFilesGrid', ['dbUtils', function (dbUtils) {
    return {
        restrict: 'E',
        templateUrl: "../resources/templates/uiFilesGrid.html",
        replace: true,
        scope: {
            options:'=options',
            params:'=params'
        },
        link: function (scope, element, attrs, controller) {
            scope.sortingClass = "sorting_both";

        },
        controller: ['$scope', function ($scope) {
            console.log($scope.options);
            if (angular.isUndefined($scope.options)) {
                return;
            }

            //查询参数
            $scope.header = $scope.options.header;


            //定义grid数据集
            $scope.options.rows = [];
            $scope.params = $scope.params || {};
            $scope.options.choice = $scope.options.choice || {};
            // $scope.options.operation = $scope.options.operation || {};


            $scope.options.choice = {
                show: $scope.options.choice ? $scope.options.choice.show : false,
                mode: $scope.options.choice.mode || "checkbox",
                name: $scope.options.choice.name || "选择",//单选下有效
                events: $scope.options.choice.events
            }
            // $scope.options.operation = {
                // show: $scope.options.operation.show,
                // name: $scope.options.operation.name ? $scope.options.operation.name : "操作",
                // field: $scope.options.operation.field || "select_row",
                // width:$scope.options.operation.width,
                // events:$scope.options.operation.events
            // }
            //$scope.options.settings.allRowChecked = $scope.options.settings.allRowChecked || false;


            console.log($scope.params);

            //定义grid的Page对象
            $scope.params.page = {
                // pageNumber: 1,
                // pageSize: $scope.options.settings.pageSize || 10,
                // prevPageDisabled: 'disabled',
                // nextPageDisabled: 'disabled'
            };


            //queryForm
            var autoLoad = $scope.options.settings.autoLoad;
            autoLoad = angular.isUndefined(autoLoad) ? true : autoLoad;
            if (!autoLoad) {
                $scope.options.loadingTip = "正在候驾中...";
            } else {
                //TODO
                query();
            }


            //ajax异步获取数据
            function query() {
                $scope.showLoading = true;

                $scope.options.loadingTip = "正在努力为您加载数据,请稍候...";
                var queryParams = angular.copy($scope.params);

                // queryParams["page"] = {
                //     pageNumber: angular.isDefined($scope.params.page.pageNumber) ? $scope.params.page.pageNumber : 1,
                //     pageSize: $scope.params.page.pageSize
                // };

                // var orderBy = angular.extend({}, sort);

                // queryParams["orderBy"] = orderBy;

                dbUtils.get($scope.options.settings.url, queryParams, function (data) {
                    //获取每行数据，并调用format方法进行处理，最后赋值给$scope.dbFormGrid.rows
                    var rows = data.content;
                    for (var i in rows) {
                        var row = rows[i];
                        for (var j in $scope.options.header) {
                            var header = $scope.options.header[j];

                            // if (angular.isUndefined(header.sortingClass)) {
                            //     header.sortingClass = "sorting_both";
                            // }
                            var value = (row[header.field] || "");

                            //格式化数据
                            if (!angular.isUndefined(header.events) && !angular.isUndefined(header.events.formatter)) {
                                //TODO
                                value = header.events.formatter(value, row);
                            }
                            row[header.field] = value;
                        }
                        //添加一个是否选择的字段，默认值为false
                        row.checked = false;
                    }
                    $scope.options.rows = rows;
                    $scope.options.choice.data = null;

                    if (angular.isFunction($scope.options.gridLoaded)) {
                        $scope.options.gridLoaded($scope.options.rows);
                    }

                    // Metronic.stopPageLoading();
                    $scope.showLoading = false;

                    checkAllowSelect();
                    $scope.options.loadingTip = "服务器已努力，但并无数据...";
                    //执行选中改变事件
                    sendChoiceChange();
                }, function () {
                    $scope.options.loadingTip = "服务器貌似生病啦，请稍等，再重试...";
                    sendChoiceChange();
                });
            }

            $scope.options.reLoadData = function () {
                // $scope.params.page.pageNumber = 1;
                query();
            };


            //grid上方按钮点击事件
            $scope.options.operationButtonClick = function (clickFun) {
                //获取所有已经选择的行数据传递给回调方法。
                var rows = getAllSelectRows();
                clickFun(rows, $scope.options.rows);
                checkAllowSelect();
            };

            //每行点击事件
            $scope.options.rowClick = function (row) {
                // console.log(row);
                //row.checked = !row.checked;
                checkAllowSelect();
                if ($scope.options.choice.mode == "radio") {
                    $scope.options.choice.data = row;
                }
                sendChoiceChange();
            };

            function sendChoiceChange () {
                if (angular.isUndefined($scope.options.choice.events) || angular.isUndefined($scope.options.choice.events.changer)) {
                    return;
                }
                if (angular.isFunction($scope.options.choice.events.changer)) {
                    if ($scope.options.choice.mode == "checkbox") {
                        var data = getAllSelectRows();
                        $scope.options.choice.events.changer(data);
                    } else {
                        $scope.options.choice.events.changer($scope.options.choice.data);
                    }
                }
            }

            //点击全选复选框事件
            $scope.options.allRowClick = function () {
                console.log($scope.options.settings.allRowChecked);
                //$scope.options.settings.allRowChecked = !$scope.options.settings.allRowChecked;
                angular.forEach($scope.options.rows, function (row) {
                    row.checked = $scope.options.settings.allRowChecked;
                });
                sendChoiceChange();
            };

            function checkAllowSelect() {
                if (!$scope.options.choice.show) {
                    return;
                }
                //如果所有行数据为非选中状态，则全选按钮为非选中状态，反之一样
                var flag = true;
                if ($scope.options.rows.length == 0) {
                    flag = false;
                }
                angular.forEach($scope.options.rows, function (row) {
                    if (!row.checked) {
                        flag = false;
                    }
                });
                $scope.options.settings.allRowChecked = flag;
            }

            //获取所有选中的行数据
            function getAllSelectRows() {
                var rows = [];
                angular.forEach($scope.options.rows, function (row) {
                    if (row.checked) {
                        rows.push(row);
                    }
                });
                return rows;
            }

            $scope.options.getAllSelectRows = function () {
                return getAllSelectRows();
            };

            /**
             * 为表单对象设置值
             * @param fieldName 要设置的属性名称
             * @param value 值
             */
            $scope.options.setFormDataField = function (fieldName, value) {
                $scope.options.queryParams[fieldName] = value;
            };

        }]
    }
}]);