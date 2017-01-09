'use strict';

/* Controllers */

angular.module('app')
    .controller('ZhugeCtrl', ['$scope', '$localStorage', '$window',
        function( $scope,   $localStorage,   $window ) {

            $scope.uiFilters = {
                settings:{},
                showConTxt:false,
                showDel:false,
                showShaixuan:true
            };

            $scope.uiFilters.clearData = function(){
                $scope.uiFilters.datas = [];

                $scope.uiFilters.showDel = false;

                $scope.uiFilters.showShaixuan = true;
            };

            $scope.getQueryParams = function () {
                console.log('123');
            }


        }]);