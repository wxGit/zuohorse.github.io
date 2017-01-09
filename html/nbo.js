'use strict';

var app = angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.select',
    'toaster',
    'ui.router',
    'ui.bootstrap',
    'ui.load',
    'dbUtils',
    'ui.components.form.grid',
    'ui.components.grid',
    'ui.components.table',
    'ui.components.operate.bar',
    'ui.components.form',
    'ui.components.form.fields',
    'ui.components.tree',
    'db.components.resourceTree',
    'ui.jq',
    'ui.validate',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'rzModule',
    'w5c.validator',
    'jsTree.directive',
    'ngJsTree',
    'daterangepicker',
    'db.components.uiFilters',
    'db.components.uiFiltersNew',
    'ui.sortable'
]);

app.run(
    [          '$rootScope', '$state', '$stateParams','$templateCache',
        function ($rootScope,   $state,   $stateParams   ,$templateCache) {
            $rootScope.$state = $state;   //方便获取状态
            $rootScope.$stateParams = $stateParams;    //方便获取状态

            $templateCache.put("ui/ui-form.html", "<div class=''><ui-form></ui-form></div>");

        }
    ]
);

app.config(["w5cValidatorProvider", function (w5cValidatorProvider) {

    // 全局配置
    w5cValidatorProvider.config({
        blurTrig   : false,
        showError  : true,
        removeError: true
    });

    w5cValidatorProvider.setRules({
        email   : {
            required: "*输入的邮箱地址不能为空",
            email   : "*邮箱地址格式不正确"
        },
        password:{
            required: "*输入的密码不能为空"
        },
        username : {
            required: "*输入的姓名不能为空",
            pattern:"*用户名必须输入字母、数字、下划线,以字母开头"
        },
        telephone:{
            required:"*手机号不能为空",
            pattern:"*手机号格式不正确"
        },
        degree: {
            required:"*学历不能为空"
        },
        content:{
            required:"内容不能为空",
            minlength: "内容长度不能小于{minlength}",
            maxlength: "内容长度不能大于{maxlength}"
        },
        school: {
            required:"*毕业院校不能为空"
        }
    });

}]);

app.config(
    [          '$stateProvider', '$urlRouterProvider',
        function ($stateProvider,   $urlRouterProvider) {

            $urlRouterProvider
                .otherwise('/paas/mysql');

            $stateProvider

                .state('paas', {
                    url: '/paas',
                    templateUrl: 'views/nbomain.html'
                })

        }
    ]
);





