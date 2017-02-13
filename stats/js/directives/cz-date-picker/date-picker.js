/**
 * Created by 46358 on 2017/1/11.
 */
app.directive('czDatePicker', ["systemService", "$uibModal", function (systemService, $uibModal) {
    return {
        templateUrl: 'js/directives/cz-date-picker/date-picker.html',
        restrict: "EA",
        scope: {
            year: '=',
            month: '=',
            dateFormat: '=',
            ngModel: '=',
            pattern: "@"
        },
        link: function (scope, ele, attrs, modelCtrl) {
            function getDateList(y, m) {
                systemService.getDate(y, m).then(function (res) {
                    scope.caledays = res.data.cells;
                })
            }

            scope.getalink = function (li) {
                //单选
                if (scope.pattern == "odd") {
                    oddClick(li)
                }
                //多选
                if (scope.pattern == "double") {
                    console.log()
                }
            };
            function oddClick(li) {
                var date = {
                    "year": li.solarYear,
                    "month": li.solarMonth,
                    "day": li.solarDay,
                    "lunarYear": li.lunarYear,
                    "lunarMonth": li.lunarMonth,
                    "lunarDay": li.lunarDay
                };
                systemService.dateDetails(date).then(function (res) {
                    var newdate = {
                        day: li.solarDay,
                        description: "测试",
                        holiday: '',
                        month: li.solarMonth,
                        name: "测试",
                        nth: null,
                        ruleType: '',
                        useType: null,
                        week: li.solarDayOfWeek,
                        year: li.solarYear,
                        lunarDay: li.lunarDay,
                        lunarMonth: li.lunarMonth,
                        lunarYear: li.lunarYear
                    };
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'datePicker.html',
                        controller: ['$scope', '$uibModalInstance', '$rootScope', function ($scope, $uibModalInstance, $rootScope) {
                            $scope.params = res.data;
                            console.log(newdate);
                            $scope.cancel = function () {
                                $uibModalInstance.dismiss('cancel');
                            };
                            $scope.ok = function () {
                                newdate.ruleType = $scope.ruleType;
                                newdate.holiday = $scope.holiday;
                                newdate.name = $scope.name;
                                newdate.description = $scope.description;
                                systemService.putWorkDay(newdate).then(function (res) {
                                    $rootScope.alert({
                                        title: "操作结果", message: "添加成功", callback: function () {
                                            $uibModalInstance.dismiss('cancel');
                                            getDateList(li.solarYear,li.solarMonth);
                                        }
                                    })
                                });
                            };
                            $scope.delrules = function (id) {
                                $rootScope.dialog({
                                    title: "是否删除", message: "是否对该规则进行删除操作？", callback: function () {
                                        if (systemService.deleteDate(id)) {
                                            $rootScope.alert({
                                                title: "操作结果", message: "删除成功", callback: function () {
                                                    $uibModalInstance.dismiss('cancel');
                                                    getDateList(li.solarYear,li.solarMonth);
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        }],
                        size: 'md'
                    });
                });
                if (scope.dateFormat == "yyyy-MM-dd") {
                    return scope.ngModel = scope.year + "-" + scope.month + "-" + li.day
                } else if (scope.dateFormat == "dd") {
                    return scope.ngModel = li.day
                } else {
                    throw new Error("暂不支持那么多格式")
                }
            }

            getDateList(scope.year, scope.month);
            scope.$on("changed", function (res) {
                getDateList(res.targetScope.vm.year_selected, res.targetScope.vm.month_selected);
            });
        }
    }
}]);