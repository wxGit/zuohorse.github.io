/**
 * Created by wash on 16/3/28.
 */
'use strict';

app.controller("AddBookCtrl", ['$scope','$modalInstance','dbUtils', 'source', createProjectCtrl]);

//显示数据
function createProjectCtrl($scope,$modalInstance,dbUtils,source){

    $scope.uiForm = {
        settings: {
            cols: 1,
            showClose: true
            // isDetail:true
        },   //isDetail设置只查看,不能编辑
        title: {
            show:true,
            label: "书籍",
            icon: "github-alt"
        },
        sections: [{
            fields: [
                {name: "bookType", label: "类型", type: "select",editable:false, dataUrl:"../data/bookType.json", valField:"label", showDelete:true, required: true, labelCols:3, cols: 12},
                {name: "bookName", label: "书名", type: "text", required: true, placeholder: "请输入书籍名称", labelCols:3, cols: 12},
                {name: "authorName", label: "作者", type: "text", required: true, placeholder: "请输入作者姓名", labelCols:3, cols: 12},
                {name: "publishDate", label: "出版日期", type: "date", required: true, placeholder: "请选择出版日期", labelCols:3, cols: 12},
                {name: "price", label: "价格", type: "text", required: true, placeholder: "请录入价格", labelCols:3, cols: 12},
                {name: "desc", label: "描述", type: "textarea", required: true, readonly: false, placeholder: "请输入书籍描述", labelCols:3, cols: 12}
            ]
        }],
        defaultData:source,  //编辑模式
        // originData: source,  //查看模式
        events:{
            modalClose: function () {
                $modalInstance.dismiss("cancel");
            }
        }
    };


    //if(angular.isUndefined(source)){
    //    $scope.uiForm.formData = {
    //        bookType:{},
    //        bookName:null,
    //        authorName:null,
    //        publishDate:null,
    //        price:null,
    //        desc:null
    //    }
    //}else{
    //    $scope.uiForm.formData = angular.copy(source);
    //}


    $scope.uiForm.changeItem = function(item,model){   //触发select的change事件
        console.log(item);
    }


    //提交成功
    $scope.uiForm.submit = function (isValid) {

        $scope.uiForm.submited = true;

        if(isValid){

            console.log($scope.uiForm.formData);  //读取表单提交的数据

            $scope.uiForm.modalClose();
        }

        /*if (isValid) {
         var reqBody = angular.copy($scope.data);
         dbUtils.post(angular.isUndefined(source) ? 'system.role.add' : 'system.role.edit',reqBody, function (data) {
         dbUtils.success('操作成功!');
         $modalInstance.close();
         }, function (error) {
         dbUtils.error(error);
         });
         }*/

    };
}
