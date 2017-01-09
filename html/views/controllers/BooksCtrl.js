'use strict';

app.controller('BooksCtrl', ['$scope','$modal','dbUtils',function($scope,$modal,dbUtils) {

    var formGridOptions = {
        showSearchForm:true,
        showGridTitle:true,
        form:{
            settings: {
                cols: 3
            },
            fields: [
                {
                    name: "bookType",
                    label: "书籍类型",
                    type: "select",
                    // dropDownItemType: "im",
                    dataUrl:"../data/bookType.json",
                    valField:"label",
                    // dropDownItem: "bookType",
                    placeholder: "请选择",
                    labelCols: "3"
                },
                {
                    name: "bookName",
                    label: "书籍名称",
                    type: "text",
                    required: true,
                    placeholder: "书籍名称",
                    readonly: true,
                    labelCols: "3"
                },
                {
                    name: "authorName",
                    label: "作者姓名",
                    type: "text",
                    required: true,
                    placeholder: "作者姓名",
                    readonly: true,
                    labelCols: "3"
                }
            ]
        },
        grid: {
            title:'实例列表',
            settings: {
                transCode: "../data/books.json",
                autoLoad: true,
                pageSize: 3,
                showCheckBox: true
            },
            header: [
                {name: "书名", width: "15%", field: "bookName",class:"linka"},
                {name: "作者", width: "15%", field: "authorName"},
                {name: "出版日期", width: "15%", field: "publishDate"},
                {name: "定价", width: "15%", field: "price"},
                {name: "描述", width: "15%", field: "desc"}
            ],
            rowOperation: {show: true,width:"10%"}
        }
    }

    var formGridEvents = {
        grid: {
            fieldEvents: {
                "bookNameClick":function(row){
                    console.log(row);
                    //openModal(row);
                },
                // "partyNoColor":function(value,row){
                // 	var color = "green";
                //     return color;
                // },
                "priceFormat":function(value,row){
                    return '¥'+value+'元';
                }
            },
            rowEvents: [
                {name:"购买",class:"btn-default",
                    click:function(row){
                        alert('买了别后悔');
                    }
                }
            ],
            operationEvents: [ {
                name: "刷新", class: "btn-dark", icon: "refresh", click: function () {
                    //quit();
                }
            },{
                name: "新建书籍", class: "btn-dark", icon: "plus", click: function () {
                    openModal();
                }
            },{
                name: "编辑", class: "btn-dark", icon: "pencil", click: function (row) {
                    editModal(row);
                }
            },{
                name: "删除", class: "btn-dark", icon: "trash", click: function (row) {
                    quit(row);
                }
            }]
        }
    };

    $scope.dbFormGrid = {
        options: formGridOptions,
        events: formGridEvents
    };


    //打开modal
    function openModal(source) {
        var instance = $modal.open({
            animation: true,
            templateUrl: 'ui/ui-form.html',
            controller: 'AddBookCtrl',
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

            //console.log(row[0])

            openModal(row[0]);
        }
    }


    /**
     * 删除操作
     */
    function quit(row) {
        //var selectRows = $scope.dbFormGrid.getAllSelectRows();
        if (row.length == 0) {
            dbUtils.info('请选择要删除的行数据');
        }else{
            console.log(row);
            var ids = dbUtils.getFieldArray(row, "id");
            console.log(ids);
            dbUtils.confirm("确定要对所选内容进行<span style='color: red'>删除</span>操作?", function () {

                alert('开始提交数据到后台...');

                /*dbUtils.post('system.role.delete', {'ids': ids}, function (data) {
                    console.dir(data);
                    if (data.code==='200') {
                        dbUtils.success("角色删除成功！!");
                    } else {
                        dbUtils.error("删除失败!");
                    }
                    $scope.dbFormGrid.reLoadData();
                }, function (error) {
                    dbUtils.error("角色删除处理异常!" + error);
                });*/

            });
        }
    }

}]);