/**
 * Created by hxd on 2016/11/29.
 */
app.controller('roleAdminCtrl', ['$scope', '$rootScope', 'systemService','$uibModal', function ($scope, $rootScope, systemService,$uibModal) {
    var vm = this;
    $rootScope.$settings.layout.pageBodySolid = false;
    $scope.column = {
        formatter: {
            formatIndex: function (value, row, index) {
                return index + 1;
            },
            formatAction: function (value, row, index) {
                return '<i class="customicon glyphicon glyphicon-edit" style="color: #D64635">&nbsp;修改</i>&nbsp;&nbsp;&nbsp;' +
                    '<i class="glyphicon glyphicon-cog" style="color: #1A9ED8;">&nbsp;权限编辑</i>&nbsp;&nbsp;&nbsp;' +
                    '<i class="customicon glyphicon glyphicon-trash" style="color: #65Be42">&nbsp;删除</i>'
            }
        },
        colEvents: {
            operation: {
                'click .glyphicon-trash': function (e, id, row, index) {
                    $scope.delRole(id);
                },
                'click .glyphicon-cog': function (e, id, row, index) {
                    vm.privilege(id);
                },
                'click .glyphicon-edit': function (e, id, row, index) {
                    vm.updateRole(id);
                }
            }
        }
    }

    //删除角色
    $scope.delRole = function (id) {
        $rootScope.dialog({
            title: "是否删除", message: "是否对该角色进行删除操作？", callback: function () {
                if (systemService.delroleDo(id)) {
                    $rootScope.alert({
                        title: "操作结果", message: "删除成功", callback: function () {
                            $scope.refresh();
                        }
                    })
                }
            }
        })
    }

    vm.updateRole = function (id) {
        if(id){
            systemService.getRole(id).then(function (res) {
                $scope.result=res.data;
                vm.role("修改");
            })
        }
    }

    vm.role=function (doing) {
        systemService.addrole(doing,$scope,function (a,params) {
            systemService.roleDo(params).then(function (res) {
                if(res.status==200){
                    $rootScope.alert({
                        title: "操作结果", message:a+"成功", callback: function () {
                            $scope.refresh();
                        }
                    });
                    $scope.refresh();
                }
            })
        });
    }

    vm.privilege=function (roleid) {
        $uibModal.open({
            animation: true,
            templateUrl: 'views/system/privilege-modal.html',
            controller: ['$scope', '$uibModalInstance','systemService', function ($scope, $uibModalInstance,systemService) {
                systemService.getRolePrivilege(roleid).then(function (res) {
                    $scope.params=res.data;
                    console.log($scope.params);
                })
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel')
                }
                $scope.ok=function () {

                    $scope.selected=[];
                    angular.forEach($scope.params,function (data) {
                        angular.forEach(data.privileges, function (d) {
                            if (d.checkflag) {
                                $scope.selected.push(d.code);
                            }
                        })
                    });

                    systemService.setPrivilege(roleid,$scope.selected.toString()).then(function (res) {
                        $rootScope.alert({
                            title: "操作结果", message: "修改成功"
                        });
                        $scope.cancel();
                        vm.refresh();
                    })

                }
            }],
            size: 'lg'
        })
    }

}]);
