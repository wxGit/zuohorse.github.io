/**
 * Created by xiangli.ma on 2016-08-06.
 * dbFormGrid 指令
 * @version 1.1
 1.功能说明
 实现一个带自定义条件查询功能的grid
 2.使用方式
 2.1 直接在html页面当中使用<ui-table></ui-table>
 3.js定义示例(这里将options与events分开定义,目的是为将来开发工具插件自动生成使用,请保留注释和变量名称):
 //设置项，由插件生成
 //!!formGridOptions-START!!
 var options = {
        form:{
            settings:{
                cols:2,
                showClose:false
            },
            fields:[
                {"name": "businessType", "label": "配置类型", "type": "select", "dropDownItemType": "json", "dropDownItem": "businessType", "labelWidth": "4", "editable": true, "required": true},
                 ],
            hiddenParams:{}
        },
        grid:{
            settings:{
                transCode:"",
                autoLoad:true,
                pageSize:10,
                showCheckBox:true,
                allRowChecked:false
            }
            header:[{"name": "大类代码", "width": "10%", "field": "code"}],
            rowOperation:{show:true,width:"10%"}

        }
 }
 //!!formGridOptions-END!!
 var events = {
        form:{
            modalClose:function(){//当showClose为true时有效

            }
        }
        grid:{
            fieldEvents:{
                "codeClick":function(row){
                    //code 字段点击事件
                },
                "codeFormat":function(value,row){
                    //code 字段数据格式化事件(grid渲染时会调用)
                },
                "codeColor":function(value,row){
                    //code 字段渲染时文字颜色
                }
            },
            rowEvents: //行级事件
                [{name:"编辑",class:"",click:function(row){
                    alert(row["name"]);
                }},{name:"删除",class:"btn-danger",click:function(row){
                    alert(row["name"]);
                },isDisabled:function(row){
                        return true;
                }},{name:"查看",class:"btn-default",click:function(row){
                    alert(row["name"]);
            }}],
            operationEvents:[{name:"删除",class:"",icon:"",click:function(rows){
                    var rows = $scope.dbFormGrid.getSelectedRows();
                    //TODO
                }},{name:"批量转义",class:"btn-danger",icon:"",click:function(rows){
                    alert(row["name"]);
                },isDisabled:function(row){
                        return true;
                }},{name:"新增",class:"btn-default",icon:"",click:function(rows){
                    alert(row["name"]);
            }}]
        }
 }

 $scope.dbFormGrid = {options:options,events:events}

 4.字段说明
 字段名称                |         说明
 options                         所有配置类型的值在此定义
 form                        查询表单相关的配置
 settings                表单全局设置项
 cols                表单内的元素每行个数,与db-form-fields指令当中的cols含义一致
 showClose           是否显示关闭图标,如果当前form-grid是在模态窗口当中显示时,可以设置此值为true.同时后面的events当中可以定义事件
 fields                  表单内需要显示的字段,具体字段的定义格式参见db-form-fields当中的fields定义格式
 hiddenParams            表单提交时,默认隐藏的参数,当页面上不需要显示但需要隐藏提交时,可以在此设置.格式为json格式
 grid                        grid相关配置
 settings                grid全局配置项
 transCode           grid数据查询交易代码
 autoLoad            grid是否自动加载
 pageSize        分页大小,默认值为10,可以不用设置
 showCheckBox        是否显示复选框,当需要进行多选时,可以设置该值为true
 allRowChecked       如果有复选框,默认全选复选框是否选中
 header                  grid header字段定义,多项
 {
   name :"姓名"             显示的名称
   width :"10%"            占用的宽度百分比
   field :"name"            查询结果返回值列表当中对应的字段名称
   }
 rowOperation            行级操作设置
 show                是否在最后一列显示"操作"列
 width               占用的宽度百分比

 events                          事件相关定义
 form                        表单事件定义
 modalClose:function(){}              当options.form.settings.showClose为true时,该事件会在用户点击关闭图标时被触发
 grid                         grid事件定义
 fieldEvents             grid每列元素的事件定义,为了解决插件自动生成的代码里面无法在定义字段的时候将事件一并定义,而在此单独定义事件
 事件定义的规则如下
 "字段名称"+"事件名称",如需要定义字段name的点击事件,则事件名称为:"nameClick":function(row)
 "字段名称"+"Click":function(row){} 字段的点击事件
 "字段名称"+"Format":function(value,row){return value} grid数据初始化时会调用该事件,value为当前字段的值,row为整行的值
 "字段名称"+"Color":function(value,row){return "red";} 字段显示什么颜色所调用的方法,需要return 具体的颜色值或名称.
 rowEvents                   行级事件,每一行数据最后一列的操作列当中显示的按钮对应的事件
 {
     name:"删除"                       按钮名称
     class:"btn-danger"               按钮样式
     click:function(row){}            按钮点击事件,传入的参数只是当前行的数据
     isDisabled:function(row){return false} 按钮是否禁用事件,需要返回true或者false
 }
 operationEvents           全局的grid操作按钮事件,显示在grid右上角
 {
    name:"删除"                       按钮名称
     class:"btn-danger"              按钮样式
     icon:""                         按钮前icon 来源 系统icon-font
     click:function(rows){}          按钮点击事件,传入的参数是所有勾选的数据,有可能为null
     isDisabled:function(row){return false} 按钮是否禁用事件,需要返回true或者false
 }

 5.对外提供的API
 5.1
 //grid数据加载完成后的事件
 $scope.dbFormGrid.gridLoaded(rows) rows为当前页所有数据
 5.2
 //重新以当前参数查询第一页数据
 $scope.dbFormGrid.reLoadData();
 5.3
 //当showClose为true时有效
 $scope.dbFormGrid.modalClose();

 5.3
 //提供获取所有被选中的数据
 $scope.dbFormGrid.getAllSelectRows();

 5.4
 //为表单对象设置值
 $scope.dbForm.setFormDataField(fieldName,value);

 */

'use strict';
var dbGridDirectives = angular.module('ui.components.table', ['dbUtils']);
dbGridDirectives.directive('uiTable', ['dbUtils', function (dbUtils) {
    return {
        restrict: 'E',
        templateUrl: "../resources/templates/uiTable.html",
        replace: true,
        scope: {
            options:'=options',
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

            //查询参数
            //$scope.params = $scope.params;
            //排序参数
            //$scope.sort = $scope.sort;
            $scope.header = $scope.options.header;


            //定义grid数据集
            $scope.options.rows = [];
            $scope.params = $scope.params || {};
            $scope.sort = $scope.sort || {};
            $scope.options.choice = $scope.options.choice || {};
            $scope.options.operation = $scope.options.operation || {};


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
            //$scope.options.settings.allRowChecked = $scope.options.settings.allRowChecked || false;


            //console.log($scope.params);
            console.log($scope.sort);

            //定义grid的Page对象
            //$scope.params.page = {
            //    pageNumber: 1,
            //    pageSize: $scope.options.settings.pageSize || 10,
            //    prevPageDisabled: 'disabled',
            //    nextPageDisabled: 'disabled'
            //};


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
            function query(sort) {
                $scope.showLoading = true;

                $scope.options.loadingTip = "正在努力为您加载数据,请稍候...";
                var queryParams = angular.copy($scope.params);
                //angular.forEach(selectFields, function (selectField) {
                //    queryParams[selectField] = $scope.dbFormGrid.queryParams[selectField].value;
                //});
                //queryParams["page"] = {
                //    pageNumber: angular.isDefined($scope.params.page.pageNumber) ? $scope.params.page.pageNumber : 1,
                //    pageSize: $scope.params.page.pageSize
                //};

                var orderBy = angular.extend({}, $scope.sort, sort);
                /*if (angular.isUndefined(sort)) {
                 orderBy = angular.extend({}, orderBy, sort);
                 }*/
                queryParams["orderBy"] = orderBy;

                console.log("orderBy:");
                console.log($scope.sort);
                console.log(orderBy);

                dbUtils.get($scope.options.settings.url, queryParams, function (data) {
                    //获取每行数据，并调用format方法进行处理，最后赋值给$scope.dbFormGrid.rows
                    var rows = data.content;
                    for (var i in rows) {
                        var row = rows[i];
                        for (var j in $scope.options.header) {
                            var header = $scope.options.header[j];

                            if (angular.isUndefined(header.sortingClass)) {
                                header.sortingClass = "sorting_both";
                            }
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
                    //分页数据处理
                    //var pages = {};
                    //pages.totalRecords = data.totalElements;
                    //pages.pageNumber = data.pageNumber;
                    //pages.pageSize = data.pageSize;
                    //pages.totalPages = data.totalPages;
                    //var totalPage = pages.totalPages;
                    ////分页算法，页面只显示固定数量的分页按钮。
                    //var pageNumbers = [];
                    //var startPage = 1;
                    //var endPage = totalPage;
                    //var pageStep = 2;//以当前页为基准，前后各显示的页数量
                    //if (totalPage >= 6) {
                    //    startPage = pages.pageNumber;
                    //    if (startPage >= pageStep) {
                    //        startPage -= pageStep;
                    //    }
                    //    if (startPage <= 1) {
                    //        startPage = 1;
                    //    }
                    //    endPage = (totalPage - pages.pageNumber) >= pageStep ? pages.pageNumber + pageStep : totalPage;
                    //    if (endPage > totalPage) {
                    //        endPage = totalPage;
                    //    }
                    //    if (startPage != 1) {
                    //        pageNumbers.push({number: "1"});
                    //        if (startPage - 1 != 1) {
                    //            pageNumbers.push({number: "...", disabled: "disabled"});
                    //        }
                    //    }
                    //}
                    //for (var i = startPage; i <= endPage; i++) {
                    //    if (i == pages.pageNumber) {
                    //        pageNumbers.push({number: i, active: "active"});
                    //    } else {
                    //        pageNumbers.push({number: i});
                    //    }
                    //}
                    //if (endPage != totalPage) {
                    //    if (endPage + 1 != totalPage) {
                    //        pageNumbers.push({number: "...", disabled: "disabled"});
                    //    }
                    //    pageNumbers.push({number: totalPage});
                    //}
                    //pages.pageNumbers = pageNumbers;
                    //if (pages.pageNumber == 1 || pages.totalPages == 0) {
                    //    pages.prevPageDisabled = "disabled";
                    //}
                    //if (pages.pageNumber == totalPage || pages.totalPages == 0) {
                    //    pages.nextPageDisabled = "disabled";
                    //}
                    //$scope.params.page = pages;
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
                //$scope.params.page.pageNumber = 1;
                query();
            };




            //分页数量点击事件
            //$scope.options.pageNumberClick = function (pageNumber) {
            //    var prevPage = $scope.params.page.prevPageDisabled;
            //    if (pageNumber === "prev" && prevPage && prevPage != "") {
            //        return false;
            //    }
            //    var nextPage = $scope.params.page.nextPageDisabled;
            //    if (pageNumber === "next" && nextPage && nextPage != "") {
            //        return false;
            //    }
            //    if (pageNumber == $scope.params.page.pageNumber) {
            //        return false;
            //    }
            //    if (pageNumber === "...") {
            //        return false;
            //    }
            //    if (pageNumber === "prev") {
            //        $scope.params.page.pageNumber--;
            //    } else if (pageNumber === "next") {
            //        $scope.params.page.pageNumber++;
            //    } else {
            //        $scope.params.page.pageNumber = pageNumber;
            //    }
            //    query();
            //};
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