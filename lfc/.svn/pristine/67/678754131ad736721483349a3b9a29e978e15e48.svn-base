/**
 * Created by 46358 on 2017/2/4.
 */
app.controller('periodsCtrl', ['$scope','$uibModal','systemService','$rootScope' ,function ($scope,$uibModal,systemService,$rootScope) {
    var vm=this;
    $scope.debug=true;
    $scope.initYear=new Date().getFullYear();

    vm.turningYear=function(offset){
        $scope.initYear+=offset;
        periodsCatalogue();
    };

    function periodsCatalogue(){
        systemService.periodsCatalogue($scope.initYear).then(function(res){
            vm.year=res.data.plan;
            isdisabled(res.data)
        });
    }
    function isdisabled(y){
        for(var i=0;i<12;i++){
            y.plan[i].disabled=Date.parse(new Date(y.year,i))<Date.parse(new Date)
        }
    }
    periodsCatalogue();
    vm.getDetails=function (m,status){
        if($scope.debug){
                $uibModal.open({
                    animation: true,
                    templateUrl: 'datePicker.html',
                    scope:$scope,
                    controller: ['$scope', '$uibModalInstance', '$rootScope', function ($scope, $uibModalInstance, $rootScope) {
                        $scope.selectDate={
                            year:$scope.initYear,
                            month:m
                        };
                        $scope.status=status;
                        $scope.confirm=function(){
                            $scope.periodsDate.push(new Date(Number($scope.periodsDate[0].substring(0,4)),Number($scope.periodsDate[0].substring(5,7).replace(/-/,'')),1-1).Format('yyyy-MM-dd'));
                            var periods={
                                year:Number($scope.periodsDate[0].substring(0,4)),
                                month:Number($scope.periodsDate[0].substring(5,7).replace(/-/,'')),
                                setDays:$scope.periodsDate
                            };
                            systemService.setPeriods(periods).then(function(res){
                                $rootScope.alert({
                                    title:"提示",
                                    subTitle:"操作成功",
                                    callback:function(){
                                        periodsCatalogue();
                                        $uibModalInstance.dismiss('cancel');
                                    }
                                });
                            })
                        };
                        $scope.cancel=function(){
                            $uibModalInstance.dismiss('cancel');
                        }
                    }],
                    size: 'md'
                });


        }
    };
    vm.batchSetperiods=function(){
        var monthStr;
        angular.forEach(vm.year,function(l){
            if(l.selected)
                monthStr+= ","+l.value;
        });
        systemService.batchSetperiods($scope.initYear,monthStr.replace(/undefined,/,''),vm.count).then(function(res){
            if(res.data){
                $rootScope.alert({
                    title:"提示",
                    subTitle:"操作成功",
                    callback:function(){
                        periodsCatalogue();
                    }
                });
            }
        })
    };

    vm.goDebug=function(){
        $scope.debug?$scope.debug=false:$scope.debug=true
    };


}]);