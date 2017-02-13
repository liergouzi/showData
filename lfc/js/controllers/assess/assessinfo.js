/**
 * hxd
 */
app.controller('assessinfoCtrl', ['$scope', '$rootScope','assessService', function ($scope, $rootScope,assessService) {
    var vm = this;
    $rootScope.$settings.layout.pageBodySolid = true;
    assessService.getcheckInfo().then(function (res) {
        $scope.params=res.data;


        var option={
            series: [
                {
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center',
                            textStyle:{
                                color:'#000'
                            }
                        },
                        emphasis: {
                            show: false ,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    selectedMode:false,
                    color:['#C0C0C0','#5D36AC'],
                    data:[
                        {value:$scope.params.allStationCount-$scope.params.stationCount, name:' '+$scope.params.stationCount+'家 '},
                        {value:$scope.params.stationCount, name:$scope.params.stationCount+'家'}

                    ]
                }
            ]
        };
        var rs2=$scope.params.average.toFixed(2);
        var option1={
            series: [
                {
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center',
                            textStyle:{
                                color:'#000'
                            }
                        },
                        emphasis: {
                            show: false ,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold',
                            }
                        }
                    },
                    selectedMode:false,
                    color:['#C0C0C0','#E20F5B'],
                    data:[
                        {value:100-$scope.params.average, name:' '+rs2+'分 '},
                        {value:$scope.params.average, name:rs2+'分'}
                    ]
                }
            ]
        };
        echarts.init(document.getElementById("cake")).setOption(option);
        echarts.init(document.getElementById("cake1")).setOption(option1);
    })
}]);