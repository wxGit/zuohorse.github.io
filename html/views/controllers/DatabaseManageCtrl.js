'use strict';

app.controller('DatabaseManageCtrl', ['$scope','$modal','dbUtils',function($scope,$modal,dbUtils) {

    var formGridOptions = {
        showSearchForm:false,
        form:{
            settings:{}
        },
        grid: {
            gridTitle:'数据库管理',
            settings: {
                transCode: "../data/roles.json",
                autoLoad: true,
                page: {pageSize: 10},
                showCheckBox: true
            },
            header: [
                {name: "数据库名", width: "16%", field: "partyNo",class:"linka"},
                {name: "数据库状态", width: "16%", field: "partyName"},
                {name: "字符集", width: "16%", field: "organizationName"},
                {name: "绑定账号", width: "16%", field: "departmentName"},
                {name: "描述", width: "16%", field: "businessType"}
            ],
            rowOperation: {show: true,width:"20%"}
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
                //{name:"重置密码",class:"btn-success",
                //    click:function(row){
                //        alert('重置密码!');
                //    }
                //},
                //{name:"修改权限",class:"btn-warning",
                //    click:function(row){
                //        alert('修改权限');
                //    }
                //},
                {name:"删除",class:"btn-danger",
                    click:function(row){
                        alert('删除');
                    }
                }
            ],
            operationEvents: [{
                name: "创建数据库", class: "btn-primary", icon: "plus", click: function () {
                        openModal();
                    }
                },
                {
                    name: "刷新", class: "btn-warning", icon: "refresh", click: function () {
                        //quit();
                    }
                }]
        }
    };

    $scope.dbFormGrid = {options: formGridOptions, events: formGridEvents};


    //打开modal
    function openModal(source) {
         var instance = $modal.open({
             animation: true,
             templateUrl: 'html/views/templates/databaseTpl.html',
             controller: 'CreateDatabaseCtrl',
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
     }


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