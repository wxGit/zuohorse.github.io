/**
 * Created by ziv.hung on 16/2/19.
 */
'use strict';

var uiResourceTreeDirectives = angular.module('db.components.resourceTree', ['dbUtils']);

uiResourceTreeDirectives.uiResourceTreeCaches = {};//机构树数据缓存对象

uiResourceTreeDirectives.directive('uiResourceTree', ['dbUtils', function (dbUtils) {
    //uiResourceTree默认参数,针对settings值
    var options = {
        noCache: false,
        useCheckBox: false
    };

    return {
        restrict: 'E',
        templateUrl: "../resources/templates/uiResourceTree.html",
        //replace: true,
        transclude: true,
        //scope : {
        //    fields:'=fields'
        //},
        controller: ['$scope', '$modal', function ($scope, $modal) {

            if (angular.isUndefined($scope.uiResourceTree)) {
                $scope.uiResourceTree = {settings: {}};
            }

            //替换默认值
            $scope.uiResourceTree.settings = angular.extend({}, options, $scope.uiResourceTree.settings);

            $scope.uiResourceTree.my_tree = {};

            //console.log($scope.uiForm);

            $scope.uiResourceTree.selectResource = function(){
                $scope.showTree = !$scope.showTree;
            }

        }],
        link: function (scope, element, attrs) {
            //console.log("link uiResourceTree")
            //console.log(attrs.fields);   //此处获取到的是字符串

            scope.uiResourceTree.my_tree_handler = function(branch){
                //console.log(branch.label);
                scope.uiForm.formData[JSON.parse(attrs.fields).name] = branch.label;
            }

            dbUtils.get(JSON.parse(attrs.fields).dataUrl, {}, function (data) {
                 //console.log(data);
                 scope.uiResourceTree.my_data = data;
            }, function (res) {
                 console.log(res);
            });

        }
    }
}]);