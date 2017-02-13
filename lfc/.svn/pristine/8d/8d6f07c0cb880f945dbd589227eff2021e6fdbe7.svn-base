/**
 * Created by hxd on 2016/11/29.
 */
app.controller('dictionaryAdminCtrl', ['$scope', '$rootScope', 'systemService', '$uibModal', function ($scope, $rootScope, systemService, $uibModal) {
    $rootScope.$settings.layout.pageBodySolid = false;

    $scope.column = {
        formatter: {
            formatIndex: function (value, row, index) {
                return index + 1;
            },
            formatAction: function (value, row, index) {
                return '<i class="customicon glyphicon glyphicon-eye-open" style="color: #1A9ED8;">&nbsp;查看</i>&nbsp;&nbsp;&nbsp;&nbsp;' +
                    '<i class="customicon glyphicon glyphicon-plus" style="color: #CD3B35;">&nbsp;新增内容</i>';
            }
        }, colEvents: {
            operation: {
                'click .glyphicon-eye-open': function (e, id, row, index) {
                    // alert(id);
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'views/system/dict-details-modal.html',
                        controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                            $scope.dictType = row.name;
                            systemService.getDict(id).then(function (res) {
                                $scope.params = res.data;
                                angular.forEach($scope.params, function (data) {
                                    data.edit = 0;
                                });
                            }),
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel')
                                },
                                $scope.delDict = function (rowId) {
                                    $rootScope.dialog({
                                        title: "删除提示", message: "是否对该字典值进行删除，该操作不可撤回。", callback: function () {
                                            if (systemService.delDict($scope.params[rowId].id)) {
                                                $rootScope.alert({
                                                    title: "操作结果", message: "删除成功", callback: function () {
                                                        $scope.params.splice(rowId, 1);
                                                    }
                                                })
                                            }
                                        }
                                    })
                                },
                                $scope.editDict = function (rowId) {
                                    $scope.params[rowId].edit = 1;
                                },
                                $scope.quitedit = function (rowId) {
                                    $scope.params[rowId].edit = 0;
                                },
                                $scope.doedit = function (rowId) {
                                    $scope.params[rowId].edit = 0;
                                    if (systemService.updateDict($scope.params[rowId])) {
                                        $rootScope.alert({
                                            title: "操作结果", message: "修改成功", callback: function () {
                                                vm.refresh();
                                            }
                                        })
                                    }
                                }
                        }],
                        size: 'md'
                    })
                },
                'click .glyphicon-plus': function (e, id, row, index) {
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'views/system/add-dict-modal.html',
                        controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                            $scope.dictType = row.name;
                            var dict = {
                                "dictType": 1,
                                "name": "",
                                "value": "",
                                "parentId": row.id
                            }
                            $scope.params = [];
                            $scope.params[0] = dict;
                            $scope.cancel = function () {
                                $uibModalInstance.dismiss('cancel')
                            }
                            $scope.addRow = function () {
                                var dict1 = {
                                    "dictType": 1,
                                    "parentId": row.id
                                }
                                $scope.params.push(dict1);
                            }
                            $scope.delRow = function (rowid) {
                                if ($scope.params.length > 1) {
                                    $scope.params.splice(rowid, 1);
                                }
                            }
                            $scope.ok = function () {
                                var flag = 0;
                                angular.forEach($scope.params, function (data) {
                                    if (!data.name || !data.value) {
                                        flag = 1;
                                    }
                                });
                                if (flag == 0) {
                                    if (systemService.saveDict($scope.params)) {
                                        $rootScope.alert({
                                            title: "操作结果", message: "添加成功"
                                        })
                                    }
                                }
                                else
                                    $rootScope.alert({
                                        title: "消息提示", message: "填写数据不完整！", callback: function () {
                                            $scope.refresh();
                                        }
                                    });
                            }
                        }],
                        size: 'md'
                    })
                }
            },
        }
    }
}]);
