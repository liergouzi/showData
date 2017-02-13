/**
 * Created by Administrator on 2017/1/18.
 */
app.controller('DropdownCtrl', ['$scope', '$log', function ($scope, $log) {

}])
app.controller('statisticalController', ['$scope', '$state', function ($scope, $state) {
    $scope.nextClick = function (e) {
        //上钻下钻  改变视图的代码
        if (e) {
            $scope.base = e;
        }
    };
    $scope.clearopacity= function () {
        var firsttds=$('.firsttd');
        firsttds.find('ul').addClass('first');

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
    setTimeout(function () {
        $scope.clearopacity();
    },200)
    $scope.titles = [
        {name: '时间纬度季度', id: 5},
        {name: '时间纬度年度', id: 6}
    ];
    $scope.base = 5;
    $scope.toggle = function (id) {
        $scope.base = id;
    }
    $scope.quartertables = {
        title: '时间段销量分布',
        theads: [
            {name: '第一季度', alink: '6'},
            {name: '第二季度'},
            {name: '第三季度'},
            {name: '第四季度'},
        ],
        months: [
            {name: '1月'},
            {name: '2月'},
            {name: '3月'},
            {name: '合计'},
            {name: '4月'},
            {name: '5月'},
            {name: '6月'},
            {name: '合计'},
            {name: '7月'},
            {name: '8月'},
            {name: '9月'},
            {name: '合计'},
            {name: '10月'},
            {name: '11月'},
            {name: '12月'},
            {name: '合计'},
            {name: '总计'},
        ],
        tbodys: [
            {
                week: '08:00-08:30',
                one: '307.4577',
                two: '316.7914 ',
                three: '299.8798 ',
                firstsum: '924.1289 ',
                four: '574.1413 ',
                five: '606.0677 ',
                sex: '603.3923 ',
                secendsum: '1783.6014 ',
                seven: '564.8017 ',
                eight: '596.2088 ',
                nine: '593.5770 ',
                thridsum: '1754.5875 ',
                ten: '368.2447 ',
                eleven: '388.7218 ',
                twelve: '387.0058 ',
                fourthsum: '1143.9723 ',
                allsum: '5606.2901 '
            },
            {
                week: '08:30-09:00',
                one: '485.7382',
                two: '500.4841 ',
                three: '473.7663 ',
                firstsum: '1459.9885 ',
                four: '762.5325 ',
                five: '804.9349 ',
                sex: '801.3816 ',
                secendsum: '2368.8490 ',
                seven: '800.3420 ',
                eight: '844.8469 ',
                nine: '841.1174 ',
                thridsum: '2486.3064 ',
                ten: '499.4450 ',
                eleven: '527.2178 ',
                twelve: '524.8905 ',
                fourthsum: '1551.5533 ',
                allsum: '7866.6971 '
            },
            {
                week: '09:00-09:30',
                one: '640.9983',
                two: '660.4575 ',
                three: '625.1997 ',
                firstsum: '1926.6555 ',
                four: '797.6722 ',
                five: '842.0287 ',
                sex: '838.3116 ',
                secendsum: '2478.0125 ',
                seven: '906.1141 ',
                eight: '956.5007 ',
                nine: '952.2783 ',
                thridsum: '2814.8931 ',
                ten: '675.2308 ',
                eleven: '712.7785 ',
                twelve: '709.6321 ',
                fourthsum: '2097.6414 ',
                allsum: '9317.2025 '
            },
            {
                week: '09:30-10:00',
                one: '839.9158',
                two: '865.4137 ',
                three: '819.2145 ',
                firstsum: '2524.5441 ',
                four: '1043.6505',
                five: '1101.6851 ',
                sex: '1096.8218 ',
                secendsum: '3242.1574 ',
                seven: '941.3715 ',
                eight: '993.7186 ',
                nine: '989.3320 ',
                thridsum: '2924.4220 ',
                ten: '774.2236 ',
                eleven: '817.2761 ',
                twelve: '813.6684 ',
                fourthsum: '2405.1681 ',
                allsum: '11096.2915 '
            },
            {
                week: '10:00-10:30',
                one: '957.5525',
                two: '986.6216 ',
                three: '933.9519 ',
                firstsum: '2878.1261 ',
                four: '1057.7064',
                five: '1116.5226 ',
                sex: '1111.5939 ',
                secendsum: '3285.8228 ',
                seven: '1117.6582 ',
                eight: '1179.8082 ',
                nine: '1174.6001 ',
                thridsum: '3472.0666 ',
                ten: '942.5578 ',
                eleven: '994.9710 ',
                twelve: '990.5788 ',
                fourthsum: '2928.1076 ',
                allsum: '12564.1230 '
            },
            {
                week: '10:30-11:00',
                one: '1143.1345',
                two: '1177.8374',
                three: '1114.9599 ',
                firstsum: '3435.9318 ',
                four: '1071.7623 ',
                five: '1131.3601 ',
                sex: '1126.3659 ',
                secendsum: '3329.4882 ',
                seven: '1117.6582 ',
                eight: '1179.8082 ',
                nine: '1174.6001 ',
                thridsum: '3472.0666 ',
                ten: '1114.6178 ',
                eleven: '1176.5988 ',
                twelve: '1171.4048 ',
                fourthsum: '3462.6214 ',
                allsum: '13700.1081 '
            },
            {
                week: '11:00-11:30',
                one: '1230.4494',
                two: '1267.8030',
                three: '1200.1227 ',
                firstsum: '3698.3750 ',
                four: '1149.0697 ',
                five: '1212.9664 ',
                sex: '1207.6119 ',
                secendsum: '3569.6480 ',
                seven: '1230.4818 ',
                eight: '1298.9056 ',
                nine: '1293.1718 ',
                thridsum: '3822.5591 ',
                ten: '1176.5077 ',
                eleven: '1241.9302 ',
                twelve: '1236.4478 ',
                fourthsum: '3654.8857 ',
                allsum: '14745.4679 '
            },
            {
                week: '11:30-12:00',
                one: '1277.7576',
                two: '1316.5473',
                three: '1246.2649 ',
                firstsum: '3840.5697 ',
                four: '1303.6846 ',
                five: '1376.1790 ',
                sex: '1370.1040 ',
                secendsum: '4049.9676 ',
                seven: '1434.9745 ',
                eight: '1514.7696 ',
                nine: '1508.0828 ',
                thridsum: '4457.8268 ',
                ten: '1282.9521 ',
                eleven: '1354.2936 ',
                twelve: '1348.3153 ',
                fourthsum: '3985.5610 ',
                allsum: '16333.9252 '
            },
            {
                week: '12:00-12:30',
                one: '1365.0724',
                two: '1406.5128',
                three: '1331.4277 ',
                firstsum: '4103.0130 ',
                four: '1535.6069 ',
                five: '1620.9979 ',
                sex: '1613.8422 ',
                secendsum: '4770.4470 ',
                seven: '1540.7465 ',
                eight: '1626.4233 ',
                nine: '1619.2437 ',
                thridsum: '4786.4136 ',
                ten: '1445.1283 ',
                eleven: '1525.4880 ',
                twelve: '1518.7539 ',
                fourthsum: '4489.3702 ',
                allsum: '18149.2438 '
            },
            {
                week: '12:30-13:00',
                one: '1530.0173',
                two: '1576.4651',
                three: '1492.3072 ',
                firstsum: '4598.7897 ',
                four: '1641.0261 ',
                five: '1732.2792 ',
                sex: '1724.6323 ',
                secendsum: '5097.9377 ',
                seven: '1576.0039 ',
                eight: '1663.6413 ',
                nine: '1656.2973 ',
                thridsum: '4895.9425 ',
                ten: '1503.0337 ',
                eleven: '1586.6133 ',
                twelve: '1579.6095 ',
                fourthsum: '4669.2565 ',
                allsum: '19261.9263 '
            },
            {
                week: '13:00-13:30',
                one: '1518.5071',
                two: '1564.6055',
                three: '1481.0808 ',
                firstsum: '4564.1934 ',
                four: '1605.8864 ',
                five: '1695.1855 ',
                sex: '1687.7023 ',
                secendsum: '4988.7741 ',
                seven: '1611.2612 ',
                eight: '1700.8592 ',
                nine: '1693.3510 ',
                thridsum: '5005.4714 ',
                ten: '1675.3524 ',
                eleven: '1768.5142 ',
                twelve: '1760.7074 ',
                fourthsum: '5204.5740 ',
                allsum: '19763.0129 '
            },
            {
                week: '13:30-14:00',
                one: '1217.1138',
                two: '1254.0626',
                three: '1187.1158 ',
                firstsum: '3658.2922 ',
                four: '1359.9082 ',
                five: '1435.5290 ',
                sex: '1429.1921 ',
                secendsum: '4224.6293 ',
                seven: '1470.2318 ',
                eight: '1551.9875 ',
                nine: '1545.1365 ',
                thridsum: '4567.3558 ',
                ten: '1630.7978 ',
                eleven: '1721.4822 ',
                twelve: '1713.8829 ',
                fourthsum: '5066.1629 ',
                allsum: '17516.4402 '
            },
            {
                week: '14:00-14:30',
                one: '1173.4564',
                two: '1209.0798',
                three: '1144.5344 ',
                firstsum: '3527.0706 ',
                four: '1324.7684 ',
                five: '1398.4353 ',
                sex: '1392.2621 ',
                secendsum: '4115.4658 ',
                seven: '1258.6877 ',
                eight: '1328.6799 ',
                nine: '1322.8147 ',
                thridsum: '3910.1823 ',
                ten: '1259.4587 ',
                eleven: '1329.4938 ',
                twelve: '1323.6250 ',
                fourthsum: '3912.5774 ',
                allsum: '15465.2961 '
            },
            {
                week: '14:30-15:00',
                one: '1082.4908',
                two: '1115.3527',
                three: '1055.8108 ',
                firstsum: '3253.6543 ',
                four: '1078.7902 ',
                five: '1138.7788 ',
                sex: '1133.7519 ',
                secendsum: '3351.3209 ',
                seven: '1152.9156 ',
                eight: '1217.0262 ',
                nine: '1211.6538 ',
                thridsum: '3581.5955 ',
                ten: '950.0094 ',
                eleven: '1002.8369 ',
                twelve: '998.4100 ',
                fourthsum: '2951.2562 ',
                allsum: '13137.8269 '
            },
            {
                week: '15:00-15:30',
                one: '1052.1689',
                two: '1084.1103',
                three: '1026.2363 ',
                firstsum: '3162.5155 ',
                four: '1008.5107 ',
                five: '1064.5913 ',
                sex: '1059.8918 ',
                secendsum: '3132.9938 ',
                seven: '990.7318 ',
                eight: '1045.8237 ',
                nine: '1041.2071 ',
                thridsum: '3077.7625 ',
                ten: '857.1746 ',
                eleven: '904.8398 ',
                twelve: '900.8455 ',
                fourthsum: '2662.8598 ',
                allsum: '12036.1317 '
            },
            {
                week: '15:30-16:00',
                one: '991.5252',
                two: '1021.6256',
                three: '967.0872 ',
                firstsum: '2980.2379 ',
                four: '973.3710 ',
                five: '1027.4975 ',
                sex: '1022.9618 ',
                secendsum: '3023.8303 ',
                seven: '1011.8862 ',
                eight: '1068.1545 ',
                nine: '1063.4392 ',
                thridsum: '3143.4799 ',
                ten: '950.0094 ',
                eleven: '1002.8369 ',
                twelve: '998.4100 ',
                fourthsum: '2951.2562 ',
                allsum: '12098.8043 '
            },
            {
                week: '16:00-16:30',
                one: '1082.4908',
                two: '1115.3527',
                three: '1055.8108 ',
                firstsum: '3253.6543 ',
                four: '1008.5107 ',
                five: '1064.5913 ',
                sex: '1059.8918 ',
                secendsum: '3132.9938 ',
                seven: '1082.4009 ',
                eight: '1142.5903 ',
                nine: '1137.5465 ',
                thridsum: '3362.5377 ',
                ten: '1104.7340 ',
                eleven: '1166.1653 ',
                twelve: '1161.0175 ',
                fourthsum: '3431.9168 ',
                allsum: '13181.1026 '
            },
            {
                week: '16:30-17:00',
                one: '1173.4564',
                two: '1209.0798',
                three: '1144.5344 ',
                firstsum: '3527.0706 ',
                four: '1227.8108 ',
                five: '1296.0861 ',
                sex: '1290.3647 ',
                secendsum: '3814.2617 ',
                seven: '1267.1776 ',
                eight: '1337.6420 ',
                nine: '1331.7372 ',
                thridsum: '3936.5568 ',
                ten: '1166.6239 ',
                eleven: '1231.4967 ',
                twelve: '1226.0605 ',
                fourthsum: '3624.1811 ',
                allsum: '14902.0702 '
            },
            {
                week: '17:00-17:30',
                one: '1476.6751',
                two: '1521.5035',
                three: '1440.2797 ',
                firstsum: '4438.4583 ',
                four: '1500.4672 ',
                five: '1583.9041 ',
                sex: '1576.9122 ',
                secendsum: '4661.2835 ',
                seven: '1470.2318 ',
                eight: '1551.9875 ',
                nine: '1545.1365 ',
                thridsum: '4567.3558 ',
                ten: '1321.3485 ',
                eleven: '1394.8252 ',
                twelve: '1388.6679 ',
                fourthsum: '4104.8417 ',
                allsum: '17771.9393 '
            },
            {
                week: '17:30-18:00',
                one: '1702.2637',
                two: '1753.9405',
                three: '1660.3083 ',
                firstsum: '5116.5126 ',
                four: '1605.8864 ',
                five: '1695.1855 ',
                sex: '1687.7023 ',
                secendsum: '4988.7741 ',
                seven: '1505.4892 ',
                eight: '1589.2054 ',
                nine: '1582.1901 ',
                thridsum: '4676.8847 ',
                ten: '1733.5165 ',
                eleven: '1829.9127 ',
                twelve: '1821.8348 ',
                fourthsum: '5385.2639 ',
                allsum: '20167.4353 '
            },
            {
                week: '18:00-18:30',
                one: '1685.2774',
                two: '1736.4385',
                three: '1643.7407 ',
                firstsum: '5065.4566 ',
                four: '1680.3967 ',
                five: '1773.8391 ',
                sex: '1766.0087 ',
                secendsum: '5220.2445 ',
                seven: '1752.2907 ',
                eight: '1849.7309 ',
                nine: '1841.5655 ',
                thridsum: '5443.5871 ',
                ten: '1680.2943 ',
                eleven: '1773.7309 ',
                twelve: '1765.9011 ',
                fourthsum: '5219.9263 ',
                allsum: '20949.2145 '
            },
            {
                week: '18:30-19:00',
                one: '1513.0310',
                two: '1558.9631',
                three: '1475.7396 ',
                firstsum: '4547.7337 ',
                four: '1711.3056 ',
                five: '1806.4668 ',
                sex: '1798.4924 ',
                secendsum: '5316.2648 ',
                seven: '1646.5186 ',
                eight: '1738.0771 ',
                nine: '1730.4046 ',
                thridsum: '5115.0003 ',
                ten: '1599.8529 ',
                eleven: '1688.8165 ',
                twelve: '1681.3614 ',
                fourthsum: '4970.0308 ',
                allsum: '19949.0297 '
            },
            {
                week: '19:00-19:30',
                one: '1234.1001',
                two: '1271.5645',
                three: '1203.6835 ',
                firstsum: '3709.3481 ',
                four: '1605.8864 ',
                five: '1695.1855 ',
                sex: '1687.7023 ',
                secendsum: '4988.7741 ',
                seven: '1611.2612 ',
                eight: '1700.8592 ',
                nine: '1693.3510 ',
                thridsum: '5005.4714 ',
                ten: '1414.1833 ',
                eleven: '1492.8223 ',
                twelve: '1486.2324 ',
                fourthsum: '4393.2381 ',
                allsum: '18096.8318 '
            },
            {
                week: '19:30-20:00',
                one: '1025.4978',
                two: '1056.6295',
                three: '1000.2225 ',
                firstsum: '3082.3498 ',
                four: '1430.1877 ',
                five: '1509.7166 ',
                sex: '1503.0522 ',
                secendsum: '4442.9564 ',
                seven: '1364.4597 ',
                eight: '1440.3337 ',
                nine: '1433.9756 ',
                thridsum: '4238.7690 ',
                ten: '950.0094 ',
                eleven: '1002.8369 ',
                twelve: '998.4100 ',
                fourthsum: '2951.2562 ',
                allsum: '14715.3314 '
            },
            {
                week: '20:00-20:30',
                one: '756.2517',
                two: '779.2098 ',
                three: '737.6125 ',
                firstsum: '2273.0740 ',
                four: '1359.9082 ',
                five: '1435.5290 ',
                sex: '1429.1921 ',
                secendsum: '4224.6293 ',
                seven: '1258.6877 ',
                eight: '1328.6799 ',
                nine: '1322.8147 ',
                thridsum: '3910.1823 ',
                ten: '888.1195 ',
                eleven: '937.5055 ',
                twelve: '933.3670 ',
                fourthsum: '2758.9920 ',
                allsum: '13166.8775 '
            },
            {
                week: '20:30-21:00',
                one: '695.6080',
                two: '716.7250 ',
                three: '678.4634 ',
                firstsum: '2090.7964 ',
                four: '1289.6287 ',
                five: '1361.3415 ',
                sex: '1355.3320 ',
                secendsum: '4006.3022 ',
                seven: '1223.4303 ',
                eight: '1291.4620 ',
                nine: '1285.7610 ',
                thridsum: '3800.6534 ',
                ten: '826.2297 ',
                eleven: '872.1741 ',
                twelve: '868.3240 ',
                fourthsum: '2566.7277 ',
                allsum: '12464.4797 '
            },
            {
                week: '21:00-21:30',
                one: '628.9302',
                two: '648.0230 ',
                three: '613.4290 ',
                firstsum: '1890.3822 ',
                four: '1219.3492 ',
                five: '1287.1539 ',
                sex: '1281.4720 ',
                secendsum: '3787.9751 ',
                seven: '1188.1730 ',
                eight: '1254.2441 ',
                nine: '1248.7074 ',
                thridsum: '3691.1244 ',
                ten: '628.2440 ',
                eleven: '663.1790 ',
                twelve: '660.2514 ',
                fourthsum: '1951.6744 ',
                allsum: '11321.1562 '
            },
            {
                week: '21:30-22:00',
                one: '534.9324',
                two: '551.1717 ',
                three: '521.7480 ',
                firstsum: '1607.8520 ',
                four: '1212.3212 ',
                five: '1279.7352 ',
                sex: '1274.0860 ',
                secendsum: '3766.1424 ',
                seven: '1161.3703 ',
                eight: '1225.9510 ',
                nine: '1220.5392 ',
                thridsum: '3607.8606 ',
                ten: '527.0312 ',
                eleven: '556.3380 ',
                twelve: '553.8821 ',
                fourthsum: '1637.2512 ',
                allsum: '10619.1062 '
            },
            {
                week: '合计',
                one: '30321.8704',
                two: '31242.3720',
                three: '29574.5324',
                firstsum: '91138.7747',
                four: '35139.7461',
                five: '37093.7736 ',
                sex: '36930.0283 ',
                secendsum: '109163.5480 ',
                seven: '35257.3577 ',
                eight: '37217.9253 ',
                nine: '37053.6319 ',
                thridsum: '109528.9150 ',
                ten: '30944.9307 ',
                eleven: '32665.6958 ',
                twelve: '32521.4976 ',
                fourthsum: '96132.1241 ',
                allsum: '405963.3618 '
            },
        ]
    };
    $scope.yeartables = {
        title: '时间段销量分布',
        theads: [
            {name: '第一季度'},
            {name: '第二季度'},
            {name: '第三季度'},
            {name: '第四季度'},
        ],
        months: [
            {name: '单机店'},
            {name: '双机店'},
            {name: '合计'},
            {name: '单机店'},
            {name: '双机店'},
            {name: '合计'},
            {name: '单机店'},
            {name: '双机店'},
            {name: '合计'},
            {name: '单机店'},
            {name: '双机店'},
            {name: '合计'},
            {name: '单机店'},
            {name: '双机店'},
            {name: '合计'},
        ],
        tbodys: [
            {
                week: '08:00-08:30',
                firstD: '428.886 ',
                firstS: '495.243 ',
                firstsum: '924.129 ',
                secendD: '945.800 ',
                secendS: '837.802 ',
                secendsum: '1783.601 ',
                thirdD: '852.623 ',
                thirdS: '901.964 ',
                thirdsum: '1754.588 ',
                fourthD: '503.119 ',
                fourthS: '640.853 ',
                fourthsum: '1143.972 ',
                sumD: '2730.428 ',
                sumS: '2875.862 ',
                sumall: '5606.290 '
            },
            {
                week: '08:30-09:00',
                firstD: '709.466 ',
                firstS: '750.522 ',
                firstsum: '1459.988 ',
                secendD: '1041.820 ',
                secendS: '1327.029 ',
                secendsum: '2368.849 ',
                thirdD: '1093.478 ',
                thirdS: '1392.829 ',
                thirdsum: '2486.306 ',
                fourthD: '706.058 ',
                fourthS: '845.495 ',
                fourthsum: '1551.553 ',
                sumD: '3550.821 ',
                sumS: '4315.876 ',
                sumall: '7866.697 '
            },
            {
                week: '09:00-09:30',
                firstD: '869.797 ',
                firstS: '1056.858 ',
                firstsum: '1926.655 ',
                secendD: '1089.830 ',
                secendS: '1388.183 ',
                secendsum: '2478.013 ',
                thirdD: '1237.990 ',
                thirdS: '1576.903 ',
                thirdsum: '2814.893 ',
                fourthD: '875.173 ',
                fourthS: '1222.468 ',
                fourthsum: '2097.641 ',
                sumD: '4072.791 ',
                sumS: '5244.412 ',
                sumall: '9317.203 '
            },
            {
                week: '09:30-10:00',
                firstD: '1110.294 ',
                firstS: '1414.250 ',
                firstsum: '2524.544 ',
                secendD: '1425.901 ',
                secendS: '1816.257 ',
                secendsum: '3242.157 ',
                thirdD: '1286.161 ',
                thirdS: '1638.261 ',
                thirdsum: '2924.422 ',
                fourthD: '1128.847 ',
                fourthS: '1276.321 ',
                fourthsum: '2405.168 ',
                sumD: '4951.203 ',
                sumS: '6145.089 ',
                sumall: '11096.292 '
            },
            {
                week: '10:00-10:30',
                firstD: '1310.709 ',
                firstS: '1567.417 ',
                firstsum: '2878.126 ',
                secendD: '1445.105 ',
                secendS: '1840.718 ',
                secendsum: '3285.823 ',
                thirdD: '1527.015 ',
                thirdS: '1945.052 ',
                thirdsum: '3472.067 ',
                fourthD: '1382.520 ',
                fourthS: '1545.587 ',
                fourthsum: '2928.108 ',
                sumD: '5665.349 ',
                sumS: '6898.774 ',
                sumall: '12564.123 '
            },
            {
                week: '10:30-11:00',
                firstD: '1511.123 ',
                firstS: '1924.809 ',
                firstsum: '3435.932 ',
                secendD: '1464.309 ',
                secendS: '1865.179 ',
                secendsum: '3329.488 ',
                thirdD: '1527.015 ',
                thirdS: '1945.052 ',
                thirdsum: '3472.067 ',
                fourthD: '1593.915 ',
                fourthS: '1868.707 ',
                fourthsum: '3462.621 ',
                sumD: '6096.361 ',
                sumS: '7603.747 ',
                sumall: '13700.108 '
            },
            {
                week: '11:00-11:30',
                firstD: '1671.454 ',
                firstS: '2026.921 ',
                firstsum: '3698.375 ',
                secendD: '1569.931 ',
                secendS: '1999.717 ',
                secendsum: '3569.648 ',
                thirdD: '1681.162 ',
                thirdS: '2141.398 ',
                thirdsum: '3822.559 ',
                fourthD: '1678.473 ',
                fourthS: '1976.413 ',
                fourthsum: '3654.886 ',
                sumD: '6601.020 ',
                sumS: '8144.448 ',
                sumall: '14745.468 '
            },
            {
                week: '11:30-12:00',
                firstD: '1711.537 ',
                firstS: '2129.033 ',
                firstsum: '3840.570 ',
                secendD: '1781.176 ',
                secendS: '2268.792 ',
                secendsum: '4049.968 ',
                thirdD: '1960.552 ',
                thirdS: '2497.275 ',
                thirdsum: '4457.827 ',
                fourthD: '1847.588 ',
                fourthS: '2137.973 ',
                fourthsum: '3985.561 ',
                sumD: '7300.853 ',
                sumS: '9033.072 ',
                sumall: '16333.925 '
            },
            {
                week: '12:00-12:30',
                firstD: '1871.868 ',
                firstS: '2231.145 ',
                firstsum: '4103.013 ',
                secendD: '2098.043 ',
                secendS: '2672.404 ',
                secendsum: '4770.447 ',
                thirdD: '2105.065 ',
                thirdS: '2681.349 ',
                thirdsum: '4786.414 ',
                fourthD: '1974.425 ',
                fourthS: '2514.945 ',
                fourthsum: '4489.370 ',
                sumD: '8049.401 ',
                sumS: '10099.843 ',
                sumall: '18149.244 '
            },
            {
                week: '12:30-13:00',
                firstD: '2112.365 ',
                firstS: '2486.424 ',
                firstsum: '4598.790 ',
                secendD: '2242.073 ',
                secendS: '2855.865 ',
                secendsum: '5097.938 ',
                thirdD: '2153.236 ',
                thirdS: '2742.707 ',
                thirdsum: '4895.943 ',
                fourthD: '2143.541 ',
                fourthS: '2525.716 ',
                fourthsum: '4669.256 ',
                sumD: '8651.214 ',
                sumS: '10610.712 ',
                sumall: '19261.926 '
            },
            {
                week: '13:00-13:30',
                firstD: '2052.241 ',
                firstS: '2511.952 ',
                firstsum: '4564.193 ',
                secendD: '2194.063 ',
                secendS: '2794.711 ',
                secendsum: '4988.774 ',
                thirdD: '2201.406 ',
                thirdS: '2804.065 ',
                thirdsum: '5005.471 ',
                fourthD: '2312.656 ',
                fourthS: '2891.918 ',
                fourthsum: '5204.574 ',
                sumD: '8760.367 ',
                sumS: '11002.646 ',
                sumall: '19763.013 '
            },
            {
                week: '13:30-14:00',
                firstD: '1631.371 ',
                firstS: '2026.921 ',
                firstsum: '3658.292 ',
                secendD: '1857.992 ',
                secendS: '2366.637 ',
                secendsum: '4224.629 ',
                thirdD: '2008.723 ',
                thirdS: '2558.633 ',
                thirdsum: '4567.356 ',
                fourthD: '2228.098 ',
                fourthS: '2838.064 ',
                fourthsum: '5066.163 ',
                sumD: '7726.185 ',
                sumS: '9790.255 ',
                sumall: '17516.440 '
            },
            {
                week: '14:00-14:30',
                firstD: '1551.206 ',
                firstS: '1975.865 ',
                firstsum: '3527.071 ',
                secendD: '1809.982 ',
                secendS: '2305.484 ',
                secendsum: '4115.466 ',
                thirdD: '1719.698 ',
                thirdS: '2190.484 ',
                thirdsum: '3910.182 ',
                fourthD: '1720.752 ',
                fourthS: '2191.826 ',
                fourthsum: '3912.577 ',
                sumD: '6801.637 ',
                sumS: '8663.659 ',
                sumall: '15465.296 '
            },
            {
                week: '14:30-15:00',
                firstD: '1430.957 ',
                firstS: '1822.697 ',
                firstsum: '3253.654 ',
                secendD: '1473.911 ',
                secendS: '1877.410 ',
                secendsum: '3351.321 ',
                thirdD: '1575.186 ',
                thirdS: '2006.410 ',
                thirdsum: '3581.596 ',
                fourthD: '1297.962 ',
                fourthS: '1653.294 ',
                fourthsum: '2951.256 ',
                sumD: '5778.016 ',
                sumS: '7359.811 ',
                sumall: '13137.827 '
            },
            {
                week: '15:00-15:30',
                firstD: '1390.874 ',
                firstS: '1771.641 ',
                firstsum: '3162.515 ',
                secendD: '1377.891 ',
                secendS: '1755.103 ',
                secendsum: '3132.994 ',
                thirdD: '1353.600 ',
                thirdS: '1724.163 ',
                thirdsum: '3077.763 ',
                fourthD: '1171.126 ',
                fourthS: '1491.734 ',
                fourthsum: '2662.860 ',
                sumD: '5293.491 ',
                sumS: '6742.641 ',
                sumall: '12036.132 '
            },
            {
                week: '15:30-16:00',
                firstD: '1310.709 ',
                firstS: '1669.529 ',
                firstsum: '2980.238 ',
                secendD: '1329.881 ',
                secendS: '1693.950 ',
                secendsum: '3023.830 ',
                thirdD: '1382.502 ',
                thirdS: '1760.977 ',
                thirdsum: '3143.480 ',
                fourthD: '1297.962 ',
                fourthS: '1653.294 ',
                fourthsum: '2951.256 ',
                sumD: '5321.054 ',
                sumS: '6777.750 ',
                sumall: '12098.804 '
            },
            {
                week: '16:00-16:30',
                firstD: '1430.957 ',
                firstS: '1822.697 ',
                firstsum: '3253.654 ',
                secendD: '1377.891 ',
                secendS: '1755.103 ',
                secendsum: '3132.994 ',
                thirdD: '1478.844 ',
                thirdS: '1883.694 ',
                thirdsum: '3362.538 ',
                fourthD: '1509.357 ',
                fourthS: '1922.560 ',
                fourthsum: '3431.917 ',
                sumD: '5797.049 ',
                sumS: '7384.054 ',
                sumall: '13181.103 '
            },
            {
                week: '16:30-17:00',
                firstD: '1551.206 ',
                firstS: '1975.865 ',
                firstsum: '3527.071 ',
                secendD: '1569.931 ',
                secendS: '2244.330 ',
                secendsum: '3814.262 ',
                thirdD: '1623.357 ',
                thirdS: '2313.200 ',
                thirdsum: '3936.557 ',
                fourthD: '1593.915 ',
                fourthS: '2030.266 ',
                fourthsum: '3624.181 ',
                sumD: '6338.408 ',
                sumS: '8563.662 ',
                sumall: '14902.070 '
            },
            {
                week: '17:00-17:30',
                firstD: '1952.034 ',
                firstS: '2486.424 ',
                firstsum: '4438.458 ',
                secendD: '2050.032 ',
                secendS: '2611.251 ',
                secendsum: '4661.283 ',
                thirdD: '2008.723 ',
                thirdS: '2558.633 ',
                thirdsum: '4567.356 ',
                fourthD: '1805.309 ',
                fourthS: '2299.532 ',
                fourthsum: '4104.842 ',
                sumD: '7816.099 ',
                sumS: '9955.840 ',
                sumall: '17771.939 '
            },
            {
                week: '17:30-18:00',
                firstD: '2272.697 ',
                firstS: '2843.816 ',
                firstsum: '5116.513 ',
                secendD: '2194.063 ',
                secendS: '2794.711 ',
                secendsum: '4988.774 ',
                thirdD: '2056.894 ',
                thirdS: '2619.991 ',
                thirdsum: '4676.885 ',
                fourthD: '2439.493 ',
                fourthS: '2945.771 ',
                fourthsum: '5385.264 ',
                sumD: '8963.146 ',
                sumS: '11204.289 ',
                sumall: '20167.435 '
            },
            {
                week: '18:00-18:30',
                firstD: '2272.697 ',
                firstS: '2792.760 ',
                firstsum: '5065.457 ',
                secendD: '2242.073 ',
                secendS: '2978.172 ',
                secendsum: '5220.245 ',
                thirdD: '2394.090 ',
                thirdS: '3049.497 ',
                thirdsum: '5443.587 ',
                fourthD: '2354.935 ',
                fourthS: '2864.991 ',
                fourthsum: '5219.926 ',
                sumD: '9263.794 ',
                sumS: '11685.420 ',
                sumall: '20949.215 '
            },
            {
                week: '18:30-19:00',
                firstD: '2112.365 ',
                firstS: '2435.368 ',
                firstsum: '4547.734 ',
                secendD: '2338.093 ',
                secendS: '2978.172 ',
                secendsum: '5316.265 ',
                thirdD: '2249.577 ',
                thirdS: '2865.423 ',
                thirdsum: '5115.000 ',
                fourthD: '2185.820 ',
                fourthS: '2784.211 ',
                fourthsum: '4970.031 ',
                sumD: '8885.855 ',
                sumS: '11063.174 ',
                sumall: '19949.030 '
            },
            {
                week: '19:00-19:30',
                firstD: '1631.371 ',
                firstS: '2077.977 ',
                firstsum: '3709.348 ',
                secendD: '2194.063 ',
                secendS: '2794.711 ',
                secendsum: '4988.774 ',
                thirdD: '2201.406 ',
                thirdS: '2804.065 ',
                thirdsum: '5005.471 ',
                fourthD: '1932.146 ',
                fourthS: '2461.092 ',
                fourthsum: '4393.238 ',
                sumD: '7958.987 ',
                sumS: '10137.845 ',
                sumall: '18096.832 '
            },
            {
                week: '19:30-20:00',
                firstD: '1310.709 ',
                firstS: '1771.641 ',
                firstsum: '3082.350 ',
                secendD: '1954.012 ',
                secendS: '2488.944 ',
                secendsum: '4442.956 ',
                thirdD: '1864.211 ',
                thirdS: '2374.558 ',
                thirdsum: '4238.769 ',
                fourthD: '1297.962 ',
                fourthS: '1653.294 ',
                fourthsum: '2951.256 ',
                sumD: '6426.894 ',
                sumS: '8288.437 ',
                sumall: '14715.331 '
            },
            {
                week: '20:00-20:30',
                firstD: '909.880 ',
                firstS: '1363.194 ',
                firstsum: '2273.074 ',
                secendD: '1857.992 ',
                secendS: '2366.637 ',
                secendsum: '4224.629 ',
                thirdD: '1719.698 ',
                thirdS: '2190.484 ',
                thirdsum: '3910.182 ',
                fourthD: '1213.405 ',
                fourthS: '1545.587 ',
                fourthsum: '2758.992 ',
                sumD: '5700.975 ',
                sumS: '7465.902 ',
                sumall: '13166.877 '
            },
            {
                week: '20:30-21:00',
                firstD: '829.715 ',
                firstS: '1261.082 ',
                firstsum: '2090.796 ',
                secendD: '1761.972 ',
                secendS: '2244.330 ',
                secendsum: '4006.302 ',
                thirdD: '1671.527 ',
                thirdS: '2129.126 ',
                thirdsum: '3800.653 ',
                fourthD: '1128.847 ',
                fourthS: '1437.881 ',
                fourthsum: '2566.728 ',
                sumD: '5392.061 ',
                sumS: '7072.419 ',
                sumall: '12464.480 '
            },
            {
                week: '21:00-21:30',
                firstD: '629.300 ',
                firstS: '1261.082 ',
                firstsum: '1890.382 ',
                secendD: '1665.951 ',
                secendS: '2122.024 ',
                secendsum: '3787.975 ',
                thirdD: '1623.357 ',
                thirdS: '2067.768 ',
                thirdsum: '3691.124 ',
                fourthD: '621.500 ',
                fourthS: '1330.174 ',
                fourthsum: '1951.674 ',
                sumD: '4540.108 ',
                sumS: '6781.048 ',
                sumall: '11321.156 '
            },
            {
                week: '21:30-22:00',
                firstD: '505.044 ',
                firstS: '1102.808 ',
                firstsum: '1607.852 ',
                secendD: '1656.349 ',
                secendS: '2109.793 ',
                secendsum: '3766.142 ',
                thirdD: '1613.722 ',
                thirdS: '1994.138 ',
                thirdsum: '3607.861 ',
                fourthD: '334.003 ',
                fourthS: '1303.248 ',
                fourthsum: '1637.251 ',
                sumD: '4109.119 ',
                sumS: '6509.987 ',
                sumall: '10619.106 '
            },
            {
                week: '合计',
                firstD: '40082.8331',
                firstS: '51055.941',
                firstsum: '91138.7747',
                secendD: '48010.1284',
                secendS: '61153.4196',
                secendsum: '109163.5480',
                thirdD: '48170.8168',
                thirdS: '61358.0981',
                thirdsum: '109528.9150',
                fourthD: '334.003 ',
                fourthS: '53853.2159',
                fourthsum: '96132.1241',
                sumD: '178542.6865',
                sumS: '227420.6752',
                sumall: '405963.3618'
            },
        ]
    }
    $scope.getdata = function (tablename) {
        var arrone = [], arrsome = [], arrred = [], arrblue = [], arrall = [], arrtuo = [], arrsum = [], tbconut = [];
        var th = $scope[tablename].theads;
        var tb = $scope[tablename].tbodys;
        tbconut = tb.concat();
        if (tablename == 'daytables') {
            tbconut.pop();
        }
        for (var i = 0; i < tbconut.length; i++) {
            var item = tb[i];
            arrone.push(item.Sales);
            arrsome.push(item.Dsales);
            arrred.push(item.redsales);
            arrblue.push(item.bulesales);
            arrall.push(item.Qsales);
            arrtuo.push(item.Tsales);
            arrsum.push(item.weeksum);
        }
        var seriesarr = [arrone, arrsome, arrred, arrblue, arrall, arrtuo, arrsum];
        var resarr = [];
        var colorList = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000', '#4472C4', "#70AD47"];
        for (var i = 0; i < th.length; i++) {
            var seriesObj = {
                name: th[i].name,
                stack: 'tab',
                type: 'bar',
                data: seriesarr[i],
                itemStyle: {
                    normal: {
                        color: colorList[i]
                    }
                }
            }
            resarr.push(seriesObj);
        }
        return resarr;
    }
    $scope.getXtitle = function (tablename) {
        var arr = [];
        var tb = $scope[tablename].tbodys;
        for (var i = 0; i < tb.length-1; i++) {
            arr.push(tb[i].week);
        }
        return arr;
    }
    $scope.setZhexian = function (argument) {
        var yearFirstDanArr=[],yearSecentDanArr=[],yearThirdDanArr=[],yearFourthDanArr=[];
        var tbs=$scope.yeartables.tbodys;
        if(argument=='dan'){
            for (var i = 0; i < tbs.length-1; i++) {
                yearFirstDanArr.push(tbs[i].firstD);
                yearSecentDanArr.push(tbs[i].secendD);
                yearThirdDanArr.push(tbs[i].thirdD);
                yearFourthDanArr.push(tbs[i].fourthD);
            }
            return [yearFirstDanArr,yearSecentDanArr,yearThirdDanArr,yearFourthDanArr];
        }else if(argument=='shuang'){
            for (var i = 0; i < tbs.length-1; i++) {
                yearFirstDanArr.push(tbs[i].firstS);
                yearSecentDanArr.push(tbs[i].secendS);
                yearThirdDanArr.push(tbs[i].thirdS);
                yearFourthDanArr.push(tbs[i].fourthS);
            }
            return [yearFirstDanArr,yearSecentDanArr,yearThirdDanArr,yearFourthDanArr];
        }else if(argument=='all'){
            for (var i = 0; i < tbs.length-1; i++) {
                yearFirstDanArr.push(tbs[i].firstsum);
                yearSecentDanArr.push(tbs[i].secendsum);
                yearThirdDanArr.push(tbs[i].thirdsum);
                yearFourthDanArr.push(tbs[i].fourthsum);
            }
            return [yearFirstDanArr,yearSecentDanArr,yearThirdDanArr,yearFourthDanArr];
        }else{}
    }
    //绘制第五个图
    $scope.eacharQuartertable = function () {
        var myChart = echarts.init(document.getElementById('quartertable'));
        function getQuarterdata(){
            var quarterArr=[];
            var tbs=$scope.quartertables.tbodys;
            for (var i = 0; i < tbs.length-1; i++) {
                quarterArr.push(tbs[i].allsum)
            }
            return quarterArr;
        }
        var  option = {
            title: {
                text: '2015年全年销量总计',
                subtext: '单位：万元',
                x:'center',
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['2015年全年销量总计'],
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
                data: $scope.getXtitle('quartertables'),
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
                    data:getQuarterdata()
                },
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    $scope.eacharQuartertable();
    //绘制第六个图 单机店
    $scope.eacharYearDantable= function () {
        var myChart = echarts.init(document.getElementById('YearDantable'));
        var  option = {
            title: {
                text: '单机店',
                subtext: '单位：万元',
                x:'center'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['第一季度','第二季度','第三季度','第四季度'],
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
                data: $scope.getXtitle('yeartables'),
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
                    name:'第一季度',
                    type:'line',
                    data:$scope.setZhexian('dan')[0]
                },
                {
                    name:'第二季度',
                    type:'line',
                    data:$scope.setZhexian('dan')[1]
                },
                {
                    name:'第三季度',
                    type:'line',
                    data:$scope.setZhexian('dan')[2]
                },
                {
                    name:'第四季度',
                    type:'line',
                    data:$scope.setZhexian('dan')[3]
                },
            ]
        };
        myChart.setOption(option);
    }
    $scope.eacharYearDantable();
    //绘制第七个图 双机店
    $scope.eacharYearDoutable= function () {
        var myChart = echarts.init(document.getElementById('YearDoutable'));
        var  option = {
            title: {
                text: '双机店',
                subtext: '单位：万元',
                x:'center'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['第一季度','第二季度','第三季度','第四季度'],
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
                data: $scope.getXtitle('yeartables'),
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
            series: [
                {
                    name:'第一季度',
                    type:'line',
                    data:$scope.setZhexian('shuang')[0]
                },
                {
                    name:'第二季度',
                    type:'line',
                    data:$scope.setZhexian('shuang')[1]
                },
                {
                    name:'第三季度',
                    type:'line',
                    data:$scope.setZhexian('shuang')[2]
                },
                {
                    name:'第四季度',
                    type:'line',
                    data:$scope.setZhexian('shuang')[3]
                },
            ]
        };
        myChart.setOption(option);
    }
    $scope.eacharYearDoutable();
    //绘制第八个图 合计
    $scope.eacharYearAlltable= function () {
        var myChart = echarts.init(document.getElementById('YearAlltable'));
        var  option = {
            title: {
                text: '合计',
                x:'center'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['第一季度','第二季度','第三季度','第四季度'],
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
                data: $scope.getXtitle('yeartables'),
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
            series: [
                {
                    name:'第一季度',
                    type:'line',
                    data:$scope.setZhexian('all')[0]
                },
                {
                    name:'第二季度',
                    type:'line',
                    data:$scope.setZhexian('all')[1]
                },
                {
                    name:'第三季度',
                    type:'line',
                    data:$scope.setZhexian('all')[2]
                },
                {
                    name:'第四季度',
                    type:'line',
                    data:$scope.setZhexian('all')[3]
                },
            ]
        };
        myChart.setOption(option);
    }
    $scope.eacharYearAlltable();
}]);

