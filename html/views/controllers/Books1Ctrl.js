'use strict';

app.controller('Books1Ctrl',['$scope','$modal','dbUtils',function ($scope,$modal,dbUtils) {

    /*
    //配置ui-form-grid参数的基本框架
    var formGridOptions = {
        showSearchForm:true,
        showGridTitle:true,
        form:{
            settings: {
                cols: 3
            },
            fields:[

            ]
        },
        grid:{
            title:'实例列表',
            settings: {
                transCode: ""
            },
            header: [

            ],
            rowOperation:{
                show:false
            }
        }
    };

    var formGridEvents = {
        grid:{
            fieldEvents: {},
            rowEvents: [],
            operationEvents: []
        }
    };

    $scope.dbFormGrid = {
        options:formGridOptions,
        events:formGridEvents
    }*/

    var formGridOptions = {
        showSearchForm:true,
        showGridTitle:true,
        form:{
            settings: {
                cols: 3
            },
            fields:[
                {
                    name:'bookType',
                    label: "书籍类型",
                    type:'select',
                    dataUrl:"../data/bookType.json",
                    valField:"label",
                    labelCols: "3"
                },
                {
                    name: "bookName",
                    label: "书籍名称",
                    type: "text",
                    placeholder: "书籍名称",
                    labelCols: "3"
                },
                {
                    name: "authorName",
                    label: "作者姓名",
                    type: "text",
                    placeholder: "作者姓名",
                    labelCols: "3"
                }
            ]
        },
        grid:{
            title:'实例列表',
            settings: {
                transCode: "../data/books.json",
                autoLoad: true,
                pageSize: 3,
                showCheckBox: true
            },
            header: [
                {
                    name:"书名",
                    width:"15%",
                    field: "bookName"
                },
                {name: "作者", width: "15%", field: "authorName"},
                {name: "出版日期", width: "15%", field: "publishDate"},
                {name: "定价", width: "15%", field: "price"},
                {name: "描述", width: "15%", field: "desc"}
            ],
            rowOperation:{
                show:true,
                width:"10%"
            }
        }
    };

    var formGridEvents = {
        grid:{
            fieldEvents: {
                "publishDateClick":function(row){
                    console.log(row);
                },
                "bookNameColor":function(value,row){
                	var color = "green";
                    return color;
                },
                "priceFormat":function(value,row){
                    return '¥'+value+'元';
                }
            },
            rowEvents: [
                {
                    name:"购买",
                    class:"btn-default",
                    click:function(row){
                        alert('买了别后悔');
                    }
                }
            ],
            operationEvents: [
                {
                    name: "刷新", class: "btn-dark", icon: "refresh", click: function () {
                    //quit();
                }
                },{
                    name: "新建书籍", class: "btn-dark", icon: "plus", click: function () {
                        openModal();
                    }
                },{
                    name: "编辑", class: "btn-dark", icon: "pencil", click: function (row) {
                        //editModal(row);
                    }
                },{
                    name: "删除", class: "btn-dark", icon: "trash", click: function (row) {
                        //quit(row);
                    }
                }
            ]
        }
    };

    $scope.dbFormGrid = {
        options:formGridOptions,
        events:formGridEvents
    }
    
    
    function openModal(source) {
        var instance = $modal.open({
            animation: true,
            templateUrl: 'ui/ui-form.html',
            controller: 'AddBook1Ctrl',
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