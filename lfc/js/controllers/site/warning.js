/**
 * Created by 46358 on 2016/11/3.
 */
app.controller('warningCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    var vm = this;
    $rootScope.$settings.layout.pageBodySolid = false;
    ComponentsDateTimePickers.init(); // init todo page
    $scope.initCompany();
    $scope.initDepts();
    $scope.initDicts('YJZT');
}]);