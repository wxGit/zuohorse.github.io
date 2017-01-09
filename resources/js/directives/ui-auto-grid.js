/**
 * Created by xiangli.ma on 2016-08-06.
 * dbFormGrid 指令
 * @version 1.1
 1.功能说明
 实现一个带自定义条件查询功能的grid
 2.使用方式
 2.1 直接在html页面当中使用
 <ui-auto-grid options="gridData" params="params" sort="sort"></ui-auto-grid>
 3.js定义示例:
 //设置项，由插件生成
 //!!formGridOptions-START!!
 $scope.params = {
        organizationName: "张三",
        startDate:"2016-06-08",
        endDate:"2016-07-08"
    };

 $scope.sort = {
        organizationName: "desc",
        partyNo: "asc"
    };

 $scope.gridData = {
        settings: {                             //基础设置
            title: "",                          //标题
            showTitle: false,                   //是否显示标题
            url: "../data/computers.json",      //接口地址
            apiType: "page",                    //接口类型(后台接口返回Page类型还是List类型)    值: >page(默认)    >list
            autoLoad: true,                     //是否初始化加载数据
            showSpace:false,                    //显示间隔
            sortMode: "2",                      //排序方式(服务端排序 or js排序)   值: >1. Server  >2. Web .  default 1
        },
        page: {                                 //Page设置
            show: true,                         //是否显示PageBar(分页条) 默认 true
            pageSize: 10,                       //每页条数
        },
        life: {                                 //生命周期
            init: function() {

            },
            pre: function(header, data) {       //当数据请求完成后触发
                console.log("on pre");
                console.log(data);

                //以下为示例代码:

                //动态获取接口返回数据中的字段
                var newHeader = [];
                if (data.length > 0) {
                    var item = data[0];
                    angular.forEach(item, function(value, key) {
                        var feild = {name: key, field: key, sortable: true};
                        newHeader.push(feild);
                    })
                }
                //重新设置表头
                $scope.gridData.setHeader(newHeader);
            },
            post: function(data) {

            },
            show: function(data) {

            }
        },
        choice: {                               //设置行的选择方式(多选or单选)
            show: false,                        //是否显示 选择列
            mode: "checkbox",                   //选择方式(多选or单选)  值: >checkbox  or  >radio
            name: "选择",                        //单选下有效(表头部分)
            field: "select1",                   //通一个页面多个选择需要指定不同的名称
            events: {
                changer: function (data) {      //被点击
                    console.log(data);
                }
            }
        },
        header: [                               //定义头部
            {name: "实例名称", width: "13%", field: "partyNo", sortable: false, class:"linka", events: {
                clicker: function (value, row) {
                    console.log(row);
                },
                color: function (value, row) {
                    var color = "green";
                    return color;
                }
            }},
            {name: "运行状态", width: "13%", field: "partyName", sortable: false, events: {
                clicker: function (value, row) {
                    console.log(row);
                }
            }},
            {name: "数据库类型", width: "14%", field: "organizationName", sortable: false, },
            {name: "实例类型", width: "13%", field: "departmentName", sortable: true, events: {
                formatter: function (value, row) {
                    if(value == true) {
                        return true;
                    }else{
                        return false;
                    };
                }
            }},
            {name: "创建时间", width: "13%", field: "businessType", sortable: true, },
            {name: "到期日期", width: "14%", field: "certificateType", sortable: false, }
        ],
        operation: {                            //定义操作列
            show: false,
            name: "操作",
            width:"20%",
            events:[
                {
                    name:"删除",
                    class:"btn-default",
                    clicker:function(row){
                        alert("删除");
                        //$state.go("paas.computer");
                    }
                },
            ]
        }
    };

 4.字段说明


 5.对外提供的API
 5.1
 //grid数据加载完成后的事件
 $scope.gridData.gridLoaded(rows) rows为当前页所有数据
 5.2
 //重新以当前参数查询第一页数据
 $scope.gridData.reLoadData();
 5.3
 //当showClose为true时有效
 $scope.gridData.modalClose();

 5.3
 //提供获取所有被选中的数据
 $scope.gridData.getAllSelectRows();


 */

'use strict';
var dbGridDirectives = angular.module('ui.components.auto.grid', ['dbUtils']);
dbGridDirectives.directive('uiAutoGrid', ['dbUtils', function (dbUtils) {
    return {
        restrict: 'E',
        templateUrl: "../resources/templates/uiAutoGrid.html",
        replace: true,
        scope: {
            options:'=options',
            params:'=params',
            sort:'=sort'
        },
        link: function (scope, element, attrs, controller) {
            scope.sortingClass = "sorting_both";

        },
        controller: ['$scope', function ($scope) {
            console.log($scope.options);
            if (angular.isUndefined($scope.options)) {
                return;
            }

            $scope.refresh = function() {
                $scope.init();
            };

            $scope.options.setHeader = function(header) {
                $scope.options.header = header;
            };

            $scope.init = function () {
                //查询参数
                //$scope.params = $scope.params;
                //排序参数
                //$scope.sort = $scope.sort;
                //$scope.header = $scope.options.header;

                //定义grid数据集
                $scope.options.rows = [];
                $scope.params = $scope.params || {};
                $scope.sort = $scope.sort || {};
                $scope.options.choice = $scope.options.choice || {};
                $scope.options.operation = $scope.options.operation || {};
                $scope.options.settings = $scope.options.settings || {};


                $scope.options.settings['apiType'] = $scope.options.settings['apiType'] || "page";
                
                if (angular.isUndefined($scope.options.settings['showWrapper'])) {
                    $scope.options.settings['showWrapper'] = true;
                }

                $scope.options.choice = {
                    show: $scope.options.choice ? $scope.options.choice.show : false,
                    mode: $scope.options.choice.mode || "checkbox",
                    name: $scope.options.choice.name || "选择",//单选下有效
                    events: $scope.options.choice.events
                }
                $scope.options.operation = {
                    show: $scope.options.operation.show,
                    name: $scope.options.operation.name ? $scope.options.operation.name : "操作",
                    field: $scope.options.operation.field || "select_row",
                    width:$scope.options.operation.width,
                    events:$scope.options.operation.events
                }

                $scope.options.life = $scope.options.life || {};

                $scope.options.page = $scope.options.page || {};
                $scope.options.page['show'] = $scope.options.settings['apiType'] == 'list' ? false : $scope.options.page['show'];
                console.log($scope.params);
                console.log($scope.sort);

                if($scope.options.settings['apiType'] == 'page') {
                    //定义grid的Page对象
                    $scope.params.page = {
                        pageNumber: 1,
                        pageSize: $scope.options.page.pageSize || 10,
                        prevPageDisabled: 'disabled',
                        nextPageDisabled: 'disabled'
                    };
                }




                //queryForm
                var autoLoad = $scope.options.settings.autoLoad;
                autoLoad = angular.isUndefined(autoLoad) ? true : autoLoad;
                if (!autoLoad) {
                    $scope.options.loadingTip = "正在候驾中...";
                } else {
                    //TODO
                    query();
                }
            };


            $scope.init();




            //ajax异步获取数据
            function query(sort) {
                $scope.showLoading = true;

                $scope.options.loadingTip = "正在努力为您加载数据,请稍候...";
                var params = angular.copy($scope.params);
                //angular.forEach(selectFields, function (selectField) {
                //    queryParams[selectField] = $scope.dbFormGrid.queryParams[selectField].value;
                //});



                //queryParams["page"] = page;

                var orderBy = angular.extend({}, $scope.sort, sort);
                /*if (angular.isUndefined(sort)) {
                 orderBy = angular.extend({}, orderBy, sort);
                 }*/
                params["orderBy"] = orderBy;

                console.log("orderBy:");
                console.log($scope.sort);
                console.log(orderBy);

                var url = $scope.options.settings.url;

                if($scope.options.settings['apiType'] == 'page') {
                    var page = {
                        pageIndex: angular.isUndefined($scope.params.page.pageNumber) ? 1 : $scope.params.page.pageNumber,
                        pageSize: $scope.params.page.pageSize
                    };
                    url += "/" + page.pageIndex + "/" + page.pageSize;
                }

                dbUtils.get(url, params, function (data) {
                    //获取每行数据，并调用format方法进行处理，最后赋值给$scope.dbFormGrid.rows

                    var rows = $scope.options.settings['apiType'] == 'page' ? data.content : data.content;

                    console.log(rows);

                    //如果定义了onPreShow方法
                    if (!angular.isUndefined($scope.options.life.pre) && angular.isFunction($scope.options.life.pre)) {
                        $scope.options.life.pre($scope.options.header, rows);
                    }

                    for (var i in rows) {
                        var row = rows[i];
                        for (var j in $scope.options.header) {
                            var header = $scope.options.header[j];

                            if (angular.isUndefined(header.sortingClass)) {
                                header.sortingClass = "sorting_both";
                            }
                            /*var value = (row[header.field] || "");

                            //格式化数据
                            if (!angular.isUndefined(header.events) && !angular.isUndefined(header.events.formatter)) {
                                //TODO
                               // value = header.events.formatter(value, row);
                            }
                            row[header.field] = value;*/
                        }
                        //添加一个是否选择的字段，默认值为false
                        row.checked = false;
                    }
                    $scope.options.rows = rows;
                    $scope.options.choice.data = null;

                    if ($scope.options.settings['apiType'] == 'page') {
                        handlePage(data);
                    }


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


            var handlePage = function (data) {
                //分页数据处理
                var pages = {};
                pages.totalRecords = data.totalElements;
                pages.pageNumber = data.number + 1;
                pages.pageSize = data.size;
                pages.totalPages = data.totalPages;
                var totalPage = pages.totalPages;
                //分页算法，页面只显示固定数量的分页按钮。
                var pageNumbers = [];
                var startPage = 1;
                var endPage = totalPage;
                var pageStep = 2;//以当前页为基准，前后各显示的页数量
                if (totalPage >= 6) {
                    startPage = pages.pageNumber;
                    if (startPage >= pageStep) {
                        startPage -= pageStep;
                    }
                    if (startPage <= 1) {
                        startPage = 1;
                    }
                    endPage = (totalPage - pages.pageNumber) >= pageStep ? pages.pageNumber + pageStep : totalPage;
                    if (endPage > totalPage) {
                        endPage = totalPage;
                    }
                    if (startPage != 1) {
                        pageNumbers.push({number: "1"});
                        if (startPage - 1 != 1) {
                            pageNumbers.push({number: "...", disabled: "disabled"});
                        }
                    }
                }
                for (var i = startPage; i <= endPage; i++) {
                    if (i == pages.pageNumber) {
                        pageNumbers.push({number: i, active: "active"});
                    } else {
                        pageNumbers.push({number: i});
                    }
                }
                if (endPage != totalPage) {
                    if (endPage + 1 != totalPage) {
                        pageNumbers.push({number: "...", disabled: "disabled"});
                    }
                    pageNumbers.push({number: totalPage});
                }
                pages.pageNumbers = pageNumbers;
                if (pages.pageNumber == 1 || pages.totalPages == 0) {
                    pages.prevPageDisabled = "disabled";
                }
                if (pages.pageNumber == totalPage || pages.totalPages == 0) {
                    pages.nextPageDisabled = "disabled";
                }
                $scope.params.page = pages;
            };

            $scope.options.reLoadData = function () {
                if ($scope.options.settings['apiType'] == 'page') {
                    $scope.params.page.pageNumber = 1;
                }
                query();
            };




            //分页数量点击事件
            $scope.options.pageNumberClick = function (pageNumber) {
                var prevPage = $scope.params.page.prevPageDisabled;
                if (pageNumber === "prev" && prevPage && prevPage != "") {
                    return false;
                }
                var nextPage = $scope.params.page.nextPageDisabled;
                if (pageNumber === "next" && nextPage && nextPage != "") {
                    return false;
                }
                if (pageNumber == $scope.params.page.pageNumber) {
                    return false;
                }
                if (pageNumber === "...") {
                    return false;
                }
                if (pageNumber === "prev") {
                    $scope.params.page.pageNumber--;
                } else if (pageNumber === "next") {
                    $scope.params.page.pageNumber++;
                } else {
                    $scope.params.page.pageNumber = pageNumber;
                }
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
                console.log(row);
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
            $scope.options.sorting = function(header){
                if (!header.sortable) {
                    return;
                }
                angular.forEach($scope.options.header, function (h) {
                    if(angular.equals(h.field, header.field)){
                        if(angular.isUndefined(header.sortingClass)){
                            h.sortingClass = "sorting_asc";
                        }else if( h.sortingClass == "sorting_asc"){
                            h.sortingClass = "sorting_desc";
                        }else{
                            h.sortingClass = "sorting_asc";
                        }
                    }else{
                        h.sortingClass = "sorting_both";
                    }
                });
                // 执行排序功能
                var sort = {};
                if(header.sortingClass == "sorting_desc"){
                    sort[header.field] = "DESC";
                    if (angular.isUndefined($scope.options.settings.sortMode) || $scope.options.settings.sortMode == 1) {
                        query(sort);
                    } else {
                        $scope.options.rows = descSort($scope.options.rows, header.field);
                    }
                }else{
                    sort[header.field] = "ASC";
                    if (angular.isUndefined($scope.options.settings.sortMode) || $scope.options.settings.sortMode == 1) {
                        query(sort);
                    } else {
                        $scope.options.rows = ascSort($scope.options.rows, header.field);
                    }
                }

                function ascSort(json, key){
                    return json.sort(function(a, b) {
                        var x = a[key];
                        var y = b[key];
                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    });
                }
                function descSort(json, key){
                    return json.sort(function(a, b) {
                        var x = a[key];
                        var y = b[key];
                        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                    });
                }

            }



        }]
    }
}]);