'use strict';

app.controller('BucketObjectCtrl', ['$scope','$modal','dbUtils','$stateParams','Upload',function($scope,$modal,dbUtils,$stateParams,Upload) {
    console.log($stateParams.bucketName);
    console.log($stateParams.path);

    $scope.bucketName = $stateParams.bucketName;

    function upload(file) {
        Upload.upload({
            url: 'upload/url',
            data: {file: file, 'username': $scope.username}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    }


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
            {name: "上传文件", type:"file", class:"btn-dark", icon:"cloud-upload", events: {
                uploadFiles: function(files) {
                    // console.log(files);
                    if (files && files.length) {
                        for (var i = 0; i < files.length; i++) {
                            upload(files[i]);
                        }
                    }
                }
            }},
            {name: "新建文件夹", type:"button", class:"btn-dark", icon:"plus", events: {
                clicker: function(options, element) {
                    //alert("新建项目");
                    openModal();
                }
            }},
            {name: "全选", type:"button", class:"btn-dark", icon:"trash", events: {
                clicker: function(options, element) {
                    $scope.gridData.settings.allRowChecked = true;
                    $scope.gridData.allRowClick();
                }
            }},
            {name: "取消选择", type:"button", class:"btn-dark", icon:"trash", events: {
                clicker: function(options, element) {
                    $scope.gridData.settings.allRowChecked = false;
                    $scope.gridData.allRowClick();
                }
            }},
            {name: "批量删除", type:"button", class:"btn-dark", icon:"trash", events: {
                clicker: function(options, element) {
                    console.log($scope.gridData.getAllSelectRows());
                }
            }},
            {name: "批量设置HTTP头", type:"button", class:"btn-dark", icon:"cog", events: {
                clicker: function(options, element) {
                    //alert("新建项目");
                }
            }},
            {name: "搜索", type:"search", placeholder: "输入Object名前缀匹配", value: "", events: {
                submitter: function(data, element) {
                    alert("submitter");
                }
            }}
        ]
    };


    $scope.params = {};

    if($stateParams.path != ''){
        $scope.params.path = {
            name:$stateParams.path+'/'
        }
    }

    $scope.sort = {};

    $scope.gridData = {
        settings: {
            title: "",
            showTitle: false,
            url: "../data/files.json",
            autoLoad: true,
            showSpace:false,
            allRowChecked:false,
            rowOperation:{
                width:"25%"
            }
        },
        choice: {
            show: false,
            mode: "radio",//checkbox  or  radio
            name: "选择",//单选下有效
            field: "select1"  //通一个页面多个选择需要指定不同的名称
        },
        header: [
            {name: "文件名", width: "20%", field: "name", events: {
                clicker: function (row) {
                    if(row.isdir){

                        var p = row.name.substring(0,row.name.length-1);

                        window.location.href = '#/paas/bucket/'+$stateParams.bucketName+'/object/'+p;

                    }else{
                        alert('这是文件');
                    }
                }
            }},
            {name: "大小", width: "15%", field: "sizeValue",events:{
                formatter:function (value,row) {
                    if(row.isdir){
                        return '-'
                    }else{
                        return value
                    }
                }
            }},
            {name: "类型", width: "15%", field: "type"},
            {name: "创建时间", width: "20%", field: "createTimeValue",events:{
                formatter:function (value,row) {
                    if(row.isdir){
                        return '-'
                    }else{
                        return value
                    }
                }
            }}
        ],
        operation: {
            show:true,
            width:"25%",
            isdirEvents:[
                {
                    name:"删除",
                    class:"btn-default",
                    clicker:function(row){
                        console.log(row);
                    }
                }
            ],
            isFileEvents:[
                {
                    name:"获取地址",
                    class:"btn-default",
                    clicker:function(row){
                        console.log(row);
                    }
                },
                {
                    name:"设置HTTP头",
                    class:"btn-default",
                    clicker:function(row){
                        console.log(row);
                    }
                },
                {
                    name:"删除",
                    class:"btn-default",
                    clicker:function(row){
                        console.log(row);
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