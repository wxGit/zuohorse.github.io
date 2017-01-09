'use strict';

app.controller('BucketlistCtrl', ['$scope','$modal','$state','dbUtils',function($scope, $modal, $state, dbUtils) {

    $scope.operateData = {
        data:{

        },
        elements: [
            {name: "刷新", type:"button", class:"btn-dark", icon:"refresh", events: {
                clicker: function(options, element) {
                    alert("刷新");
                }
            }},
            {name: "新建Bucket", type:"button", class:"btn-dark", icon:"plus", events: {
                clicker: function(options, element) {
                    //alert("新建项目");
                    openModal();
                }
            }},
            {name: "项目名称", type:"search", placeholder: "搜索Bucket", value: "", events: {
                 submitter: function(data, element) {
                     alert("搜索Bucket");
                 }
            }}
        ]
    };


    $scope.params = {
        bucketName: "张三"
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
            {name: "实例名称", width: "13%", field: "partyNo", sortable: false, class:"linka", events: {
                clicker: function (row) {
                    // console.log(row);
                    $state.go('paas.bucket.basicInfo',{'bucketName':row.partyNo});
                },
                color: function (row) {
                    var color = "green";
                    return color;
                }
            }},
            {name: "运行状态", width: "13%", field: "partyName", sortable: false, events: {
                clicker: function (row) {
                    console.log(row);
                }
            }},
            {name: "数据库类型", width: "14%", field: "organizationName", sortable: false },
            {name: "实例类型", width: "13%", field: "departmentName", sortable: false, events: {
                formatter: function (value) {
                    if(value == true) {
                        return true;
                    }else{
                        return false;
                    }
                }
            }},
            {name: "创建时间", width: "13%", field: "businessType", sortable: false },
            {name: "到期日期", width: "14%", field: "certificateType", sortable: false }
        ],
        operation: {
            show: true,
            name: "操作",
            width:"20%",
            events:[
                {
                    name:"浏览",
                    class:"btn-default",
                    clicker:function(row){
                        console.log(row);
                        $state.go('paas.bucket.basicInfo',{'bucketName':row.partyNo});
                    }
                },
                {
                    name:"删除",
                    class:"btn-default",
                    clicker:function(row){
                        console.log(row);
                        //$state.go("paas.computer");
                    }
                },
                {
                    name:"设置",
                    class:"btn-default",
                    clicker:function(row){
                        console.log(row);
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
            templateUrl: 'views/templates/createBucket.html',
            controller: 'CreateBucketCtrl',
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