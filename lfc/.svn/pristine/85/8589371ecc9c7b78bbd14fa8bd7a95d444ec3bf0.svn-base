/**
 * Created by 46358 on 2016/11/3.
 */
app.controller('warningdoCtrl', ['$scope', '$rootScope','warningService', function ($scope, $rootScope,warningService) {
    var vm = this;
    $rootScope.$settings.layout.pageBodySolid = false;
    ComponentsDateTimePickers.init(); // init
    $scope.initDicts('YJZT');
    $scope.initCompany();
    $scope.initDepts();

    $scope.column ={
        formatter : {
            formatIndex: function (value, row, index) {
                return index + 1;
            },
            formatAction: function (value, row, index) {
                return "<a class='popup'><span>停机</span><i class='glyphicon glyphicon-off' title='停机' style='color:#CB4737;'></i></a>&nbsp;" +
                        "<a class='popup'><span>拒绝</span><i class='glyphicon glyphicon-ban-circle' title='拒绝' style='color:#61B640;'></i></a>";
            }
        },
        colEvents : {
            operation: {
                'click .glyphicon-off': function (e, id, row, index) {
                    $scope.stopMachine(id);
                },
                'click  .glyphicon-ban-circle': function (e, id, row, index) {
                    //拒绝操作
                    $scope.refuse(id);
                }
            }
        }
    };


    //拒绝停机操作
    $scope.refuse= function(id){
        $rootScope.confirm({placeholder:"请输入删除任务原因",title:'删除任务',Id:"id",Content:"refuseReason",id:id,
            callback:function (id,params) {
                warningService.refuseWarningDo(id,params).then(function(res){
                    var msg='';
                    if(res.status==200)
                        msg="拒绝成功！";
                    else msg="系统错误！";
                    $rootScope.alert({message:msg,callback:function () {
                        $scope.refresh();
                    }})
                })
            }

        })
    };


    //站点进行停机操作
    $scope.stopMachine=function (id) {
        $rootScope.dialog({title:"是否停机",message:"是否对该站点进行停机操作，该操作不可撤回。",callback:function () {
            if(warningService.stopmachine($scope,id)){
                $rootScope.alert({title:"操作结果",message:"停机成功",callback:function () {
                    $scope.refresh();
                }})
            }
        }})
    }
}]);