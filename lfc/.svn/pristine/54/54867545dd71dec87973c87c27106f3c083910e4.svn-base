/**
 * Created by 46358 on 2016/11/16.
 */
app.controller('ruleSetCtrl', ['$scope', '$rootScope', '$uibModal', 'assessService', function ($scope, $rootScope, $uibModal, assessService) {
    var vm = this;
    $scope.initDicts('JKFS,SYQK')
    $rootScope.$settings.layout.pageBodySolid = false;
    $scope.rulesList = function () {
        assessService.ruleList().then(function (res) {
            vm.list = res.data;
        });
    };
    $scope.rulesList();

    function addrule (okFn, okFn2, params) {
        $uibModal.open({
            backdrop: 'static',
            templateUrl: 'views/assess/rule-modal.html',
            controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                setTimeout(function () {
                    ComponentsDateTimePickers.init()
                }, 50);
                $scope.rule = {
                    sort: 1,
                    content: ""
                };
                $scope.rules = {
                    "sort": 2,          //
                    "judgeMethod": 1 //判断方式
                };
                if ((typeof params == 'object') && !params.id) {
                    params.fn.then(function (res) {
                        $scope.rules = res.data;
                        $scope.rule.name = params.name;
                    });
                }
                else if (params && params.id) {
                    $scope.rule.name = params.name;
                    $scope.rule.shortName = params.shortname;
                    $scope.pageStatus = "新增";
                    $scope.rules.checkCateGoryId = params.id
                }
                $scope.clear = function () {
                    $scope.rules.startDate = ''
                };
                $scope.ok = function () {
                    //console.info($scope.rules);
                    if (okFn && !params) {
                        okFn($scope.rule, function (res) {
                            if (okFn2 && res.data.id) {
                                $scope.rules.checkCateGoryId = res.data;
                                okFn2($scope.rules)
                            }
                        });
                    }
                    else if (okFn2 && !okFn) {
                        okFn2($scope.rules)
                    }
                    $uibModalInstance.close('closed');
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

            }],
            size: 'md'
        })
    }

    vm.add = function () {
        // $rootScope.$settings.layout.pagescoll=true;
        addrule(
            function (params, okfn) {
                assessService.rule(params).then(okfn);
            },
            function (params) {
                assessService.rules(params)
                    .then(function(){
                        $rootScope.alert({
                            title:"提示",
                            subTitle:"操作成功"
                        });
                        $scope.rulesList();
                    }, $rootScope.errorHandler);
            })
    };
    vm.addrules = function (id) {
        addrule(null, function (params) {
            assessService.rules(params)
                .then(function(){
                    $rootScope.alert({
                        title:"提示",
                        subTitle:"操作成功"
                    });
                    $scope.rulesList();
                }, $rootScope.errorHandler);
        }, id)
    };
    vm.updaterules = function (id) {
        addrule(null, function (params) {
            assessService.rules(params)
                .then(function(){
                    $rootScope.alert({
                        title:"提示",
                        subTitle:"操作成功"
                    });
                    $scope.rulesList();
                }, $rootScope.errorHandler);

        }, {fn: assessService.rulesDetails(id.id), name: id.name})
    };
    vm.delrules = function (id, flag) {
        var status = '',
            msg = '';
        if (flag == 'USEFUL') {
            status = 2;
            msg = "停用成功"
        }
        else if (flag == 'HISTORIC') {
            status = 1;
            msg = "启用成功";
        }
        assessService.stoprules(id, status).then(function (res) {
            if (res.status == 200)
                $rootScope.alert({
                    title: "提示", message: msg, callback: function () {
                        $scope.rulesList()
                    }
                });
            else
                $rootScope.alert({
                    title: "提示", message: "系统出错！", callback: function () {
                        $scope.rulesList()
                    }
                })
        })
    };
    $scope.$on('ngRepeatFinished', function () {
        var boxRight = $(".custom-body2 .asRefer"),
            boxLeft = $(".custom-body2 .refer"),
            title = $(".left-title"),
            addtule = $(".rule-btn");
        for (var i = 0; i < boxRight.length; i++) {
            var leftHeight = boxLeft.eq(i).outerHeight(),
                rightHeight = boxRight.eq(i).outerHeight();
            if (leftHeight > rightHeight) {
                boxRight.eq(i).outerHeight(leftHeight)
            }
            if (boxRight.eq(i).children(".widthBox").length >= 0) {
                title.eq(i).css("line-height", boxRight.eq(i).children(".widthBox").eq(0).outerHeight() + "px");
                addtule.eq(i).css("height", (boxRight.eq(i).outerHeight() - boxRight.eq(i).children(".widthBox").eq(0).outerHeight()) + "px");
                if ((boxRight.eq(i).outerHeight() - boxRight.eq(i).children(".widthBox").eq(0).outerHeight()) < 100) {
                    addtule.eq(i).css("height", "100px")
                }
                if (boxRight.eq(i).children(".widthBox").length == 0) {
                    title.eq(i).css("line-height", "50px");
                    addtule.eq(i).css("height", "100px")
                }
            }

        }
    });

}]);