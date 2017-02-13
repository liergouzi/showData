/**
 * Created by Administrator on 2017/1/17.
 */
app.controller('DropdownCtrl', ['$scope', '$log', function ($scope, $log) {}]);
app.controller('playController', ['$scope','$rootScope','playService', function ($rootScope, $scope,playService) {
    ComponentsDateTimePickers.init();
    //第一次请求过来table
    //
    // playService.tableTitle().then(function (res) {
    //     //取出res中的默认的tableTitle
    //     console.log(res.data);
    // });
    // playService.tableTbody().then(function (res) {
    //     //取出res中的默认的tableTbody，并绘图????
    //     console.log(res.data);
    // });
    // $('.select').on('click',function () {
    //     var obj=JSON.stringify({startTime:$scope.table.time.startTime,endTime:$scope.table.time.endTime});
    //     playService.selectPlaytable(obj).then(function (res) {
    //         //将res的所有数据渲染出并绘图????
    //         console.log(res.data);
    //     });
    // });
    // //上钻
    // $scope.prevClick=function (target,title) {
    //     var obj=JSON.stringify({target:target,title:title});
    //     playService.upClick(obj).then(function (res) {
    //         console.log(res.data);
    //     });
    // };
    // //下钻
    // $scope.nextClick=function (target,title) {
    //     var obj=JSON.stringify({target:target,title:title});
    //     playService.downClick(obj).then(function (res) {
    //         console.log(res.data);
    //     });
    // };
    // $scope.sortClick=function () {
    //
    // };
    setTimeout(function () {
        $scope.table={
            title: '各彩种时间段销量分析',
            time:{
                startTime:'2015/4/22',
                endTime:'2015/8/3'
            },
            theads: [
                '双色球','3D','快乐8','PK拾','七彩乐','快三'
            ]
        }
        var tablethead = $scope.table.theads;
        $scope.table.navs = [{name:' ',show: 0}];
        for (var i = 0; i < tablethead.length; i++) {
            $scope.table.navs.push({name: '销量', show: 1});
            $scope.table.navs.push({name: '占比', show: 1})
        }
        $scope.table.navs.push({name:' ', show: 0});
    },1000);
    setTimeout(function () {
        $('.spinner').css('display','none');
        $scope.table.tbodys=[
            {time: '第一周', tbodydatas: [100,"10%",311,'13%',115,'11%',167,"22%",181,"12%",233,'20%',1111]},
            {time: '第二周', tbodydatas: [30, "20%", 77,'15%', 66, '22%', 33, '31%', 111, '33%', 22, '11%',2222]},
            {time: '第三周', tbodydatas: [10, "20%", 20,'15%', 30, '22%', 41, '31%', 50, '33%', 22, '11%',2222]},
            {time: '第四周', tbodydatas: [10, "20%", 20,'15%', 30, '22%', 41, '31%', 50, '33%', 22, '11%',2222]},
            {time: '第五周', tbodydatas: [10, "20%", 20,'15%', 30, '22%', 41, '31%', 50, '33%', 22, '11%',2222]},
            {time: '第六周', tbodydatas: [10, "20%", 20,'15%', 30, '22%', 41, '31%', 50, '33%', 22, '11%',2222]},
            {time: '第七周', tbodydatas: [10, "20%", 20,'15%', 30, '22%', 41, '31%', 50, '33%', 22, '11%',2222]},
            {time: '第八周', tbodydatas: [10, "20%", 20,'15%', 30, '22%', 41, '31%', 50, '33%', 22, '11%',2222]}
        ];
        bar();
        pie(0);
        $scope.$apply();
        clearopacity();
    },1000);
    //绘制柱状图
    function bar() {
        var myChart = echarts.init(document.getElementById('alltable-left'));
        var option = {
            title: {
                text: $scope.table.title,
                subtext: '单位：万元',
                x: 'center',
                top:10
            },
            tooltip: {},
            legend: {
                data: $scope.table.theads,
                bottom: 20
            },
            xAxis: {
                data: getXt(),
                axisLabel: {
                    interval: 0,
                    rotate: 45, 
                    margin: 3,
                    textStyle: {
                        color: "#000000"
                    }
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '18%',
                containLabel: true
            },
            yAxis: {},
            series:getdata()
        };
        myChart.setOption(option);
    }
    //绘制饼图
    function pie (table) {
        var myChart = echarts.init(document.getElementById('alltable-right'));
        var option =
            {
                title: {
                    text:$scope.table.title,
                    subtext: '单位：万元',
                    x: 'center',
                    top:10
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient:'vertical',
                    top:'85',
                    right:20,
                    data:$scope.table.theads
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [0, '30%'],
                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        }
                    },
                    {
                        name: $scope.table.title,
                        type: 'pie',
                        radius: ['40%', '55%'],
                        color: ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000', '#4472C4', "#70AD47"],
                        data:getbingdata(table)
                    }
                ]
            };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    function clearopacity  () {
        //修改下拉菜单位置
        var eachths=$('.eachths');
        eachths.find('ul').addClass('ths');
        $(eachths[eachths.length-1]).find('ul').addClass('lastth').removeClass('ths');

        var everytds=$('.everytd');
        everytds.find('ul').addClass('inner');
        $(everytds[everytds.length-2]).find('ul').addClass('last');

        var firsttds=$('.firsttd');
        firsttds.find('ul').addClass('first');

        $('.filter').mousemove(function () {
            $('.selectinput').css('display', 'block');
        });
        $('.filter').mouseout(function () {
            $('.selectinput').css('display', 'none');
        });
        $('.selectinput').click(function (e) {
            e.stopPropagation();
        });
        $('.selectinput button').click(function () {
            $('.filter').click();
        });
        $('.topten').click(function () {
            alert(1);
        });
    }
    function getarr() {
        //获取series中的所有数据
        var arr = [],
            chrldArr = [],
            offset;
        for (var i = 0; i < $scope.table.tbodys.length; i++) {
            offset = Math.floor($scope.table.tbodys[i].tbodydatas.length / 2);
            for (var j = 0; j < $scope.table.tbodys[i].tbodydatas.length - 1; j++) {
                if (j % 2 == 0) {
                    chrldArr.push($scope.table.tbodys[i].tbodydatas[j]);
                }
            }
        }
        for (var c = 0; c < offset; c++) {
            var newArr = [];
            for (var b = 0; b < chrldArr.length; b++) {
                if (b % offset == c) {
                    newArr.push(chrldArr[b])
                }
            }
            arr.push(newArr);
        }
        console.log(arr);
        return arr;
    }
    function getdata () {
        //获取series
        var resarr = [];
        var colorList = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000', '#4472C4', "#70AD47"];
        var data=getarr();
        for (var i = 0; i < data.length; i++) {
            var seriesObj = {
                name: $scope.table.theads[i],
                stack:'tab',
                type: 'bar',
                data: data[i],
                itemStyle: {
                    normal: {
                        color: colorList[i]
                    }
                }
            };
            resarr.push(seriesObj);
        }
        return resarr;
    }
    function getXt() {
        //获取x轴所有元素 返回数组
        var arr = [];
        for (var i = 0; i < $scope.table.tbodys.length; i++) {
            if($scope.table.tbodys[i].time){
                arr.push($scope.table.tbodys[i].time);
            }
        }
        return arr;
    }
    function getbingdata(week) {
        var arr=$scope.table.tbodys[week].tbodydatas;
        var newarr=[];
        var resarr=[];
        for (var i = 0; i < arr.length-1; i++) {
            if(i%2==0){
                newarr.push(arr[i]);
            }
        }
        for (var i = 0; i < newarr.length; i++) {
            var obj={value:newarr[i],name:$scope.table.theads[i]};
            resarr.push(obj);
        }
        return resarr;
    }
}]);

