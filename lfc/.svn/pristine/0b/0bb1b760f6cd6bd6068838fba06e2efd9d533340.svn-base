/**
 * Created by 46358 on 2016/11/3.
 */
app.controller('pollingCtrl', ['$scope', '$rootScope', 'getSupervisorService','stationService',function ($scope, $rootScope,getSupervisorService,stationService) {
    var vm = this;
    $rootScope.$settings.layout.pageBodySolid = false;
    $scope.initDicts("RWLX,RWZT");
    ComponentsDateTimePickers.init(); // init datepicker
    $scope.column={
        formatter:{
            formatAction:function(id,row){
                if(row.taskCore_status!="AlreadyExecute")
                    return  '<a class="popup"><span>删除</span><i class="customicon glyphicon glyphicon-trash" style="color:#65Be42"></i></a>'
            }
        },
        colEvents:{
            operation:{
                'click .glyphicon-trash': function (e, id,row) {
                    vm.del(id)
                }
            }
        }
    };
    vm.del=function(id){
        $rootScope.confirm({placeholder:"请输入删除任务原因",title:'删除任务',Id:"taskId",Content:"delReason",id:id,
            callback: function(id,params){
                getSupervisorService.delTask(id,params).then(function(res){
                    var msg='';
                    if(res.status==200)
                        msg="删除成功！";
                    else msg="系统错误！";
                    $rootScope.alert({message:msg,callback:function () {
                        $scope.refresh();
                    }})
                })
            }
        })
    };
    vm.add=function(){
        stationService.addTask1(function (params) {
            stationService.addurgentTask(params).then(function(res){
                var msg='';
                if(res.status==200)
                    msg="添加成功！";
                else msg="系统错误！";
                $rootScope.alert({message:msg,callback:function () {
                    $scope.refresh();
                }})
            })
        })
    };
    vm.update=function(){
        $scope.selection=$scope.getSelectedRows();
        $scope.ids=[];
        angular.forEach($scope.selection,function (l) {
            $scope.ids.push(l.taskCoreId)
        })
        Array.prototype.isTrue = function(){
            if(this.length>1){
                var json={
                    taskCore_activeName:this[0].taskCore_activeName,
                    taskCore_type:this[0].taskCore_type
                };
                for(var i = 0; i < this.length; i++){
                    if(!(json.taskCore_activeName==this[i].taskCore_activeName)){
                        return false
                    }
                    if(!(json.taskCore_type==this[i].taskCore_type)){
                        return false
                    }
                }
                return true;
            }else{
                return false
            }
        };
        if($scope.selection.length==1){
            $scope.flag="单";
            getSupervisorService.changetaskModal($scope,getSupervisorService.changetask);
        }
        else if($scope.selection.isTrue()){
            $scope.flag="批量";
            getSupervisorService.changetaskModal($scope,getSupervisorService.changetask);
        }
        else {
            $rootScope.alert({message:"请选择相同任务类型、督导员的任务！",title:"提示"})
        }
    }
    $scope.formatter1 = function (value, row, index) {
        if (value == undefined)
            return value;
        else
            return new Date(value).Format('yyyy-MM-dd');
    };
}]);
