/**
 * Created by 46358 on 2016/11/14.
 */
app.controller('supervisorCtrl', ['$scope', '$rootScope', 'getSupervisorService', '$uibModal', function ($scope, $rootScope, getSupervisorService, $uibModal) {
    var vm = $scope;
    $scope.initDicts('ZGZT,XB,XUELI');
    $scope.initCompany();
    $rootScope.$settings.layout.pageBodySolid = false;
    $scope.column = {
        formatter: {
            formatAction: function () {
                return '<a class="popup"><span>查看详情</span><i class="customicon glyphicon glyphicon-eye-open" style="color: #1A9ED8;"></i></a>' +
                    '<a class="popup"><span>编辑</span><i class="customicon glyphicon glyphicon-edit" style="color: #D64635"></i></a>' +
                    '<a class="popup"><span>删除</span><i class="customicon glyphicon glyphicon-trash" style="color:#65Be42"></i></a>';
            }
        },
        colEvents: {
            operation: {
                'click .glyphicon-eye-open': function (e, id, row, index) {
                    vm.details(id)
                },
                'click .glyphicon-edit': function (e, id, row, index) {
                    $scope.add("修改",row)
                },
                'click .glyphicon-trash': function (e, id, row, index) {
                    vm.del(row.id);
                }
            }
        }
    };

    vm.details = function (id) {
        getSupervisorService.supervisoDetails(getSupervisorService.getSupervisor(id))
    };

    vm.del = function (id) {
        $rootScope.confirm({
            placeholder: "请输入删除督导员原因", title: '删除督导员', Content: "delReason", id: id, Id: "supervisorId",
            callback: function (params) {
                getSupervisorService.delsupervisor(params).then(function (res) {
                    var msg = '';
                    var title = "";
                    if (res.status == 200) {
                        msg = "提示：该删除操作只删除了人员的管理员身份，删除人员请前往“系统设置->人员管理”进行删除!";
                        title = "删除成功！";
                    }
                    else msg = "系统错误！";
                    $rootScope.alert({
                        title: title, message: msg, callback: function () {
                            $scope.refresh();
                        }
                    })
                })
            }
        })
    };

    $scope.add = function (doing,row) {
        $uibModal.open({
            animation: true,
            scope:$scope,
            templateUrl: 'views/site/supervisor-add.html',
            controller: ['$scope', '$uibModalInstance','stationService', function ($scope, $uibModalInstance,stationService) {
                $scope.initCompany();
                $scope.glfw = [];
                $scope.glfw[0] = {
                    "id": "",
                    "name":""
                };
                $scope.doing=doing;
                //初始化数据
                $scope.params={
                    "id":"",
                    "userId":"",
                    "companyId":"",
                    "status":"",
                    "educationalBackground":""
                };
                if(doing=='修改'){
                    $scope.params={
                        "id":row.id,
                        "userId":row.userId,
                        "companyId":row.companyId,
                        "status":row.status,
                        "educationalBackground":row.educationalBackground
                    };
                    $scope.supervisorName=row.user_name;
                    $scope.glfw =row.stations;
                    if($scope.glfw.length==0){
                        $scope.glfw[0] = {
                            "id": "",
                            "name":""
                        };
                    }
                }

                //添加管理范围
                $scope.addRow = function () {
                    var dict1 = {
                        "id": "",
                        "name":""
                    };
                    $scope.glfw.push(dict1);
                }
                $scope.delRow = function (rowid) {
                    if ($scope.glfw.length > 1) {
                        $scope.glfw.splice(rowid, 1);
                    }
                }
                $scope.result = {}
                $scope.showinfo = {};
                //查找站点
                $scope.search1 = function (id) {
                    if ($scope.supervisorName != '') {
                        stationService.stationList({
                            'filter.name$$LIKE': $scope.glfw[id].name,
                            'filter.supervisorId$$NULL':1,
                            sort: "id",
                            order: "asc", start: 0, length: 10000
                        }).then(function (res) {
                            $scope.result['result' + id] = res.data.data;
                            if (!$scope.result['result' + id].length)
                                $scope.showinfo['result' + id] = "没找到相关信息";
                            else
                                $scope.showinfo['result' + id] = "";
                        })
                    } else {
                        $scope.result['result' + id] = "";
                        $scope.showinfo['result' + id]['result' + id] = "";
                    }
                };
                $scope.changeValue1 = function (name, id, index) {
                    // $scope.params.userId=id;
                    $scope.glfw[index].name=name;
                    $scope.glfw[index].id=id;
                    $scope.result['result' + index] = '';
                    $scope.show1['result' + id] = "";
                    $scope.result['result' + index].length = false;
                };


                $scope.show1 = "";
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel')
                };
                //督导员
                $scope.search = function () {
                    if ($scope.supervisorName != '') {
                        getSupervisorService.getNosupervisor({
                            'filter.name$$LIKE': $scope.supervisorName,
                            sort: "id",
                            order: "asc", start: 0, length: 10000
                        }).then(function (res) {
                            $scope.result = res.data.data;
                            if (!$scope.result.length)
                                $scope.show1 = "没找到相关信息";
                            else
                                $scope.show1 = "";
                        })
                    } else {
                        $scope.result = ''
                        $scope.show1 = "";
                    }
                };
                $scope.changeValue = function (name, id) {
                    $scope.supervisorName=name;
                    $scope.params.userId=id;
                    $scope.params.id=id;
                    getSupervisorService.superPerson({
                        'filter.userId': id,
                        sort: "id",
                        order: "asc", start: 0, length: 10000
                    }).then(function (res) {
                        $scope.result = res.data.data;
                        if ($scope.result.length) {
                            $scope.show1 = "已经是督导员,不能重复添加";
                            $scope.result = '';
                        }
                        else {
                            $scope.show1 = "";
                        }
                    })
                    $scope.result.length = false;
                };
                $scope.ok = function () {
                    $scope.params.stations=$scope.glfw;
                    getSupervisorService.addsupervisor($scope.params).then(function (res) {
                        if (res.status == 200) {
                            msg = doing+"成功！!";
                        }
                        else msg = "系统错误！";
                        $rootScope.alert({
                            message: msg, callback: function () {
                                $scope.cancel();
                                vm.refresh();
                            }
                        })
                    })
                };
            }],
            size: 'md'
        })
    }
}]);