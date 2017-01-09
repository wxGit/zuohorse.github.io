/**
 * Created by xiangli.ma on 2016-08-08.
 * dbFormGrid 指令
 * @version 1.1
 1.功能说明
 实现一个带自定义条件查询功能的grid
 2.使用方式
 2.1 直接在html页面当中使用<db-form-grid></db-form-grid>
 3.js定义示例(这里将options与events分开定义,目的是为将来开发工具插件自动生成使用,请保留注释和变量名称):
 //设置项，由插件生成
 $scope.operateData = {
        elements: [
            {name: "刷新", type:"button", class:"btn-dark", icon:"refresh", events: {
                clicker: function(data, element) {
                    alert("刷新");
                }
            }},
            {name: "新建项目", type:"button", class:"btn-dark", icon:"plus", events: {
                clicker: function(data, element) {
                    alert("新建项目");
                }
            }},
            {name: "城市", type:"dropdown", class:"btn-dark", icon:"plus", value: "", nameField:"name", valueField:"value", items: [
                {name: "上海", value: "SH", icon: ""},
                {name: "江苏", value: "JS", icon: ""},
                {name: "湖北", value: "HB", icon: ""}
            ], events: {
                chooser: function(name, value, item, element) {
                    //alert(name);
                    console.log(name);
                    //alert("chooser" + "name: " + name + "  value: " + value);
                }
            }},
            {name: "更多操作", type:"buttons", class:"btn-dark", icon: "th-large", showMoreContent:false, items: [
                {name: "添加", icon: "plus", disabled:true, events: {
                    clicker: function(data, item, element) {
                        alert("更多操作-添加");
                    }
                }},
                {name: "删除", icon: "remove", events: {
                    clicker: function(data, item, element) {
                        alert("更多操作-删除");
                    }
                }},
                {name: "编辑", icon: "pencil", disabled:true, events: {
                    clicker: function(data, item, element) {
                        alert("更多操作-编辑");
                    }
                }}
            ]},
            {name: "项目名称", type:"search", placeholder: "项目名称", value: "", events: {
                submitter: function(data, element) {
                    alert("submitter");
                }
            }}
        ]
    };

 */

'use strict';
var dbOperateBarDirectives = angular.module('ui.components.operate.bar', ['dbUtils']);
dbOperateBarDirectives.directive('uiOperateBar', ['dbUtils','$timeout', '$window',function (dbUtils,$timeout,$window) {
    return {
        restrict: 'E',
        templateUrl: "../resources/templates/uiOperateBar.html",
        replace: true,
        scope: {
            options:'=options'
        },
        link: function (scope, element, attrs, controller) {

        },
        controller: ['$scope', function ($scope) {
            console.log($scope.options);
            if (angular.isUndefined($scope.options)) {
                return;
            }

            angular.forEach($scope.options.elements, function (element) {
                if (element.type == 'dropdown') {
                    var onClick = function(name, value, item, e) {
                        element.name = name;
                        element.value = value;
                        var chooser = element.events.chooser;
                        if (angular.isFunction(chooser)) {
                            element.events.chooser(name, value, item, e);
                        }
                    };
                    angular.forEach(element.items, function (item) {
                        item.events = [];
                        item.events.clicker = onClick;
                    });
                }
            })


        }]
    }
}]);