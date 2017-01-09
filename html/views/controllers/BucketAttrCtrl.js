'use strict';

app.controller('BucketAttrCtrl', ['$scope','$modal','dbUtils','$stateParams',function($scope,$modal,dbUtils,$stateParams) {
    // console.log($stateParams.bucketName);
    $scope.bucketName = $stateParams.bucketName;


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
            {name: "添加规则", type:"button", class:"btn-dark", icon:"plus", events: {
                clicker: function(options, element) {
                    //alert("新建项目");
                    openModal();
                }
            }},
            {name: "清空全部规则", type:"button", class:"btn-dark", icon:"trash", events: {
                clicker: function(options, element) {
                    //alert("新建项目");
                }
            }}
        ]
    };


    $scope.params = {

    };

    $scope.sort = {

    };

    $scope.gridData = {
        settings: {
            title: "",
            showTitle: false,
            url: "../data/roles.json",
            autoLoad: true,
            pageSize: 3,
            showSpace:false,
            sortMode: "1"//1. Server   2. Web .  default 1
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
            {name: "实例名称", width: "15%", field: "partyNo", sortable: false, events: {
                clicker: function (value, row) {
                    console.log(row);
                }
            }},
            {name: "运行状态", width: "15%", field: "partyName", sortable: false, events: {
                clicker: function (value, row) {
                    console.log(row);
                }
            }},
            {name: "数据库类型", width: "15%", field: "organizationName", sortable: false},
            {name: "实例类型", width: "15%", field: "departmentName", sortable: false},
            {name: "创建时间", width: "15%", field: "businessType", sortable: false },
            {name: "到期日期", width: "15%", field: "certificateType", sortable: false }
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
            $scope.gridData.reLoadData();
        });
    }


}]);