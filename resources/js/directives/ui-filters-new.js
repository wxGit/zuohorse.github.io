/**
 * Created by ziv.hung on 16/2/19.
 */
'use strict';

var uiFiltersDirectives = angular.module('db.components.uiFiltersNew', ['dbUtils']);

uiFiltersDirectives.uiFiltersCaches = {};//机构树数据缓存对象

uiFiltersDirectives.directive('uiFiltersNew', ['dbUtils','$timeout','$window', function (dbUtils,$timeout,$window) {
    //uiFilters默认参数,针对settings值
    var options = {

    };

    return {
        restrict: 'E',
        templateUrl: "../resources/templates/uiFiltersNew.html",
        replace: true,
        transclude: true,
        controller: ['$scope', '$modal','$http', function ($scope, $modal,$http) {

            if (angular.isUndefined($scope.uiFilters)) {
                $scope.uiFilters = {settings: {}};
            }

            //替换默认值
            $scope.uiFilters.settings = angular.extend({}, options, $scope.uiFilters.settings);

            var uiFilterSettings = $scope.uiFilters.settings;

            //弹出添加条件界面
            $scope.uiFilters.addFilter = function (fieldName) {
                var instance = $modal.open({
                    controller: ['$scope', '$modalInstance','$http','$timeout', 'field', uiFiltersCtrl],
                    templateUrl: 'uiFiltersModal_tpl.html',
                    size: "lg",
                    backdrop: "static",
                    resolve: {
                        field: function () {
                            return {"name": fieldName};
                        }
                    }
                });

                instance.result.then(function (item) {
                    console.log(item);
                    $scope.uiFilters.datas = item;

                    $scope.uiFilters.showConTxt = true;

                    $scope.uiFilters.showDel = true;

                    $scope.uiFilters.showShaixuan = false;

                });
            }

            function uiFiltersCtrl($scope, $modalInstance,$http,$timeout, field) {

                //$scope.uiFilters = {settings:uiFilterSettings};

                var relation = {};
                var construct = [];
                //获取数据
                $http.get('../data/query.json',{}).success(function (res) {
                    var oneSelect = res["fileds"];

                    relation = {
                        showOrlabel:true,
                        oneSelect:angular.copy(oneSelect),
                        oneSelectModal:null,
                        twoSelect:null,
                        twoSelectModal:null,
                        three:{
                            condModal1:null,
                            condModal2:null,
                            date:{
                                startDate:null,
                                endDate:null
                            },
                            num:{
                                startNum:0,
                                endNum:0
                            }
                        }
                    };

                    var a = angular.copy(relation);
                    a["showOrlabel"]=false;
                    construct =
                        {
                            showAndlabel:true,
                            relation:[
                                a
                            ]
                        };
                    var  b = angular.copy(construct);
                    b["showAndlabel"]=false;
                    var con = [];
                    con.push(b);
                    $scope.construct = con;

                }).error(function (res) {

                });


                $scope.onOneSelect = function(relation,item){
                    console.log(item);
                    relation["twoSelectModal"] = undefined;
                    relation["three"]=null;
                    var conditions = item["conditions"];
                    $timeout(function(){
                        relation["twoSelect"]=conditions;
                        $scope.$apply();
                    },0)
                };

                $scope.onTwoSelect = function(relation,item){
                    console.log(item);
                    item["condModal1"]=item["value"];
                    item["condModal2"]=null;
                    relation.three=item;
                };

                $scope.addOrBar = function (obj) {
                    obj.push(angular.copy(relation));
                };
                
                $scope.addAndBar = function (obj) {
                    obj.push(angular.copy(construct));
                }

                $scope.removeGroup = function (parr,pobj,arr,obj) {

                    var pIndex = parr.indexOf(pobj);
                    var oIndex = arr.indexOf(obj);

                    if(parr.length > 1){
                        parr.splice(pIndex, 1);
                    }else if(arr.length > 1){
                        arr.splice(oIndex, 1);
                    }

                    /*if(arr.length > 1){
                        arr.splice(oIndex, 1);
                    }else{
                        return;
                    }*/

                }

                //确定按钮事件
                $scope.closeModal = function () {

                    angular.forEach($scope.construct,function (val,i) {

                        angular.forEach(val.relation, function (v,j) {
                            if(v.three.date){
                                v.three.date.startDate = formatDate(v.three.date.startDate)
                                v.three.date.endDate = formatDate(v.three.date.endDate)
                                //console.log(v.three.date.startDate,v.three.date.endDate);
                            }
                        })

                    })

                    function formatDate(stamp){
                        var date = new Date(stamp);
                        var Y = date.getFullYear() + '-';
                        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                        var D = date.getDate() + ' ';
                        var h = date.getHours() + ':';
                        var m = date.getMinutes() + ':';
                        var s = date.getSeconds();

                        return Y+M+D;
                    }

                    $modalInstance.close($scope.construct);

                };

                //关闭modal
                $scope.modalClose = function () {
                    $modalInstance.dismiss("cancel");
                };

            }

        }],
        link: function (scope, element, attrs,controller) {
            console.log("linked ui-filters");
            $timeout(
                function () {
                    var $ = $window.jQuery;
                    if ($().daterangepicker) {
                        $('.date-picker').daterangepicker({
                            locale:{
                                applyLabel: '确认',
                                cancelLabel: '取消',
                                fromLabel: '从',
                                toLabel: '到',
                                weekLabel: 'W',
                                customRangeLabel: 'Custom Range',
                                daysOfWeek:["日","一","二","三","四","五","六"],
                                monthNames: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                            },
                            'showDropdowns':false,
                            'applyClass':'btn-success sure'
                        });
                    }
                },
                100
            );
        }
    }

}]);