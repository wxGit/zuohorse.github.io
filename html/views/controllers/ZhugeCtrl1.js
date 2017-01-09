'use strict';

/* Controllers */

app.buildArray = function(name, size) {
    var i, array = [];
    for (i = 1; i <= size; i++){
        array.push({
            text: name + ' ' + i ,
            value: i
        });
    }

    return array;
};

app.controller('sortableController', ['$scope', function( $scope ) {

            'use strict';

            var tmpList = [];

            for (var i = 1; i <= 6; i++){
                tmpList.push({
                    text: 'Item ' + i,
                    value: i
                });
            }

            $scope.list = tmpList;

            $scope.sortingLog = [];

            $scope.sortableOptions = {
                activate: function() {
                    console.log("activate");
                },
                beforeStop: function() {
                    console.log("beforeStop");
                },
                change: function() {
                    console.log("change");
                },
                create: function() {
                    console.log("create");
                },
                deactivate: function() {
                    console.log("deactivate");
                },
                out: function() {
                    console.log("out");
                },
                over: function() {
                    console.log("over");
                },
                receive: function() {
                    console.log("receive");
                },
                remove: function() {
                    console.log("remove");
                },
                sort: function() {
                    console.log("sort");
                },
                start: function() {
                    console.log("start");
                },
                update: function(e, ui) {
                    console.log("update");

                    var logEntry = tmpList.map(function(i){
                        return i.value;
                    }).join(', ');
                    $scope.sortingLog.push('Update: ' + logEntry);
                },
                stop: function(e, ui) {
                    console.log("stop");

                    // this callback has the changed model
                    var logEntry = tmpList.map(function(i){
                        return i.value;
                    }).join(', ');

                    $scope.sortingLog.push('Stop: ' + logEntry);
                }
            };

        }]);

app.controller('connectedController', ['$scope', function( $scope ) {

            $scope.leftArray = app.buildArray('Left', 5);
            $scope.rightArray = app.buildArray('Right', 7);
            $scope.sortableOptions = {
                connectWith: '.connectedItemsExample .list'
            };
        }]);
