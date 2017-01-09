'use strict';

app.controller('BasicResourceCtrl', ['$scope','$modal','dbUtils','$stateParams',function($scope,$modal,dbUtils,$stateParams) {

    //配置查询表单的参数
    $scope.searchForm = {
        params:{},
        form:{
            settings: {
                cols: 2
            },
            fields: [
                {
                    name: "bookType",
                    label: "选择Bucket",
                    type: "select",
                    dataUrl:"../data/bookType.json",
                    valField:"label",
                    placeholder: "请选择Bucket",
                    labelCols: "3"
                },
                {
                    name: "daterange",
                    label: "选择时间范围",
                    type: "dateRange",
                    placeholder: "",
                    labelCols: "3"
                }
            ]
        },
        submitter:function (data) {
            console.log(data);
        }
    };


    var data = [];
    var timer;
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var value = Math.random() * 1000;
    for (var i = 0; i < 1000; i++) {
        data.push(randomData());
    }

    var chart_option = {
        title: {
            left: 'center',
            text: '存储空间'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                var date = new Date(params.name);
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            }
        },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: []
        }]
    };

    monitor();

    function randomData() {
        now = new Date(+now + oneDay);
        value = value + Math.random() * 21 - 10;
        return {
            name: now.toString(),
            value: [
                [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                Math.round(value)
            ]
        }
    }

    function monitor(){

        chart_option.series[0].data = data;

        $scope.chartsOption = chart_option;

    }

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

}]);