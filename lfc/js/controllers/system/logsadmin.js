/**
 * Created by hxd on 2016/11/29.
 */
app.controller('logsAdminCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.$settings.layout.pageBodySolid=false;
    ComponentsDateTimePickers.init(); // init
}]);
