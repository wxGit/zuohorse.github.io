'use strict';

app.controller('ComputerCtrl', ['$scope','$modal','dbUtils',function($scope, $modal, dbUtils) {

    $scope.operateData = {
        data:{
            startDate:null,
            endDate:null
        },
        elements: [
            {name: "刷新", type:"button", class:"btn-dark", icon:"refresh", events: {
                clicker: function(options, element) {
                    alert("刷新");
                }
            }},
            {name: "新建项目", type:"button", class:"btn-dark", icon:"plus", events: {
                clicker: function(options, element) {
                    //alert("新建项目");
                    openModal();
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
            {name: "更多操作", type:"buttons", class:"btn-dark", icon: "th-large", items: [
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
            /*{name: "项目名称", type:"search", placeholder: "项目名称", value: "", events: {
                submitter: function(data, element) {
                    alert("submitter");
                }
            }}*/
            {name: "日期范围", type:"daterange", placeholder: "2016-01-01 - 2016-09-16", minDate:"2016-08-15", maxDate:"2016-09-25"},
            {name: "查询", type:"button", class:"btn-dark", icon:"search", events: {
                clicker: function(options, element) {
                   console.log(formatDate(options.data.startDate),formatDate(options.data.endDate));
                }
            }}

        ]
    };


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
        settings: {
            title: "",
            showTitle: false,
            url: "../data/roles.json",
            autoLoad: true,
            pageSize: 3,
            showSpace:false,
            sortMode: "1",//1. Server   2. Web .  default 1
            //rowOperation: {show: true,width:"20%"},
        },
        choice: {
            show: true,
            mode: "checkbox",//checkbox  or  radio
            name: "选择",//单选下有效
            field: "select1",  //通一个页面多个选择需要指定不同的名称
            events: {
                changer: function (data) {//被点击
                    console.log(data);
                }
            }
        },
        header: [
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
        operation: {
            show: true,
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
                }
            ]
        }
    };


    $scope.gridData2 = {
        sort: {
            partyNo: "ASC"
        },
        settings: {
            title: "数据列表",
            showTitle: true,
            url: "../data/roles.json",
            autoLoad: true,
            pageSize: 3,
            showCheckBox: true,
            rowOperation: {show: true,width:"20%"},
        },
        header: [
            {name: "实例名称", width: "15%", field: "partyNo", sortable: false, class:"linka"},
            {name: "运行状态", width: "15%", field: "partyName", sortable: false, },
            {name: "数据库类型", width: "15%", field: "organizationName", sortable: false, },
            {name: "实例类型", width: "15%", field: "departmentName", sortable: true, },
            {name: "创建时间", width: "15%", field: "businessType", sortable: true, },
            {name: "到期日期", width: "15%", field: "certificateType", sortable: false, }
        ],
        events: {
            fieldEvents: [
                {
                    field: "partyNo",
                    clicker: function (row) {
                        console.log(row);
                    },
                    formatter: function (row) {
                        if(value == true){
                            return true;
                        } else {
                            return false;
                        };
                    },
                    color: function (row) {
                        var color = "green";
                        return color;
                    },

                },
                {
                    field: "partyName",
                    clicker: function (row) {
                        console.log(row);
                    },
                }
            ],
            rowEvents: [
                {
                    name:"删除",
                    class:"btn-default",
                    clicker:function(row){
                        alert("删除");
                        //$state.go("paas.computer");
                    }
                },
            ]
        },
        operation: {
            show: true,
            name: "操作",
            width:"10%",
            events:[
                {
                    name:"删除",
                    class:"btn-default",
                    clicker:function(row){
                        alert("删除");
                        //$state.go("paas.computer");
                    }
                }
            ]
        }
    };


    $scope.test = function() {
        $scope.gridData2.allRowClick();
    }


    //弹出对话框
    function openModal(source) {
        var instance = $modal.open({
            animation: true,
            templateUrl: 'ui/ui-form.html',
            controller: 'CreateProjectCtrl',
            size: "md",
            backdrop: "static",
            resolve: {
                source: function () {
                    return source;
                }
            }
        });
        instance.result.then(function () {
            $scope.gridData1.reLoadData();
        });
    }


    function formatDate(stamp){
        var date = new Date(stamp);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();

        return Y+M+D;
    }


}]);