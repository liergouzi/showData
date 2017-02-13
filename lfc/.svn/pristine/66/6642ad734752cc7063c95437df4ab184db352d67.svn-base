/**
 * Created by 46358 on 2016/11/21.
 */
app.controller("assessInquireCtrl", ['$scope', "getSupervisorService", '$rootScope', function ($scope, $getSupervisorService, $rootScope) {
    $rootScope.$settings.layout.pageBodySolid = false;
    ComponentsDateTimePickers.init();
    $scope.initDicts('ZDLX');
    $scope.initCompany();
    $scope.dynColumn = [];
    $getSupervisorService.getDynColumn().then(function (res) {
        $scope.dynColumn = res.data;
    });
    $scope.tableOptions = {hide: true};

    $scope.$on('$column.repeat.done', function () {
        $scope.tableOptions.hide = false;
    });
    $scope.formatter1 = function (value, row, index) {
        if (value == undefined)
            return value;
        else
            return new Date(value).Format('yyyy-MM-dd');
    };
}]);