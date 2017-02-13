/**
 * Created by 46358 on 2016/11/1.
 */
app.controller('siteInquireCtrl', ['$scope', '$rootScope', 'stationService', '$state', '$timeout',
        function ($scope, $rootScope, stationService, $state, $timeout) {
            $rootScope.$settings.layout.pageBodySolid=false;
            ComponentsDateTimePickers.init(); // 初始化日历
            $scope.$on('$data.error', function(event, error){
                //console.info(error);
            });

            $scope.$on('$data.success', function(event, data){
                //console.info(data);
            });
            //
            // $scope.dynColumn = [];
            //
            // $scope.tableOptions = {hide : true};
            //
            // $timeout(function(){
            //     $scope.dynColumn = [{field : 'name', name : '测试1'}, {field : 'address', name : '测试2'}];
            // }, 1500);
            //
            // $scope.$on('$column.repeat.done', function(){
            //     $scope.tableOptions.hide = false;
            // });

            $scope.$on('$table.row.click', function(event, row, field){
                // console.info(field);
                // console.log(event);
                var selection = $scope.getSelectedRowIds();
                //var selection = $scope.delegateHandle('check', 5);
                // console.info(selection);

                /**
                $rootScope.confirm({
                    title : '出错了',
                    message : '您没有登录测试弹出框',
                    callback : function(){
                            console.info('press ok');
                        }
                    });
                 **/

                //$rootScope.prompt({title : '出错了', message : '您没有登录测试弹出框'});
            });

            //console.info($scope);

            $scope.initRegions();
            $scope.initDicts('ZDLX,ZDZT');

            $scope.column ={
                formatter : {
                    formatIndex: function (value, row, index) {
                        return index + 1;
                    },
                    formatAction: function (value, row, index) {
                        return "<a href=\"siteAdmin/siteList/siteDetails?id="+value+"\" class='popup'><span>查看详情</span><i class='customicon glyphicon glyphicon-eye-open' style='color: #1A9ED8;'></i></a>";
                    }
                }
            };
        }]);