/**
 * Created by hxd on 2016/11/29.
 */
app.controller('deptAdminCtrl', ['$scope', '$rootScope', '$uibModal', 'systemService', function ($scope, $rootScope, $uibModal, systemService) {
    var vm=$scope;
    $scope.initRegions();
    $rootScope.$settings.layout.pageBodySolid = false;
    $scope.column = {
        formatter: {
            formatIndex: function (value, row, index) {
                return index + 1;
            },
            formatAction: function (value, row, index) {
                return '<i class="customicon glyphicon glyphicon-plus" style="color: #CD3B35;">&nbsp;添加子部门</i>&nbsp;&nbsp;&nbsp;&nbsp;' +
                    '<i class="customicon glyphicon glyphicon-edit" style="color: #1C9FD8;">&nbsp;修改</i>&nbsp;&nbsp;&nbsp;&nbsp;'+
                    '<i class="customicon glyphicon glyphicon-trash" style="color: #65Be42">&nbsp;删除</i>';
            }
        }, colEvents: {
            operation: {
                'click .glyphicon-plus': function (e, id, row, index) {
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'views/system/dept-modal.html',
                        controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                            $scope.doing="添加部门";
                            $scope.params={
                                "level":0,
                                "parentId":row.id,
                                "parentId_name":row.name
                            }
                            $scope.cancel = function () {
                                $uibModalInstance.dismiss('cancel')
                            };
                            $scope.ok=function () {
                                if (systemService.saveeDept($scope.params)) {
                                    $rootScope.alert({
                                        title: "操作结果", message: "添加成功", callback: function () {
                                            $scope.cancel();
                                            $scope.refresh();
                                        }
                                    })
                                }
                            }
                        }],
                        size: 'md'
                    })
                },
                'click .glyphicon-trash': function (e, id, row, index) {
                    $rootScope.dialog({
                        title: "是否删除", message: "是否对该部门进行删除操作？", callback: function () {
                            if (systemService.delDept(id)) {
                                $rootScope.alert({
                                    title: "操作结果", message: "删除成功", callback: function () {
                                        $scope.refresh();
                                    }
                                })
                            }
                        }
                    })
                },
                'click .glyphicon-edit': function (e, id, row, index) {
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'views/system/dept-modal.html',
                        controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                            $scope.doing="修改部门";
                            $scope.params=row;
                            $scope.cancel = function () {
                                $uibModalInstance.dismiss('cancel')
                            };
                            $scope.ok=function () {
                                if (systemService.updateDept($scope.params)) {
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
                },
            }
        }
    }
}
]);
