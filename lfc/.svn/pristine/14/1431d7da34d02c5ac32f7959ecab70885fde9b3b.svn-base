/**
 * Created by 46358 on 2017/2/6.
 */
app.controller('privilegeCtrl', ['$scope', '$rootScope', 'systemService', '$uibModal', '$state', function ($scope, $rootScope, systemService, $uibModal, $state) {
    var vm = this;
    vm.userId = $state.params.id;
    console.log(vm.userId)

    systemService.loadUserWithRole(vm.userId).then(function (res) {
        $scope.params = res.data;
    })

    $scope.changeRole = function (id) {
        angular.forEach($scope.params.roles, function (data) {
            if (data.roleId==id) {
                if(data.checkflag){
                    systemService.setUserRole(vm.userId,data.roleId,"add").then(function (res) {
                        if(res){
                            systemService.loadUserWithRole(vm.userId).then(function (res) {
                                $scope.params = res.data;
                            })
                        }
                    });
                }else
                    systemService.setUserRole(vm.userId,data.roleId,"del").then(function (res) {
                        if(res){
                            systemService.loadUserWithRole(vm.userId).then(function (res) {
                                $scope.params = res.data;
                            })
                        }
                    });
            }
        });
    };

    $scope.changePrivilege = function (id) {
        vm.setprivilege($scope.params.privileges.private,id);
        vm.setprivilege($scope.params.privileges.public,id);
    };

    vm.setprivilege=function (dataArray,id) {
        angular.forEach(dataArray, function (data) {
            angular.forEach(data.privileges, function (d) {
                if (d.privilegeId == id) {
                    if (d.checkflag) {
                        systemService.setUserPrivilege(vm.userId, d.privilegeId, "add").then(function (res) {
                            if (res) {
                                systemService.loadUserWithRole(vm.userId).then(function (res) {
                                    $scope.params = res.data;
                                })
                            }
                        });
                    } else
                        systemService.setUserPrivilege(vm.userId, d.privilegeId, "del").then(function (res) {
                            if (res) {
                                systemService.loadUserWithRole(vm.userId).then(function (res) {
                                    $scope.params = res.data;
                                })
                            }
                        });
                }
            })
        });
    }

}]);