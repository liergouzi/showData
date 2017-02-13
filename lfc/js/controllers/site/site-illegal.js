app.controller('siteIllegalCtrl', ['$scope', '$state', '$rootScope', '$timeout', 'stationService', 'warningService', function ($scope, $state, $rootScope, $timeout, stationService, warningService) {
    var vm = this;
    $scope.initCompany();
    $scope.initDepts();
    $scope.initKpiCategory();
    $rootScope.$settings.layout.pageBodySolid = false;
    ComponentsDateTimePickers.init(); // init
    $scope.sendquest = function () {
        stationService.violation().then(function (res) {
            vm.list = res.data;
        });
    };
    $scope.sendquest();

    //只显示今日违规。
    $scope.selecttoday = function () {
        if ($scope.today) {
            $scope.begintime = new Date().Format("yyyy-MM-dd");
            $scope.endtime = new Date().Format("yyyy-MM-dd");
        } else {
            $scope.begintime = null;
            $scope.endtime = null;
        }
        $scope.click();
    };

    //日期改变时把复选框选择去掉
    $scope.datechange=function () {
        $scope.today=false;
    }

    //查询按钮动作
    $scope.click = function () {
        if ($scope.begintime!=null)
            $scope.time1 = new Date($scope.begintime).Format("yyyy-MM-dd");
        else
            $scope.time1="";
        if ($scope.endtime!=null)
            $scope.time2 = new Date($scope.endtime).Format("yyyy-MM-dd");
        else
            $scope.time2="";
        $scope.select = {
            "begintime": $scope.time1,
            "endtime": $scope.time2,
            "companyId": $scope.companyId,
            "searchKey": $scope.searchKey,
            "categoryId":$scope.categoryId
        };
        stationService.violation($scope.select).then(function (res) {
            vm.list = res.data;
        });
    }

    vm.earlyWarning = function (li) {
        if (li.stationDetails.station.status != 'violation')
            return;
        var params = {
            name: li.stationDetails.leaderName,
            address: li.stationDetails.station.address,
            siteName: li.stationDetails.station.name,
            siteId: li.stationDetails.station.id,
            code: li.stationDetails.station.code,
            rules: []
        };
        angular.forEach(li.lstCatagoryResults, function (x) {
            angular.forEach(x.kpiresults, function (item) {
                params.rules.push({flag: item.kpiContent})
            })
        });
        stationService.illegal(params, function (params) {
            warningService.addWarning(params).then(function (res) {
                if(res.data)
                    $rootScope.alert({
                        title:"提示",
                        subTitle:"操作成功"
                    });
                    $scope.sendquest();
            })
        })
    };
    vm.details = function (id) {
        stationService.illegaldetails(stationService.illegaldetailss(id));
    };
    vm.del = function (id) {
        $rootScope.confirm({
            title: "删除违规",
            placeholder: "请输入删除违规原因",
            Id: "id",
            id: id,
            Content: "delFeason",
            callback: function (params) {
                stationService.delviolation(params).then(function (res) {
                    if(res.data)
                        $rootScope.alert({
                            title:"提示",
                            subTitle:"操作成功"
                        });
                        $scope.sendquest();
                })
            }
        });
    };
    vm.launchTask = function (li) {
        stationService.addTask(li, function (params) {
            stationService.addurgentTask(params).then(function(res){
                if(res.data)
                    $rootScope.alert({
                        title:"提示",
                        subTitle:"操作成功"
                    });
            })
        })
    };
    $scope.$on('ngRepeatFinished', function () {
            var boxRight = $(".custom-tbody .right-box"),
                boxLeft = $(".custom-tbody .left-box");
            for (var i = 0; i < boxRight.length; i++) {
                var leftHeight = boxLeft.eq(i).outerHeight(true),
                    rightHeight = boxRight.eq(i).outerHeight(true);
                if (leftHeight > rightHeight) {
                    boxRight.eq(i).outerHeight(leftHeight)
                } else if (leftHeight < rightHeight) {
                    boxLeft.eq(i).outerHeight(rightHeight)
                }
            }

    });


}]);