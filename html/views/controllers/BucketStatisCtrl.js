'use strict';

app.controller('BucketStatisCtrl', ['$scope','$modal','dbUtils','$stateParams',function($scope,$modal,dbUtils,$stateParams) {

    //配置查询表单的参数
    $scope.searchForm = {
        params:{},
        form:{
            settings: {
                cols: 2
            },
            fields: [
                {
                    name: "bookType",
                    label: "选择Bucket",
                    type: "select",
                    dataUrl:"../data/bookType.json",
                    valField:"label",
                    placeholder: "请选择Bucket",
                    labelCols: "3"
                },
                {
                    name: "daterange",
                    label: "选择时间范围",
                    type: "dateRange",
                    placeholder: "",
                    labelCols: "3"
                }
            ]
        },
        submitter:function (data) {
            console.log(data);
        }
    };

    $scope.params = {

    };

    $scope.sort = {

    };

    $scope.gridData = {
        settings: {
            title: "",
            showTitle: false,
            apiType: "list",
            url: "../data/roles.json",
            autoLoad: true,
            showSpace:false,
            sortMode: "1"//1. Server   2. Web .  default 1
        },
        page: {                                 //Page设置
            show: false,                         //是否显示PageBar(分页条) 默认 true
            pageSize: 10                       //每页条数
        },
        choice: {
            show: false,
            mode: "radio",//checkbox  or  radio
            name: "选择",//单选下有效
            field: "select1",  //通一个页面多个选择需要指定不同的名称
            events: {
                changer: function (data) {//被点击
                    console.log(data);
                }
            }
        },
        header: [
            {name: "实例名称", width: "15%", field: "partyNo", sortable: false, class:"linka", events: {
                clicker: function (value, row) {
                    console.log(row);
                },
                color: function (value, row) {
                    var color = "green";
                    return color;
                }
            }},
            {name: "运行状态", width: "15%", field: "partyName", sortable: false, events: {
                clicker: function (value, row) {
                    console.log(row);
                }
            }},
            {name: "数据库类型", width: "15%", field: "organizationName", sortable: false },
            {name: "实例类型", width: "14%", field: "departmentName", sortable: false, events: {
                formatter: function (value, row) {
                    if(value == true) {
                        return true;
                    }else{
                        return false;
                    }
                }
            }},
            {name: "创建时间", width: "15%", field: "businessType", sortable: false },
            {name: "到期日期", width: "15%", field: "certificateType", sortable: false }
        ],
        operation: {
            show: true,
            name: "操作",
            width:"12%",
            events:[
                {
                    name:"查看详情",
                    class:"btn-default",
                    clicker:function(row){
                        alert("查看详情");
                        //$state.go("paas.computer");
                    }
                }
            ]
        }
    };


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