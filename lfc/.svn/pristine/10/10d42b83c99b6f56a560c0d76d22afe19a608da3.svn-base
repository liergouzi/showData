/**
 * Created by 46358 on 2017/1/11.
 */
app.directive('czDatePicker', ["systemService", "$uibModal",'$q', function (systemService, $uibModal,$q) {
    var currentTime={
        year:new Date().getFullYear(),
        month:new Date().getMonth()+1,
        day:new  Date().getDay()
    };
    return {
        templateUrl: 'js/directives/cz-date-picker/date-picker.html',
        restrict: "EA",
        scope: {
            dateFormat: '=',
            year:'=',
            month:'=',
            ngModel: '=',
            pattern: "@",
            select:'='
        },
        link: function (scope, ele, attrs, modelCtrl) {
            scope.dateList = {
                yearList: [],
                monthList: [1,2,3,4,5,6,7,8,9,10,11,12],
                create: function (offset) {
                    for (var i = 0; i < offset; i++) {
                        this.yearList.push(currentTime.year+i);
                    }
                }
            };
            scope.dateList.create(5);
            if(scope.year||scope.month){
                scope.selectDate={
                    month_selected:scope.month,
                    year_selected:scope.year
                };
            }else {
                scope.selectDate={
                    month_selected:currentTime.month,
                    year_selected:currentTime.year
                };
            }
            scope.nextMonth=function(num){
                Number(scope.selectDate.month_selected);
                Number(scope.selectDate.year_selected);
                var newMonth=num+scope.selectDate.month_selected;
                if(newMonth>12){
                    scope.selectDate.year_selected +=1;
                    scope.selectDate.month_selected=1
                }else if(newMonth<1) {
                    if(currentTime.year!=scope.selectDate.year_selected)
                        scope.selectDate.year_selected -=1;
                        scope.selectDate.month_selected=12
                }
                else {
                    scope.selectDate.month_selected=newMonth;
                }
            };



            function getDateList(y, m) {
                if (scope.pattern == "odd") {
                    systemService.getDate(y, m).then(function(res){
                        scope.caledays = res.data.cells;
                    })
                }
                if (scope.pattern == "double") {
                    $q.all([systemService.getDate(y, m),systemService.getPeriods(y,m)]).then(function(res){
                        scope.caledays = res[0].data.cells;

                        var periodsDate=[];
                        for(var i=0;i<res[1].data.length;i++){
                            periodsDate.push(res[1].data[i].endTime.substring(0,10))
                        }
                        if(angular.isArray(periodsDate)){
                            angular.forEach(scope.caledays,function(e){
                                var newDate= new Date(e.solarYear+"-"+ e.solarMonth+"-"+ e.solarDay).Format('yyyy-MM-dd');
                                angular.forEach(periodsDate,function(x){
                                    if(newDate==x){
                                        e.selected=true;
                                    }
                                })
                            });
                        }
                    })
                }
            }
            function cutDate(){
                var dateArr=[];
                angular.forEach(scope.caledays,function(e){
                    if(e.selected){
                        dateArr.push(e.solarYear+"-"+ e.solarMonth+"-"+e.solarDay);
                        scope.ngModel=angular.copy(dateArr);
                    }
                });
            }
            function multipleChoices(e){
                e.selected? e.selected=false: e.selected=true;
                cutDate();
            }
            function singleChoice(li) {
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
                        templateUrl: 'dateAdmin.html',
                        controller: ['$scope', '$uibModalInstance', '$rootScope', function ($scope, $uibModalInstance, $rootScope) {
                            $scope.params = res.data;
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
            scope.getalink = function (li) {
                //单选
                if (scope.pattern == "odd") {
                    singleChoice(li)
                }
                //多选
                if (scope.pattern == "double") {
                    multipleChoices(li);
                }
            };

            //getDateList(scope.selectDate.year_selected, scope.selectDate.month_selected);
            scope.$watch("selectDate", function (res) {
                getDateList(res.year_selected, res.month_selected);
            },true);
        }
    }
}]);