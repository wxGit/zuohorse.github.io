'use strict';

/* Controllers */

var app = angular.module('app');

app.controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window',
    function(              $scope,   $translate,   $localStorage,   $window ) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

      // config
      $scope.app = {
        name: 'Paas',
        version: '1.3.3',
        // for chart colors
        color: {
          primary: '#7266ba',
          info:    '#23b7e5',
          success: '#27c24c',
          warning: '#fad733',
          danger:  '#f05050',
          light:   '#e8eff0',
          dark:    '#3a3f51',
          black:   '#1c2b36'
        },
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-black',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-black',
          asideSubColor: 'bg-light',
          headerFixed: true,
          asideFixed: false,
          asideFolded: false,
          asideDock: false,
          container: false
        }
      }

      // save settings to local storage
      //if ( angular.isDefined($localStorage.settings) ) {
      //  $scope.app.settings = $localStorage.settings;
      //} else {
      //  $localStorage.settings = $scope.app.settings;
      //}
      //$scope.$watch('app.settings', function(){
      //  if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
      //    // aside dock and fixed must set the header fixed.
      //    $scope.app.settings.headerFixed = true;
      //  }
      //  // save to local storage
      //  $localStorage.settings = $scope.app.settings;
      //}, true);

      // angular translate
      $scope.lang = { isopen: false };
      $scope.langs = {en:'English', de_DE:'German', it_IT:'Italian',zh_ZH:'中文'};
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "中文";
      $scope.setLang = function(langKey, $event) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
      };

      function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }


      //地区切换
      $scope.selectArea = '上海';
      $scope.setArea = function(obj){
        //console.log(obj);
        $scope.selectArea = obj;
      }

  }]);

/* Setup Layout Part - Sidebar */
app.controller('SiderBarCtrl', ['$scope', '$http', '$window', '$state', function ($scope, $http, $window, $state) {
  $scope.$on('$includeContentLoaded', function () {
        // 数据从服务端获取，或从指定的JSON文件当中获取
        var menus = [
            {
              "groupName":"数据库",
              "menulist":[
                  {
                    "name": "Mysql", "icon": "database", "url": "paas.mysql","colorStyle":"text-info-dker"
                  },
                  {
                    "name": "Redis", "icon": "cube", "url": "paas.redis","colorStyle":"text-danger-dker"
                  },
                  {
                    "name": "Mongodb", "icon": "leaf", "url": "paas.uiTree","colorStyle":"text-success-dker"
                  }
              ]
            },
            {
              "groupName":"服务器",
              "menulist":[
                {
                  "name": "Zookeeper", "icon": "signal", "url": "paas.zookeeper.basicInfo","colorStyle":"text-default-dker"
                },
                {
                  "name": "图书管理", "icon": "book", "url": "paas.books","colorStyle":"text-default-dker"
                }
              ]
            },
            {
              "groupName":"大规模计算",
              "menulist":[
                {
                  "name": "大数据计算服务", "icon": "signal", "url": "paas.computer","colorStyle":"text-default-dker"
                }
              ]
            },
            {
              "groupName":"基本",
              "menulist":[
                {
                  "name": "项目管理", "icon": "briefcase", "url": "","colorStyle":"text-default-dker",
                  "subList": [
                    {"name": "项目列表", "icon": "", "url": "paas.jstree"},
                    {"name": "新建项目", "icon": "", "url": "paas.zhugeDemo"},
                    {"name": "编辑项目", "icon": "", "url": "paas.zhugeDemo1"}
                  ]
                },
                {
                  "name": "节点管理", "icon": "file", "url": "","colorStyle":"text-default-dker",
                  "subList": [
                    {
                        "name": "节点列表",
                        "icon": "",
                        "url": "",
                        "subList": [
                          {"name": "aaaa", "icon": "", "url": "app.dashboard-v1"},
                          {"name": "bbbb", "icon": "", "url": "app.dashboard-v1"},
                          {"name": "cccc", "icon": "", "url": "app.dashboard-v1"}
                        ]
                    },
                    {"name": "新建节点", "icon": "", "url": "app.dashboard-v1"},
                    {"name": "编辑节点", "icon": "", "url": "app.dashboard-v1"}
                  ]
                }
              ]
            }
        ]

          $scope.status = {
              open:true
          };

        //请求后台左侧菜单数据
        var url = "http://101.227.185.101:20002/step/v3/mis/newMenuList?token=718a51d7-cacd-4371-800e-f3de1ae36470";

      // $.ajax ({
      //     url: url,
      //     dataType: 'jsonp',
      //     success: function (data) {
      //         console.log(data)
      //     }
      // });



        //var ApiRequest = {};
        //ApiRequest["transCode"] = "9124";
        //ApiRequest["requestBody"] = {"no": "no"};
        //$http.post("../api.do", ApiRequest).success(function (data, status, headers, config) {
        //  if (data.status == 401) {//用户未登录
        //    $window.location.href = "login.html";
        //  } else if (data.status == 403) {
        //    alert("无权限获取菜单!");
        //    return;
        //  }
        //  if (angular.isUndefined(data.responseBody)) {
        //    $scope.pageHeaderMenus = null;
        //    return;
        //  }
        //  angular.forEach(menus, function (menu, i) {
        //    if (menu.subList) {
        //      var parentShow = false;
        //      angular.forEach(menu.subList, function (m, index) {
        //        if (m.subList) {
        //          var parentShow2 = false;
        //
        //          angular.forEach(m.subList, function (n, index) {
        //            var isExist = false;
        //            angular.forEach(data.responseBody, function (item) {
        //              if (n.url == item['permissionStr']) {
        //                isExist = true;
        //                return false;
        //              }
        //            });
        //            n["show"] = isExist;
        //            if (isExist) {
        //              parentShow2 = true;
        //            }
        //          });
        //          m["show"] = parentShow2;
        //          if(parentShow2){
        //            parentShow = true;
        //          }
        //        }else{
        //          var isExist = false;
        //          angular.forEach(data.responseBody, function (item) {
        //            if (m.url == item['permissionStr']) {
        //              isExist = true;
        //              return false;
        //            }
        //          });
        //          m["show"] = isExist;
        //          if(isExist){
        //            parentShow = true;
        //          }
        //        }
        //
        //      });
        //      //子菜单都为空时,父级菜单不显示
        //      menu["show"] = parentShow;
        //    } else {
        //      var isExist = false;
        //      angular.forEach(data.responseBody, function (item) {
        //        if (menu.url == item['permissionStr']) {
        //          isExist = true;
        //          return false;
        //        }
        //      });
        //      menu["show"] = isExist;
        //    }
        //  });
        //  $scope.pageHeaderMenus = menus;
        //
        //  callback.call();
        //}).error(function (data, status, headers, config) {
        //
        //});

         $scope.pageHeaderMenus = menus;

  });
}]);

