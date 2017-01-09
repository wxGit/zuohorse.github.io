'use strict';

app.controller('PaasRedisCtrl', ['$scope','$modal','dbUtils',function($scope,$modal,dbUtils) {

    var formGridOptions = {
        showSearchForm:true,
        showGridTitle:true,
        form:{
            settings: {
                cols: 2
            },
            fields: [
                {
                    name: "flowType",
                    label: "筛选",
                    type: "select", dropDownItemType: "im", dropDownItem: "flowType", placeholder: "请选择实例类别", labelCols: "3"
                },
                {name: "organizationName", label: "角色名称", type: "text", required: true, placeholder: "实例ID", readonly: true, labelCols: "3"}
            ]
        },
        grid: {
            title:'实例列表',
            settings: {
                transCode: "../data/roles.json",
                autoLoad: true,
                pageSize: 3,
                showCheckBox: true
            },
            header: [
                {name: "实例名称", width: "13%", field: "partyNo",class:"linka"},
                {name: "运行状态", width: "13%", field: "partyName"},
                {name: "数据库类型", width: "14%", field: "organizationName"},
                {name: "实例类型", width: "13%", field: "departmentName"},
                {name: "创建时间", width: "13%", field: "businessType"},
                {name: "到期日期", width: "14%", field: "certificateType"}
            ],
            rowOperation: {show: true,width:"20%"}
        }
    }

    var formGridEvents = {
        grid: {
            fieldEvents: {
                "partyNoClick":function(row){
                    console.log(row);
                    //openModal(row);
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
                {name:"管理",class:"btn-default",
                    click:function(row){
                        window.location.href='#/mysqlDetail/'+row.partyNo+'/basicInfo';
                    }
                },
                {name:"续费",class:"btn-default",
                    click:function(row){
                        alert('续费');
                    }
                }
            ],
            operationEvents: [ {
                name: "刷新", class: "btn-dark", icon: "refresh", click: function () {
                    //quit();
                }
            },{
                name: "新建1", class: "btn-dark", icon: "plus", click: function () {
                    openModal();
                }
            },{
                name: "新建2", class: "btn-dark", icon: "plus", click: function () {
                    openModal1();
                }
            },{
                name: "编辑", class: "btn-dark", icon: "pencil", click: function (row) {
                    editModal(row);
                }
            }]
        }
    };

    $scope.dbFormGrid = {options: formGridOptions, events: formGridEvents};


    //打开modal
    function openModal(source) {
        var instance = $modal.open({
            animation: true,
            templateUrl: 'views/templates/newInstance.html',
            controller: 'NewInstanceCtrl',
            size: "lg",
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

    function openModal1(source) {
        var instance = $modal.open({
            animation: true,
            templateUrl: 'views/templates/newModal.html',
            controller: 'NewModalCtrl',
            size: "lg",
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
    function editModal(row) {

        if(row.length == 0){
            dbUtils.info('请选择要编辑的行数据');
        }else if(row.length > 1){
            dbUtils.info('请选择一行数据');
        }else{
            console.log(row);
            var instance = $modal.open({
                animation: true,
                templateUrl: 'html/views/templates/test.html',
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
    }


    /**
     * 删除操作
     */
    function quit() {
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
    }

}]);