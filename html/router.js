app.config(
    [          '$stateProvider', '$urlRouterProvider',
        function ($stateProvider,   $urlRouterProvider) {

            $urlRouterProvider
                .otherwise('/paas/mysql');

            $stateProvider

            //创建三级路由的开始
            .state('paas.mysql', {
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
                                    'views/controllers/RenewTplCtrl.js',
                                    '../resources/vendor/libs/bootstrap-datepicker/css/datepicker3.css',
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


            .state('paas.renewal', {
                url: '/renewal',
                templateUrl: 'views/paas/renewal.html',
                controller:'RenewalCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                            return $ocLazyLoad.load(['views/controllers/RenewalCtrl.js']);
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
                            return $ocLazyLoad.load(['views/controllers/PaasRedisCtrl.js','views/controllers/NewInstanceCtrl.js','views/controllers/NewModalCtrl.js']);
                        }]
                }
            })

            .state('paas.redisDetail', {
                url: '/redisDetail/:redisName',
                templateUrl: 'views/redisDetail.html'
            })

            .state('paas.mongodb', {
                url: '/mongodb',
                templateUrl: 'views/paas/paas_mongodb.html',
                controller:'PaasMongodbCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                            return $ocLazyLoad.load([{
                                serie: true,
                                files: [
                                    'views/controllers/PaasMongodbCtrl.js',
                                    '../resources/vendor/libs/bootstrap-datepicker/css/datepicker3.css',
                                    '../resources/vendor/libs/bootstrap-datepicker/js/bootstrap-datepicker.js'
                                ]
                            }])
                        }]
                }
            })


            .state('paas.mongodbDetail', {
                url: '/mongodbDetail/:mongodbName',
                templateUrl: 'views/mongodbDetail.html',
                controller:'AsideFoldCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                            return $ocLazyLoad.load(['views/controllers/AsideFoldCtrl.js']);
                        }]
                }
            })


            .state('paas.mongodbDetail.basicInfo', {
                url: '/basicInfo',
                templateUrl: 'views/paas/mongoBasicInfo.html'
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

            .state('paas.books1',{
                url: '/books1',
                templateUrl: 'views/paas/books1.html',
                controller:'Books1Ctrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                            return $ocLazyLoad.load([{
                                serie: true,
                                files: [
                                    'views/controllers/Books1Ctrl.js',
                                    'views/controllers/AddBook1Ctrl.js',
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

            .state('paas.noneOss', {
                url: '/noneOss',
                templateUrl: 'views/paas/noneOss.html',
                controller:'NoneOssCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                            return $ocLazyLoad.load(['views/controllers/NoneOssCtrl.js']);
                        }]
                }
            })

            .state('paas.purchaseOss', {
                url: '/purchaseOss',
                templateUrl: 'views/paas/purchaseOss.html',
                controller:'PurchaseOssCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                            return $ocLazyLoad.load(['views/controllers/PurchaseOssCtrl.js']);
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
                url: '/object/:path',
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
            })

        }
    ]
);