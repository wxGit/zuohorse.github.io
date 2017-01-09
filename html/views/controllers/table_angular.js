'use strict';

app.controller('TableAngular', ['$scope','$modal','dbUtils',function($scope,$modal,dbUtils) {
    var formGridOptions = {
        form: {
            settings: {
                cols: 2
            },
            fields: [
                {name: "organizationName", label: "角色名称", type: "text", required: true, placeholder: "角色名称中文", readonly: true, labelCols: "3"},
                {name: "organizationName", label: "角色名称", type: "text", required: true, placeholder: "角色名称英文", readonly: true, labelCols: "3"},
                {name: "apply","label": "申请日期", "type": "dateRange", "labelCols": "3"},
                {name: "audit","label": "审核日期", "type": "dateRange", "labelCols": "3"},
                {
                    name: "flowType",
                    label: "流程类型",
                    type: "select", dropDownItemType: "im", dropDownItem: "flowType", placeholder: "请选择业务审核流程类型", labelCols: "3"
                }
            ]
        },
        grid: {
            settings: {
                transCode: "../data/roles.json",
                autoLoad: true,
                page: {pageSize: 10},
                showCheckBox: true
            },
            header: [
                {name: "角色名称(英文)", width: "14%", field: "partyNo",class:"linka"},
                {name: "角色名称(中文)", width: "14%", field: "partyName"},
                {name: "描述", width: "12%", field: "organizationName"},
                {name: "可编辑", width: "9%", field: "departmentName"},
                {name: "创建时间", width: "17%", field: "businessType"},
                {name: "更新时间", width: "17%", field: "certificateType"},
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
                {name:"同意",class:"btn-success",
                    click:function(row){
                       // auditFlow([row]);
                       alert('同意!');
                    }
                },
                {name:"拒绝",class:"btn-danger",
                    click:function(row){
                       // refuseFlow([row]);
                       alert('拒绝');
                    }
                }
            ],
            operationEvents: [{
                name: "新增", class: "btn-warning", icon: "plus", click: function () {
                    openModal();
                }
            },
            {
                name: "删除", class: "btn-danger", icon: "trash-o", click: function () {
                    quit();
                }
            },
            {
                name: "编辑", class: "btn-info", icon: "pencil", click: function (row) {
                    editModal(row);
                }
            },
            {
                name: "Excel", class: "btn-primary", icon: "html5", click: function (row) {
                    // imports();
                }
            },{
                name: "授权", class: "btn-success", icon: "css3", click: function (row) {
                    // openAuthModal(row);
                }
            }]
        }
    };

    $scope.dbFormGrid = {options: formGridOptions, events: formGridEvents};


    //打开modal
    function openModal(source) {
        var instance = $modal.open({
            animation: true,
            templateUrl: 'html/views/templates/test.html',
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