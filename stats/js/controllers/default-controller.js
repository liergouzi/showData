/**
 * Created by Zhx on 2016/11/10.
 */
app.controller('userController', ['$scope', '$state', '$rootScope', 'loginService', 'messageService', '$location', '$uibModal',
    function ($scope, $state, $rootScope, loginService, messageService, $location, $uibModal) {
        $scope.user = {};
        $scope.login = function () {
            if ($scope.user.loginId && $scope.user.password) {
                loginService.login($scope.user)
                    .then(function (res) {
                        if (res && res.data && res.data.logined) {
                            sessionStorage.user = angular.toJson(res.data);
                            $state.go("dashboard", {}, {reload: true});
                            messageService.getmessage().then(function (res) {
                                $rootScope.aa = res.data;
                            })
                        }
                        else {
                            //TODO 失败处理
                            console.info('登录失败');
                            $rootScope.alert({title: '登录错误', message: '登录失败，请重新登录！'});
                        }
                    });
            } else {
                $rootScope.alert({title: '提示', message: '用户名或密码不完整！'});
            }
        };

        $scope.updatepwd = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'views/updatepwd.html',
                controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                    $scope.checkoldpwd = function () {
                        if ($scope.oldpwd.indexOf("/") >= 0)
                            $scope.oldpwdinfo = "密码不能包含特殊符号/。";
                        else
                            $scope.oldpwdinfo = "";
                    }
                    $scope.checknewpwd = function () {
                        if ($scope.newpwd.indexOf("/") >= 0)
                            $scope.newpwdinfo = "密码不能包含特殊符号/。";
                        else
                            $scope.newpwdinfo = "";
                        if ($scope.repeatnewpwd == '' || $scope.repeatnewpwd == $scope.newpwd)
                            $scope.pwdinfo = "";
                        else
                            $scope.pwdinfo = "密码输入不一致";
                    }
                    $scope.checkpwd = function () {
                        if ($scope.repeatnewpwd == '' || $scope.repeatnewpwd == $scope.newpwd)
                            $scope.pwdinfo = "";
                        else
                            $scope.pwdinfo = "密码输入不一致";
                    }
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel')
                    };
                    $scope.ok = function () {
                        loginService.checkPwd({
                            "password": $scope.oldpwd,
                        }).then(function (res) {
                            console.log(res.data);
                            if (res.data) {
                                loginService.updatePwd({
                                    "password": $scope.newpwd,
                                }).then(function (res) {
                                    $rootScope.alert({
                                        title: "操作结果", message: "修改成功,请重新登录。", callback: function () {
                                            $scope.cancel();
                                            delete $rootScope.context.user;
                                            $location.path("/login")
                                        }
                                    })
                                })
                            }else
                                $scope.oldpwdinfo = "旧密码输入错误";
                        })
                    }
                }],
                size: 'md'
            })
        };

        $scope.logout = function () {
            loginService.logout()
                .then(function (res) {
                    if (res.status == 200) {
                        delete sessionStorage.user;
                        $rootScope.alert({
                            title: "提示", message: "注销成功，请重新登录", callback: function () {
                                $location.path("/login")
                            }
                        });
                        // console.log(res);
                    }
                });
        };
    }]);