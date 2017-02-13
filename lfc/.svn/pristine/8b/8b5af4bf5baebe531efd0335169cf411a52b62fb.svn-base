app.controller('articleCtrl', ['$scope', '$rootScope', 'indexService', '$state', function ($scope, $rootScope, indexService, $state) {
    $rootScope.$settings.layout.pageBodySolid = false;
    $scope.userId = $state.params.id;
    indexService.getarticle($scope.userId).then(function (res) {
        $scope.params = res.data;
        var content = $scope.params.content;
        $('.body').html(content);
    })
}]);