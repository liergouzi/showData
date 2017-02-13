/**
 * Created by 46358 on 2016/11/3.
 */
app.controller('financeCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    var vm = this;
    $rootScope.$settings.layout.pageBodySolid = true;
    ComponentsDateTimePickers.init(); // 初始化日历
    $scope.initDicts('ZDLX');
    $scope.initCompany();
    $scope.initRegions();
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
                color:['#5D36AC','#C0C0C0'],
                data:[
                    {value:1950, name:' 1950家 '},
                    {value:86, name:'1950家'}

                ]
            }
        ]
    };
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
                color:['#E20F5B','#C0C0C0'],
                data:[
                    {value:86, name:' 86家 '},
                    {value:1950, name:'86家'}
                ]
            }
        ]
    };
    echarts.init(document.getElementById("cake")).setOption(option);
    echarts.init(document.getElementById("cake1")).setOption(option1);

}]);