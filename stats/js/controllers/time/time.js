/**
 * Created by Administrator on 2017/1/19.
 */
/**
 * Created by Administrator on 2017/1/18.
 */
app.controller('DropdownCtrl', ['$scope', '$log', function ($scope, $log) {

}])
app.controller('timeController', ['$scope', '$state','timeService',function ($scope,timeService) {
    $scope.flag=1;
    var tabledata={
        title: '2015年全年销量总计',
        theads: ['第一季度', '第二季度','第三季度','第四季度'],
        navs:['1月','2月','3月','合计','4月','5月','6月','合计','7月','8月','9月', '合计','10月','11月','12月','合计','总计'],
        tbodys :[
            {time: '08:00-08:30', tbodydatas: [111.111, 222.222, 333.122, 401.222, 51.324, 622.122, 672.123, 712.231, 118.213, 222.98, 333.22, 444.331,222.222,123.212,31,32,11122]},
            {time: '08:30-09:00', tbodydatas: [21, 22, 33, 14, 15, 16, 67, 17, 18, 28, 32, 323,122,212,66,77,33155]},
            {time: '09:00-09:30', tbodydatas: [122, 222, 322, 422, 225, 226, 167, 227, 128, 298, 322, 233,322,212,231,232,26055.22]},
        ]
    };
    var obj={
        title: '时间段分布',
        theads: ['第一季度', '第二季度','第三季度','第四季度'],
        navs:['单机店','双机店','合计','单机店','双机店','合计','单机店','双机店','合计','单机店','双机店','合计','单机店','双机店','合计'],
        tbodys :[
            {time: '08:00-08:30', tbodydatas: [123, 1222, 2233,67, 22, 33,22,12,31,1111,2222,199,24124,12321,53324]},
            {time: '08:30-09:00', tbodydatas: [4221, 22, 33,  67, 32, 323,122,212,66,3333,4444,2992,12354,5478,4456]},
            {time: '09:00-09:30', tbodydatas: [3222, 2312, 3213,627, 22, 233,223,234,42,55,12,1993,34534,7565,24325]},
            {time: '09:30-10:00', tbodydatas: [1333, 4123, 1233,617, 222, 323,211,23,63,66,123,93,21314,56345,865645]},
            {time: '10:00-10:30', tbodydatas: [44, 1231, 3123,637,122, 324,657,243,345,77,46,2293,2354345,45678,67822]},
        ]
    };
    // timeService.tableTitle().then(function (res) {
    //     //取出res中的默认的tableTitle
    // });
    // timeService.tableTbody().then(function (res) {
    //     //取出res中的默认的tableTbody，并绘图????
    // });
    init();
    $scope.prevClick=function(thead){
        if($scope.flag==2){
            return;
        }
        $scope.flag=2;
        init();
    }
    $scope.nextClick=function (thead) {
        if($scope.flag==1){
            return;
        }
        $scope.flag=1;
        init();
    }
    //第二次请求的时候
    function init() {
       setTimeout(function () {
           if($scope.flag==1){
               $scope.table=tabledata;
           }else{
               $scope.table=obj;
           }
           if($scope.flag==1){
               oneLine();
           }else{
               Line('quartertable1','单机店',1);
               Line('quartertable2','双机店',2);
               Line('quartertable3','合计',3);
           }
           $('.spinner').css('display','none');
           getclassName();
           $scope.$apply();
           clearopacity();
       },100);
   }
    function clearopacity () {
        var firsttds=$('.firsttd');
        firsttds.find('ul').addClass('first');

        var eachths=$('.eachths');
        eachths.find('ul').addClass('ths');

        $('.filter').mousemove(function () {
            $('.selectinput').css('display','block');
        })
        $('.filter').mouseout(function () {
            $('.selectinput').css('display','none');
        })
        $('.selectinput').click(function(e){
            e.stopPropagation();
        })
        $('.selectinput button').click(function () {
            $('.filter').click();
        })
    }
    //绘制单条线图
    function getXonetitle () {
        var arr = [];
        var tb = $scope.table.tbodys;
        for (var i = 0; i < tb.length; i++) {
            arr.push(tb[i].time);
        }
         return arr;
    }
    function getoneLinedata() {
        var arr=[];
        for (var i = 0; i < $scope.table.tbodys.length; i++) {
            var item=$scope.table.tbodys[i];
            arr.push(item.tbodydatas[item.tbodydatas.length-1]);
        }
        return arr;
    }
    function oneLine() {
        var myChart = echarts.init(document.getElementById('quartertable1'));
        var  option = {
            title: {
                text: $scope.table.title,
                subtext: '单位：万元',
                x:'center',
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:$scope.table.title,
                bottom:20
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '18%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: getXonetitle(),
                axisLabel: {
                    interval: 0,
                    rotate: 45,//倾斜度 -90 至 90 默认为0  
                    margin: 3,
                    textStyle: {
                        color: "#000000"
                    }
                },
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'销量总计',
                    type:'line',
                    data:getoneLinedata()
                },
            ]
        };
        myChart.setOption(option);
    }

    //绘制多条线折线图
    function getmoreLinedata(table,n) {
        var arr=[];
        var allarr=[];
        var array=[];
        var offset=$scope.table.theads.length;
        for (var i = 0; i < $scope.table.tbodys.length; i++) {
            var item=$scope.table.tbodys[i];
            arr.push(item.tbodydatas);
        }
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr[i].length; j++) {
                var resarr=arr[i].slice(0,offset*3);
            }
            allarr.push(resarr);
        }
        //数组中存放第一季度的单机店 第二季度的单机店  有几个offset 创建几个数组
        for (var i = 0; i < offset; i++) {
           var newarr=[];
           for (var j = 0; j < allarr.length; j++) {
               var item=allarr[j];
               for (var c = 0; c < item.length; c++) {
                   if(c/3==i&&table==1){
                       newarr.push(item[c]);
                   }
                   else if((c-1)/3==i&&table==2){
                       newarr.push(item[c]);
                   }
                   else if((c-2)/3==i&&table==3){
                       newarr.push(item[c]);
                   }
               }
           }
            array.push(newarr);
        }
        return array[n];
    }
    function getmoreLineXtitle() {
        var arr=[];
        for (var i = 0; i < $scope.table.tbodys.length; i++) {
            arr.push($scope.table.tbodys[i].time);
        }
        return arr;
    }
    function getmoreLinelegend() {
        var arr=[];
        for (var i = 0; i < $scope.table.theads.length; i++) {
            arr.push($scope.table.theads[i]);
        }
        return arr;
    }
    function getmoreLinename() {
        var arr=[];
        var num=($scope.table.tbodys[0].tbodydatas.length-3)/3;
        for (var i = 0; i < num; i++) {
            arr.push($scope.table.theads[i]);
        }
        return arr;
    }
    function germoreLineseries(table) {
        var array=[];
        for (var i = 0; i < $scope.table.theads.length; i++) {
            var obj={
                name:getmoreLinename()[i],
                type:'line',
                data:getmoreLinedata(table,i)
            }
            array.push(obj);
        }
        return array;
    }
    function Line(id,title,table) {
            var myChart = echarts.init(document.getElementById(id));
            var  option = {
                title: {
                    text: title,
                    subtext: '单位：万元',
                    x:'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:getmoreLinelegend(),
                    bottom:7
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '18%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: getmoreLineXtitle(),
                    axisLabel: {
                        interval: 0,
                        rotate: 45,
                        margin: 3,
                        textStyle: {
                            color: "#000000"
                        }
                    },
                },
                yAxis: {
                    type: 'value'
                },
                series: germoreLineseries(table)
            };
            myChart.setOption(option);
    }
    function getclassName() {
        if($scope.flag==1){
            $scope.className=false;
            $scope.colspan=4;
        }else if($scope.flag==2){
            $scope.className=true;
            $scope.colspan=3;
        }
    }
}]);

