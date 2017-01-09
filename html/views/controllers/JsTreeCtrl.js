'use strict';

app.controller('JsTreeCtrl', ['$scope','dbUtils',function($scope,dbUtils) {


    $scope.getFile = function (obj) {
        console.log(obj);
    }


    //dbTree 初始化数据
    $scope.dbTree = {settings: {useCheckBox: true, treeScrollHeight: "350px", noCache: true}};

    dbUtils.get('../data/treedata.json', {}, function (data) {
        console.dir(data);

        //initDbResourceTree(data);

    }, function (data) {
        
    });


    $scope.contextMenu = {
        "Menu 1": {
            "label": "Menu 1",
            "action": function(obj) {
                console.log(obj);
                alert("You clicked " + obj.item.label);
            }
        },
        "Menu 2": {
            "label": "Menu 2",
            "action": function(obj) {
                console.log(obj);
                alert("You clicked " + obj.item.label);
            }
        }
    };



    //ngJsTree
    $scope.treeConfig = {
        core : {
            multiple : false,
            animation: true,
            error : function(error) {
                console.error('treeCtrl: error from js tree - ' + angular.toJson(error));
            },
            check_callback : true,
            worker : true
        },
        types : {
            /*default : {
                icon : 'glyphicon glyphicon-flash'
            },
            star : {
                icon : 'glyphicon glyphicon-star'
            },
            cloud : {
                icon : 'glyphicon glyphicon-cloud'
            }*/
        },
        version : 1,
        plugins : ['types','checkbox','contextmenu','sort']
    };

    $scope.ignoreChanges = false;

    $scope.treeData = [
        { id : 'ajson1', parent : '#', text : 'Simple root node', state: { opened: true} },
        { id : 'ajson2', parent : '#', text : 'Root node 2', state: { opened: true} },
        { id : 'ajson3', parent : 'ajson2', text : 'Child 1', state: { opened: true} },
        { id : 'ajson4', parent : 'ajson2', text : 'Child 2' , state: { opened: true}}
    ];

    $scope.readyCB = function() {
        console.info('ready called');
    };

    $scope.createCB = function(e,item) {
        console.info('create_node called');
    };

    $scope.getSelectNodes = function(){
        var selected_nodes = $scope.treeInstance.jstree(true).get_selected();
        console.log(selected_nodes)
    }

    $scope.getThisNode = function (obj) {
        console.log(obj);
    }

    $scope.applyModelChanges = function() {
        return !$scope.ignoreChanges;
    };

    //结束



    //初始化树形结构的数据
    function initDbResourceTree(resourceData) {
        //构造树结构
        //1.查找root
        var root = null;
        angular.forEach(resourceData, function (item) {
            if (angular.isUndefined(item['parentCode']) || !item['parentCode']) {
                root = {text: item['name'], parentCode: item['parentCode'], code: item['code'], attr: item, resourceId: item['id'], opened: true, iconClass: "icon-state-warning", treeId: item['code']};
                return false;
            }
        });
        if (!root) {
            console.log("db-org-tree root is null");
            return;
        }
        //2.递归循环所有节点,将节点加入到父节点当中
        function getChildren(parentCode) {
            var child = [];

            angular.forEach(resourceData, function (item) {
                if (item['parentCode'] == parentCode) {
                    var iconClass = item['isMenu'] == "是" ? 'icon-state-warning' : 'icon-state-success';
                    var o = {text: item['name'], parentCode: item['parentCode'], code: item['code'], attr: item, resourceId: item['id'], children: [], iconClass: iconClass, treeId: item['code'], canSelect: true};
                    child.push(o);
                }
            });
            angular.forEach(child, function (item) {
                item.children = getChildren(item['code']);
            });
            return child;
        }

        //生成树结构数据
        root.children = getChildren(root['code']);
        //渲染树结构
        if ($scope.dbTree) {
            $scope.dbTree.setData([root]);
        } else {
            $scope.dbTree = {
                data: [root]
            }
        }
    }


}]);