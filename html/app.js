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
    'ui.components.auto.grid',
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
    'ngFileUpload',
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

                // .state('signin', {
                //     url: '/signin',
                //     templateUrl: 'views/page_signin.html',
                //     controller:'SignCtrl',
                //     resolve: {
                //         deps: ['$ocLazyLoad',
                //             function( $ocLazyLoad){
                //                 return $ocLazyLoad.load(['views/controllers/SignCtrl.js']);
                //             }]
                //     }
                // })


                //创建三级路由的开始
                .state('paas', {
                    url: '/paas',
                    templateUrl: 'views/main.html'
                })

                /*.state('paas.mysql', {
                    url: '/mysql',
                    templateUrl: 'views/paas/paas_mysql.html',
                    controller:'PaasMysqlCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load([{
                                    serie: true,
                                    files: [
                                        'views/controllers/PaasMysqlCtrl.js',
                                        '../resources/vendor/libs/bootstrap-datepicker/css/datepicker3.css',
                                        //'../resources/vendor/libs/bootstrap-datepicker/js/locales/bootstrap-datepicker.zh-CN.js',
                                        '../resources/vendor/libs/bootstrap-datepicker/js/bootstrap-datepicker.js'
                                    ]
                                }])
                            }]
                    }
                })

                .state('paas.mysqlDetail', {
                    url: '/mysqlDetail/:mysqlName',
                    templateUrl: 'views/mysqlDetail.html',
                    controller:'AsideFoldCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load(['views/controllers/AsideFoldCtrl.js']);
                            }]
                    }
                })


                .state('paas.mysqlDetail.basicInfo', {
                    url: '/basicInfo',
                    templateUrl: 'views/paas/basicInfo.html',
                    controller:'BasicInfoCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load(['views/controllers/BasicInfoCtrl.js']);
                            }]
                    }
                })

                .state('paas.mysqlDetail.accountManage', {
                    url: '/accountManage',
                    templateUrl: 'views/paas/accountManage.html',
                    controller:'AccountManageCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load(['views/controllers/AccountManageCtrl.js']);
                            }]
                    }
                })


                .state('paas.mysqlDetail.createAccount', {
                    url: '/createAccount',
                    templateUrl: 'views/paas/createAccount.html',
                    controller:'CreateAccountCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load(['views/controllers/CreateAccountCtrl.js']);
                            }]
                    }
                })


                .state('paas.mysqlDetail.databaseManage', {
                    url: '/databaseManage',
                    templateUrl: 'views/paas/databaseManage.html',
                    controller:'DatabaseManageCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load(['views/controllers/DatabaseManageCtrl.js','views/controllers/CreateDatabaseCtrl.js']);
                            }]
                    }
                })

                .state('paas.mysqlDetail.databaseConect', {
                    url: '/databaseConect',
                    templateUrl: 'views/paas/formwizard.html',
                    controller:'FormWizardCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load(['views/controllers/FormWizardCtrl.js']);
                            }]
                    }
                })

                .state('paas.mysqlDetail.monitorAlarm', {
                    url: '/monitorAlarm',
                    templateUrl: 'views/paas/monitorAlarm.html',
                    controller:'MonitorAlarmCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){

                                return $ocLazyLoad.load([{
                                    serie: true,
                                    files: [
                                        'views/controllers/MonitorAlarmCtrl.js',
                                        '../resources/vendor/libs/daterangepicker.css',
                                        '../resources/vendor/libs/moment.js',
                                        '../resources/vendor/libs/daterangepicker.js'
                                    ]
                                }])

                            }]
                    }
                })

                .state('paas.mysqlDetail.recovery', {
                    url: '/recovery',
                    templateUrl: 'views/paas/recovery.html',
                    controller:'RecoveryCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load([{
                                    serie: true,
                                    files: [
                                        'views/controllers/RecoveryCtrl.js',
                                        '../resources/vendor/libs/daterangepicker.css',
                                        '../resources/vendor/libs/moment.js',
                                        '../resources/vendor/libs/daterangepicker.js'
                                    ]
                                }])
                            }]
                    }
                })


                .state('paas.createInstance', {
                    url: '/createInstance',
                    templateUrl: 'views/paas/createInstance.html',
                    controller:'CreateInstanceCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load(['views/controllers/CreateInstanceCtrl.js']);
                            }]
                    }
                })

                .state('paas.editInstance', {
                    url: '/editInstance',
                    templateUrl: 'views/paas/editInstance.html',
                    controller:'EditInstanceCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load(['views/controllers/EditInstanceCtrl.js']);
                            }]
                    }
                })


                .state('paas.authorize', {
                    url: '/authorize',
                    templateUrl: 'views/paas/authorize.html',
                    controller:'AuthorizeCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load(['views/controllers/AuthorizeCtrl.js']);
                            }]
                    }
                })


                .state('paas.redis', {
                    url: '/redis',
                    templateUrl: 'views/paas/paas_redis.html',
                    controller:'PaasRedisCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load(['views/controllers/PaasRedisCtrl.js','views/controllers/test.js']);
                            }]
                    }
                })

                .state('paas.redisDetail', {
                    url: '/redisDetail/:redisName',
                    templateUrl: 'views/redisDetail.html'
                })


                .state('paas.zookeeper', {
                    url: '/zookeeper',
                    templateUrl: 'views/zookeeperDemo.html',
                    controller:'PaasZooKeeperCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load(['views/controllers/PaasZooKeeperCtrl.js']);
                            }]
                    }
                })

                .state('paas.books', {
                    url: '/books',
                    templateUrl: 'views/books.html',
                    controller:'BooksCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load([{
                                    serie: true,
                                    files: [
                                        'views/controllers/BooksCtrl.js',
                                        'views/controllers/AddBookCtrl.js',
                                        '../resources/vendor/libs/bootstrap-datepicker/css/datepicker3.css',
                                        '../resources/vendor/libs/bootstrap-datepicker/js/bootstrap-datepicker.js'
                                    ]
                                }]);
                            }]
                    }
                })

                .state('paas.zookeeper.basicInfo', {
                    url: '/basicInfo',
                    templateUrl: 'views/paas/basicInfo.html',
                    controller:'BasicInfoCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load(['views/controllers/BasicInfoCtrl.js']);
                            }]
                    }
                })

                .state('paas.zookeeper.search', {
                    url: '/search',
                    templateUrl: 'views/page_search.html'
                })


                .state('paas.oss', {
                    url: '/oss',
                    templateUrl: 'views/paas/oss.html',
                    controller:'AsideFoldCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load(['views/controllers/AsideFoldCtrl.js']);
                            }]
                    }
                })

                .state('paas.oss.bucketlist', {
                    url: '/bucketlist',
                    templateUrl: 'views/paas/bucketlist.html',
                    controller:'BucketlistCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load([{
                                    serie: true,
                                    files: [
                                        'views/controllers/BucketlistCtrl.js',
                                        'views/controllers/CreateBucketCtrl.js'
                                    ]
                                }]);
                            }]
                    }
                })

                .state('paas.oss.basicResource', {
                    url: '/basicResource',
                    templateUrl: 'views/paas/basicResource.html',
                    controller:'BasicResourceCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load([{
                                    serie: true,
                                    files: [
                                        'views/controllers/BasicResourceCtrl.js',
                                        '../resources/vendor/libs/bootstrap-datepicker/css/datepicker3.css',
                                        '../resources/vendor/libs/bootstrap-datepicker/js/bootstrap-datepicker.js'
                                    ]
                                }]);
                            }]
                    }
                })

                .state('paas.oss.pvuv', {
                    url: '/pvuv',
                    templateUrl: 'views/paas/pvuv.html',
                    controller:'PvuvCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load([{
                                    serie: true,
                                    files: [
                                        'views/controllers/PvuvCtrl.js',
                                        '../resources/vendor/libs/bootstrap-datepicker/css/datepicker3.css',
                                        '../resources/vendor/libs/bootstrap-datepicker/js/bootstrap-datepicker.js'
                                    ]
                                }]);
                            }]
                    }
                })

                .state('paas.oss.bucketStatis', {
                    url: '/bucketStatis',
                    templateUrl: 'views/paas/bucketStatis.html',
                    controller:'BucketStatisCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load([{
                                    serie: true,
                                    files: [
                                        'views/controllers/BucketStatisCtrl.js',
                                        '../resources/vendor/libs/bootstrap-datepicker/css/datepicker3.css',
                                        '../resources/vendor/libs/bootstrap-datepicker/js/bootstrap-datepicker.js'
                                    ]
                                }]);
                            }]
                    }
                })

                .state('paas.bucket', {
                    url: '/bucket/:bucketName',
                    templateUrl: 'views/paas/bucket_main.html',
                    controller:'AsideFoldCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load(['views/controllers/AsideFoldCtrl.js']);
                            }]
                    }
                })

                .state('paas.bucket.basicInfo', {
                    url: '/basicInfo',
                    templateUrl: 'views/paas/bucket_basic.html',
                    controller:'BucketBasicCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load(['views/controllers/BucketBasicCtrl.js']);
                            }]
                    }
                })

                .state('paas.bucket.attr', {
                    url: '/attr',
                    templateUrl: 'views/paas/bucket_attr.html',
                    controller:'BucketAttrCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load(['views/controllers/BucketAttrCtrl.js']);
                            }]
                    }
                })

                .state('paas.bucket.object', {
                    url: '/object',
                    templateUrl: 'views/paas/bucket_object.html',
                    controller:'BucketObjectCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load(['views/controllers/BucketObjectCtrl.js']);
                            }]
                    }
                })



                .state('paas.computer', {
                    url: '/computer',
                    templateUrl: 'views/computerDemo.html',
                    controller:'ComputerCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){

                                return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                    function(){
                                        return $ocLazyLoad.load([{
                                            serie: true,
                                            files: [
                                                'views/controllers/computerCtrl.js',
                                                'views/controllers/CreateProjectCtrl.js',
                                                '../resources/vendor/libs/bootstrap-datepicker/css/datepicker3.css',
                                                '../resources/vendor/libs/bootstrap-datepicker/js/bootstrap-datepicker.js',
                                                '../resources/vendor/libs/daterangepicker.css',
                                                '../resources/vendor/libs/moment.js',
                                                '../resources/vendor/libs/daterangepicker.js'
                                            ]
                                        }]);
                                    }
                                );

                            }]
                    }
                })



                //截止

                .state('paas.zhugeDemo', {
                    url: '/zhugeDemo',
                    templateUrl: 'views/zhugeDemo.html',
                    controller:'ZhugeCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                                return $ocLazyLoad.load([{
                                    serie: true,
                                    files: [
                                        'views/controllers/ZhugeCtrl.js',
                                        '../resources/vendor/libs/daterangepicker.css',
                                        '../resources/vendor/libs/moment.js',
                                        '../resources/vendor/libs/daterangepicker.js'
                                    ]
                                }])
                            }
                        ]
                    }
                })

                .state('paas.zhugeDemo1', {
                    url: '/zhugeDemo1',
                    templateUrl: 'views/zhugeDemo1.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load(['views/controllers/ZhugeCtrl1.js']);
                            }]
                    }
                })

                .state('paas.profile', {
                    url: '/profile',
                    templateUrl: 'views/page_profile.html'
                })


                .state('paas.docs', {
                    url: '/docs',
                    templateUrl: 'views/docs.html'
                })

                .state('paas.uiTree', {
                    url: '/tree',
                    templateUrl: 'views/ui_tree.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                                return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                    function(){
                                        return $ocLazyLoad.load('views/controllers/tree.js');
                                    }
                                );
                            }
                        ]
                    }
                })

                .state('paas.jstree', {
                    url: '/jstree',
                    templateUrl: 'views/jstree.html',
                    controller:'JsTreeCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load(['views/controllers/JsTreeCtrl.js']);
                            }]
                    }
                })*/

        }
    ]
);





