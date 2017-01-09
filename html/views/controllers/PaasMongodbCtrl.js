'use strict';

app.controller('PaasMongodbCtrl', ['$scope','$modal','dbUtils','$state',function($scope,$modal,dbUtils,$state) {

    $scope.app.settings.asideFolded = false;

    $scope.opened = false;

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };
    //结束


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
                {
                    name: "organizationName",
                    label: "角色名称",
                    type: "dateRange",
                    placeholder: "实例ID",
                    labelCols: "3"
                }

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
                    openModal(row);
                },
                // "partyNoColor":function(value,row){
                // 	var color = "green";
                //     return color;
                // },
                "departmentNameFormat":function(value,row){
                    if(value == true){
                        return '是';
                    }else{
                        return '否';
                    }
                }
            },
            rowEvents: [
                {name:"管理",class:"btn-default",
                    click:function(row){
                        // window.location.href='#/paas/mongodbDetail/'+row.partyNo+'/basicInfo';
                        $state.go('paas.mongodbDetail.basicInfo',{'mongodbName':row.partyNo});
                    }
                },
                {name:"续费",class:"btn-default",
                    click:function(row){
                        alert('续费');
                    }
                }
            ],
            operationEvents: [{
                name: "刷新", class: "btn-dark", icon: "refresh", click: function () {
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


}]);