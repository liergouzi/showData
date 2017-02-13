angular.module('czPlugin')
    .constant('pluginRuleDefine',{
        baseUrl : 'js/plugin/rule/template',
        define : [
            {
                name : 'opentime',
                displayName : '开机时间监测指标',
                templateUrl : 'open-time.html',
                controller : ['$scope',
                    function($scope){
                        //console.info('RuleConfigDefine controller');
                        //console.info($scope);
                    }]
            },
            {
                name : 'sales',
                displayName : '销售应缴款监测指标',
                templateUrl : 'sales.html',
                controller : ['$scope',
                    function($scope){
                        //console.info('RuleConfigDefine controller');
                        //console.info($scope);
                    }]
            },
            {
                name : 'checkself',
                displayName : '自查时间监测指标',
                templateUrl : 'checkself.html',
                controller : ['$scope',
                    function($scope){
                        //console.info('RuleConfigDefine controller');
                        //console.info($scope);
                    }]
            },
            {
                name : 'machine',
                displayName : '设备报修监测指标',
                templateUrl : 'machine.html',
                controller : ['$scope',
                    function($scope){
                        //console.info('RuleConfigDefine controller');
                        //console.info($scope);
                    }]
            }
        ]
    }
);