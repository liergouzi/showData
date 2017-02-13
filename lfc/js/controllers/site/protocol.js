/**
 * Created by 46358 on 2016/11/21.
 */
app.controller("protocolCtrl",['$scope','$state','$rootScope','stationService',function($scope,$state,$rootScope,stationService){
    $rootScope.$settings.layout.pageBodySolid = false;
    $scope.stationId=$state.params.stationId;
    stationService.getstationDeposit($scope.stationId).then(function (res) {
        $scope.params=res.data;
        console.log($scope.params);
    })
}]);