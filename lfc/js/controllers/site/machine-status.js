/**
 * Created by 46358 on 2016/11/11.
 */
app.controller('machineStatusCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.$settings.layout.pageBodySolid = false;
    $scope.initDicts('ZDLX');
    $scope.initCompany();

}]);