app.controller('salesManCtrl', ['$scope', '$state', '$rootScope', 'personService', function ($scope, $state, $rootScope, personService) {
    $rootScope.$settings.layout.pageBodySolid = false;
    ComponentsDateTimePickers.init(); // 初始化日历
    $scope.initDicts('XB,ZGZT');
    $scope.initCompany();
    //过期/未过期
    $scope.changeTime = function () {
        if (!($.isEmptyObject($scope.filter))) {
            delete $scope.filter.certificationEndtime$$LTE;
            delete $scope.filter.certificationEndtime$$GTE;
            $scope.filter[$scope.timeIndex] = new Date().Format("yyyy-MM-dd");
        }
        $scope.filter[$scope.timeIndex] = new Date().Format("yyyy-MM-dd");
    };
    $scope.column = {
        formatter: {
            formatIndex: function (value, row, index) {
                return index + 1;
            },
            formatAction: function (value, row, index) {
                return '<a class="popup"><span>查看</span><i class="customicon glyphicon glyphicon-eye-open" style="color: #1A9ED8;"></i></a>' +
                    '<a class="popup"><span>编辑</span><i class="customicon glyphicon glyphicon-edit" style="color: #D64635"></i></a>' +
                    '<a class="popup"><span>删除</span><i class="customicon glyphicon glyphicon-trash" style="color: #65Be42"></i></a>'
            }
        },
        colEvents: {
            operation: {
                'click .glyphicon-trash': function (e, id, row, index) {
                    $scope.del(id)
                },
                'click .glyphicon-eye-open': function (e, id, row, index) {
                    personService.persondetails($scope, personService.getPerson(id));
                    personService.getPersonScore(id, new Date().Format('yyyy') + "-01-01").then(function (res) {
                        $scope.personScore = res.data;
                        var sum = 15;
                        angular.forEach($scope.personScore, function (data) {
                            sum = sum - data.score;
                        });
                        $scope.sum = sum;
                        $scope.year = new Date().Format('yyyy') - 1;
                    });

                },
                'click .glyphicon-edit': function (e, id, row, index) {
                    $scope.add(row);
                }
            }
        }
    };
    //添加/编辑
    $scope.add = function (params) {
        personService.personnel(params, $scope, function (id, params) {
            personService.addPerson(id, params).then(function (res) {
                if (res.status == 200) {
                    $rootScope.alert({
                        title:"提示",
                        subTitle:"操作成功"
                    });
                    $scope.executeDelegate('refresh')
                }
            })
        })
    };
    $scope.del = function (id) {
        personService.del(id, function (id, params) {
            personService.delPerson(id, params).then(function (res) {
                if (res.status == 200) {
                    $rootScope.alert({
                        title:"提示",
                        subTitle:"操作成功"
                    });
                    $scope.executeDelegate('refresh')
                } else {
                    $rootScope.alert({title: "提示", message: "网络出错"})
                }
            })
        })
    };
    $scope.formatter1 = function (value, row, index) {
        if (value == undefined)
            return value;
        if(new Date(value)>=new Date())
            return '有效';
        else
            return '无效';
    };
}]);