/**
 * Created by 阳葵 on 15/11/21.
 * update by ziv.hung on 2016-01-19
 * @yangkui 2016-01-26
 *  调整代码架构,增加注释
 */
'use strict';
/*
 1.功能说明
 1.1 用于在页面上显示一个form表单,提供表单的各种事件功能.设置好transCode后,提供了默认的表单校验\提交等功能
 1.2 集成了ui-form-fields指令,所有表单元素通过该指令完成,具体字段的定义参见该指令设置
 1.3 在ui-form-fields指令的基础上增加了一些form表单所独有的设置项和事件

 2.使用方式
 2.1 直接页面上使用<ui-form></ui-form>
 如果直接在页面上展示表单时,建议设置showClose为false以便不显示关闭按钮和图标,该值默认为true
 2.2 结合模态窗口使用ui-form
 2.2.1 在页面上定义模板
 <script type="text/ng-template" id="myModalContent.html">
 <ui-form></ui-form>
 </script>
 2.2.2 在模态窗口当中的controller类当中初始化uiForm
 2.2.3 通过uiForm提供的modalClose事件来触发窗口的关闭动作
 3. js定义示例:
 $scope.uiForm = {
 settings:{showClose:true,transCode:"",cols:3},
 title:{icon:"",label:"组织机构"}
 //此处可以嵌入db-form-fields当中所有的数据定义结构.
 events:{
 modalClose:function(){},
 beforeSubmit:function(reqBody){},
 afterSubmit:function(retval){}
 }
 }
 4. 字段说明
 字段名称        |    说明
 4.1 settings            整个指令的可设置项内容,与db-form-fields共用
 showClose       是否显示关闭按钮和关闭图标 默认值为true
 transCode       表单提交对应的交易代码
 cols            用来定义每行显示多少个field 每个field包含一个label和输入框(或下拉框)
 4.2 title               表单标题内容
 show            是否显示标题,默认值为true
 icon            图标对应的class名字,从项目当中的icon-font查找
 label           标题名称
 4.3 events
 modalClose()    关闭按钮触发的事件,必须保证showClose为true的情况下才起作用
 beforeSubmit(reqBody)  表单提交前的事件,reqBody为表单提交的主题内容
 afterSubmit(retval)    表单提交后的事件,retval为服务端的返回值
 */


var uiFormDirectives = angular.module('ui.components.form', ['dbUtils']);
uiFormDirectives.directive('uiForm', ['$window', '$timeout', 'dbUtils', function ($window, $timeout, dbUtils) {
    //dbTree默认参数,针对setting值
    var options = {
        settings: {
            showClose: true,//是否显示关闭按钮
            isDetail: false // handle 代表 新增修改页面,detail代表明细页面——此属性作用,用来在不同的操作界面显示form的操作按钮.
        },
        title: {
            show: true
        }
    };

    return {
        restrict: 'E',
        templateUrl: "../resources/templates/uiForm.html",
        replace: true,
        transclude: true,
        controller: ['$scope', function ($scope) {
            if (angular.isUndefined($scope.uiForm)) {
                $scope.uiForm = {};
            }

            //替换默认值
            $scope.uiForm.settings = angular.extend({}, options.settings, $scope.uiForm.settings);
            $scope.uiForm.title = angular.extend({}, options.title, $scope.uiForm.title);
            $scope.uiForm.viewDetail = $scope.uiForm.settings.isDetail;

            $scope.uiForm.modalClose = function () {
                if ($scope.uiForm.events.modalClose) {
                    $scope.uiForm.events.modalClose();
                }
            };

            /*$scope.uiForm.submit = function (isValid) {
                $scope.uiForm.submited = true;
                if (isValid) {
                    dbUtils.confirm("确定要执行此操作?", function () {
                        var reqBody = angular.copy($scope.uiForm.getFormData());
                        var selectFields = $scope.uiForm.getSelectFields();
                        angular.forEach(selectFields, function (field) {
                            if (reqBody[field.name]) {
                                if(field.type=="multiple"){ //多选下拉框默认提交到后台的格式为value的数组
                                    var values  = [];
                                    angular.forEach(reqBody[field.name],function(o){
                                        values.push(o.value);
                                    });
                                    reqBody[field.name] = values;
                                }else{
                                    reqBody[field.name] = reqBody[field.name].value;
                                }
                            }
                        });
                        if ($scope.uiForm.events.beforeSubmit) {
                            var flag = $scope.uiForm.events.beforeSubmit(reqBody);
                            if (!angular.isUndefined(flag) && !flag) {
                                return;
                            }
                        }
                        if ($scope.uiForm.events.onSubmit) {
                            $scope.uiForm.events.onSubmit(reqBody);
                        }else{
                            dbUtils.post($scope.uiForm.settings.transCode, reqBody, function (data) {
                                if (!angular.isUndefined(data) && !angular.isUndefined(data["errorMsg"])) {
                                    dbUtils.tip(data["errorMsg"]);
                                }
                                if ($scope.uiForm.events.afterSubmit) {
                                    $scope.uiForm.events.afterSubmit(data);
                                }

                            });
                        }
                    });
                } else {
                    console.log("校验不通过");
                }
            };*/
        }]
        , link: function (scope, element, attrs) {
            console.log("linked uiForm");
        }
    }
}]);

