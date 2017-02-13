/**
 * Created by 46358 on 2016/11/4.
 */
app.controller('consumableCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    var vm = this;
    $rootScope.$settings.layout.pageBodySolid = false;
    $scope.initCompany();
    ComponentsDateTimePickers.init();
}]);