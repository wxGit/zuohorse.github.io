'use strict';

app.controller('AccountManageCtrl', ['$scope','$modal','dbUtils','$stateParams','$state',function($scope,$modal,dbUtils,$stateParams,$state) {

    console.log($stateParams.mysqlName);

    var formGridOptions = {
        showSearchForm:false,
        showGridTitle:true,
        form:{
            settings:{}
        },
        grid: {
            title:'映像(Image) 是带有操作系统的主机模板.用户可以基于已有映像创建主机,也可以将自有主机捕获为新映像,以备后用<br/>系统映像为官方提供的模板.会提供主流的Linux | Windows模板,并根据上游厂商更新版本<br/>有映像创建主机,也可以将自有主机捕获,供的模板.会提供主流的Linux | Windows模板',
            settings: {
                transCode: "../data/roles.json",
                autoLoad: true,
                page: {pageSize: 10},
                showCheckBox: true
            },
            header: [
                {name: "账号", width: "15%", field: "partyNo",class:"linka"},
                {name: "状态", width: "15%", field: "partyName"},
                {name: "所属数据库", width: "15%", field: "organizationName"},
                {name: "账号描述", width: "15%", field: "departmentName"}
            ],
            rowOperation: {show: true,width:"15%"}
        }
    }

    var formGridEvents = {
        grid: {
            fieldEvents: {
                "partyNoClick":function(row){
                    console.log(row);
                    openModal(row);
                },
                // "partyNoColor":function(value,row){
                // 	var color = "green";
                //     return color;
                // },
                "departmentNameFormat":function(value,row){
                    if(value == true){
                        return true;
                    }else{
                        return false;
                    };
                }
            },
            rowEvents: [
                {name:"修改权限",class:"btn-default",
                    click:function(row){
                        alert('修改权限');
                    }
                },
                {name:"删除",class:"btn-default",
                    click:function(row){
                        alert('删除');
                    }
                }
            ],
            operationEvents: [{
                name: "刷新", class: "btn-dark", icon: "refresh", click: function () {
                    //quit();
                }
            },{
                name: "创建账号", class: "btn-dark", icon: "plus", click: function () {
                    //openModal();
                    $state.go('paas.mysqlDetail.createAccount');
                }
            }],
            operationSearch:true
        }
    };

    $scope.dbFormGrid = {options: formGridOptions, events: formGridEvents};


    //打开modal
    /*function openModal(source) {
        var instance = $modal.open({
            animation: true,
            templateUrl: 'tpl/templates/test.html',
            controller: 'testCtrl',
            size: "md",
            backdrop: "static",
            resolve: {
                source: function () {
                    return source;
                }
            }
        });
        instance.result.then(function () {
            $scope.dbFormGrid.reLoadData();
        });
    }*/


    //编辑modal
    /*function editModal(row) {

        if(row.length == 0){
            dbUtils.info('请选择要编辑的行数据');
        }else if(row.length > 1){
            dbUtils.info('请选择一行数据');
        }else{
            console.log(row);
            var instance = $modal.open({
                animation: true,
                templateUrl: 'tpl/templates/test.html',
                controller: 'testCtrl',
                size: "md",
                backdrop: "static",
                resolve: {
                    source: function(){
                        return row[0];
                    }
                }
            });
            instance.result.then(function () {
                $scope.dbFormGrid.reLoadData();
            });
        };
    }*/


    /**
     * 删除操作
     */
    /*function quit() {
        var selectRows = $scope.dbFormGrid.getAllSelectRows();
        if (selectRows.length === 0) {
            dbUtils.info('请选择要删除的行数据');
        }else{
            console.log(selectRows);
            var ids = dbUtils.getFieldArray(selectRows, "id");
            console.log(ids);
            dbUtils.confirm("确定要对所选角色进行<span style='color: red'>删除</span>操作?", function () {
                dbUtils.post('system.role.delete', {'ids': ids}, function (data) {
                    console.dir(data);
                    if (data.code==='200') {
                        dbUtils.success("角色删除成功！!");
                    } else {
                        dbUtils.error("删除失败!");
                    }
                    $scope.dbFormGrid.reLoadData();
                }, function (error) {
                    dbUtils.error("角色删除处理异常!" + error);
                });
            });
        }
    }*/

}]);