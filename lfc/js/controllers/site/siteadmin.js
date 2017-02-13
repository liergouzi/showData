/**
 * Created by 46358 on 2016/11/1.
 */
app.controller('siteAdminCtrl', ['$scope', '$rootScope','stationService', function($scope, $rootScope,stationService) {
   $rootScope.$settings.layout.pageBodySolid=true;
   stationService.stationAdmin().then(function(res){
      if(res.status==200)
      $scope.params=res.data;
   })
}]);