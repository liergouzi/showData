/**
 * Created by hxd on 2016/11/29.
 */
app.controller('regionAdminCtrl', ['$scope', '$rootScope', '$uibModal', 'systemService', '$TreeDnDConvert', '$http', function ($scope, $rootScope, $uibModal, systemService, $TreeDnDConvert, $http) {
    var vm = $scope,
        tree;
    $scope.my_tree = tree = {};
    $rootScope.$settings.layout.pageBodySolid = false;

    $scope.my_tree.remove = function (row) {
        $rootScope.dialog({
            title: "是否删除", message: "是否对该区县进行删除操作？", callback: function () {
                if (systemService.delRegion(row.id)) {
                    $rootScope.alert({
                        title: "操作结果", message: "删除成功", callback: function () {
                            $scope.my_tree.remove_node(row);
                            $scope.refresh();
                        }
                    })
                }
            }
        })

    };
    $http.get("/lfc/lfc/rest/region?_method=get&sort=level").then(function (res) {
        $scope.tree_list = $TreeDnDConvert.line2tree(res.data.data, 'id', 'parentId');
        console.log($scope.tree_list)
    });
    $scope.add=function(row){
        $uibModal.open({
            animation: true,
            templateUrl: 'views/system/region-modal.html',
            controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                $scope.doing="添加";
                $scope.params = {
                    "level": row.level + 1,
                    "parentId": row.id,
                    "showOrder": 0,
                    "parentId_name": row.name
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel')
                };
                $scope.ok = function () {
                    if (systemService.saveRegion($scope.params)) {
                        $rootScope.alert({
                            title: "操作结果", message: "添加成功"
                        });
                        $scope.cancel();
                        vm.refresh();
                    }
                }
            }],
            size: 'md'
        })
    }
    $scope.update=function(row){
        $uibModal.open({
            animation: true,
            templateUrl: 'views/system/region-modal.html',
            controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                $scope.doing="修改";
                $scope.params = row;
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel')
                };
                $scope.ok = function () {
                    if (systemService.updateRegion($scope.params)) {
                        $rootScope.alert({
                            title: "操作结果", message: "修改成功"
                        });
                        $scope.cancel();
                        vm.refresh();
                    }
                }
            }],
            size: 'md'
        })
    };

    $scope.expanding_property = {
        field: 'name',
        cellClass:   'v-middle',
        displayName: '区域名称'
    };
    $scope.col_defs_table = [
        {
            field: 'shortName',
            titleStyle:  {
                'width': '80pt'
            },
            titleClass:  'text-center',
            cellClass:   'v-middle text-center',
            displayName: '区域简称'
        },
       {
            titleClass:  'text-center',
            displayName:  '操作',
            cellTemplate: '<i class="customicon glyphicon glyphicon-plus" ng-click="add(node)" style="color: #CD3B35;">&nbsp;添加子区域</i>&nbsp;&nbsp;&nbsp;&nbsp;' +
            '<i class="customicon glyphicon glyphicon-edit" ng-click="update(node)" style="color: #1C9FD8;">&nbsp;修改</i>&nbsp;&nbsp;&nbsp;&nbsp;' +
            '<i class="customicon glyphicon glyphicon-trash" ng-click="tree.remove(node)" style="color: #65Be42">&nbsp;删除</i>'
        }];



}
]);
