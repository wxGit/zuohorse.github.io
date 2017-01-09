/*angularjs封装echarts*/
var ecList = [];

angular.module('app').directive('eChart', [function ($window) {

    return {
        restrict: 'A',
        scope: true,
        controller: function($scope, $element){
            $scope.chart = echarts.init($element[0], 'macarons');
            
            ecList.push($scope);

            this.getChart = function(){
                return $scope.chart;
            };

            this.showLoading = function (loadingOption) {
                var op = loadingOption || {
                        text : '数据加载中',
                        effect : 'bubble',
                        textStyle : {
                            fontSize : 20
                        }
                    };
                $scope.chart.showLoading(op);
            };

            this.hideLoading = function () {
                $scope.chart.hideLoading();
            };
        },
        link: function ($scope, element, attrs) {
            // 基于准备好的dom，初始化echarts图表
            //$scope.chart = echarts.init(element[0], 'macarons');

            //$(element).find('div').css('width',$('.e-charts').width());

            //监听options变化
            if (attrs.uiOptions) {
                attrs.$observe('uiOptions', function () {
                    // console.log(attrs.uiOptions);
                    $scope.options = $scope.$eval(attrs.uiOptions);
                    if (angular.isObject($scope.options)) {
                        echarts.init(element[0], 'macarons').setOption($scope.options);

                        //解决图表自适应问题
                        window.onresize = function () {
                        	var i = ecList.length;
                        	while(i--){
                        		ecList[i].onResize();
                        	}
                        }
                    }
                }, true);
            }

            $scope.onResize = function() {
                $scope.chart.resize();
            }
            
            setTimeout(function(){
            	$scope.onResize();
            }, 100);
            
            /*$scope.$on('resize', function() {
             $scope.onResize();
             alert(1);
             });*/

            $scope.$on('$destroy', function() {
                window.onresize = null;
            });

            /*angular.element($window).bind('resize', function() {
             $scope.onResize();
             alert(1);
             });*/
        }

    };
}]);