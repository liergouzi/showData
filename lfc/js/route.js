app.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$locationProvider','$routeProvider', 'ENV',
    function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider, $routeProvider,ENV) {
        var _lazyLoad = function (loaded) {
            return function ($ocLazyLoad) {
                return $ocLazyLoad.load(loaded, {serie: true});
            }
        };
        var rev = 'ver=' + ENV.version;

        $ocLazyLoadProvider.config({
            debug: false,
            events: true
        });

        //更改url格式配置为html5，去掉#号
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/login', {
                templateUrl: "views/login.html?"+rev
            });

        $urlRouterProvider.otherwise('/login');
        $stateProvider
            //.state('login', {
            //    url: "/login",
            //    title:  '登录',
            //    templateUrl: "views/login.html?"+rev,
            //})
            .state('dashboard', {
                url: "/dashboard",
                templateUrl: "views/dashboard/dashboard.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                title:"首页",
                resolve: {
                    loadMyFile: _lazyLoad([
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/dashboard/dashboard.js?'+rev,
                    ])
                }
            })
            .state('article', {
                url: "/dashboard/article?id",
                title:  '信息详情',
                templateUrl: "views/dashboard/article.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/dashboard/article.js?'+rev
                    ])
                }
            })
            .state('siteAdmin', {
                url: "/siteAdmin",
                title:  '站点管理',
                templateUrl: "views/site/siteadmin.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/site/siteadmin.js?'+rev
                    ])
                }
            })
            .state('siteInquire', {
                url: "/siteAdmin/siteList",
                title:  '站点查询',
                templateUrl: "views/site/siteinquire.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        '../assets/pages/scripts/components-date-time-pickers.min.js',
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/site/siteinquire.js?'+rev,
                    ])
                }
            })
            .state('bettingMachine', {
                url: "/siteAdmin/bettingMachine",
                title:  '投注机查询',
                templateUrl: "views/site/betting-machine.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/site/betting-machine.js?'+rev
                    ])
                }
            })
            .state('machineStatus', {
                url: "/siteAdmin/machineStatus",
                title:  '投注机开停机查询',
                templateUrl: "views/site/machine-status.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/site/machine-status.js?'+rev
                    ])
                }
            })
            .state('siteIllegal', {
                url: "/siteAdmin/siteIllegal",
                title:  '站点违规',
                templateUrl: "views/site/site-illegal.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        '../assets/pages/scripts/components-date-time-pickers.min.js',
                        'js/controllers/restController.js?'+rev,
                        'js/directives/carous/carous.js',
                        'js/controllers/site/site-illegal.js?'+rev,
                    ])
                }
            })
            .state('siteSelfCheck', {
                url: "/siteAdmin/siteSelfCheck",
                title:  '站点自查',
                templateUrl: "views/site/site-self-check.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        '../assets/pages/scripts/components-date-time-pickers.min.js',
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/site/site-self-check.js?'+rev,
                    ])
                }
            })
            .state('salesMan', {
                url: "/siteAdmin/salesManList?id&params",
                title:  '销售人员',
                templateUrl: "views/site/salesman.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        '../assets/pages/scripts/components-date-time-pickers.min.js',
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/site/salesman.js?'+rev,
                    ])
                }
            })
            .state('warning', {
                url: "/siteAdmin/warningList",
                title:  '停机预警',
                templateUrl: "views/site/warning.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        '../assets/pages/scripts/components-date-time-pickers.min.js',
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/site/warning.js?'+rev,
                    ])
                }
            })
            .state('warningdo', {
                url: "/siteAdmin/warningdo",
                title:  '停机预警操作',
                templateUrl: "views/site/warningdo.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        '../assets/pages/scripts/components-date-time-pickers.min.js',
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/site/warningdo.js?'+rev,
                    ])
                }
            })
            .state('polling', {
                url: "/siteAdmin/pollingList",
                title:  '巡检督导',
                templateUrl: "views/site/polling.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        '../assets/pages/scripts/components-date-time-pickers.min.js',
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/site/polling.js?'+rev,
                    ])
                }
            })
            .state('supervisor', {
                url: "/siteAdmin/supervisor",
                title:  '巡检督导',
                templateUrl: "views/site/supervisor.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/site/supervisor.js?'+rev,
                    ])
                }
            })
            .state('siteDetails', {
                url: "/siteAdmin/siteList/siteDetails?id",
                title:  '站点详情',
                templateUrl: "views/site/sitedetails.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        'js/controllers/restController.js?'+rev,
                        'js/directives/carous/carous.js',
                        'js/controllers/site/sitedetails.js?'+rev
                    ])
                },
                ncyBreadcrumb: {
                    label: 'siteDetails',
                    parent: 'siteInquire'
                }

            })
            .state('protocol', {
                url: "/siteAdmin/siteList/protocol?stationId",
                title:  '代销协议与押金',
                templateUrl: "views/site/protocol.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/site/protocol.js?'+rev
                    ])
                }
            })
            .state('assessInfo', {
                url: "/assess/assessInfo",
                title:  '考核概况',
                templateUrl: "views/assess/assessinfo.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/assess/assessinfo.js?'+rev
                    ])
                }
            })
            .state('assessList', {
                url: "/assess/assessList",
                title:  '站点考核',
                templateUrl: "views/assess/assessinquire.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        '../assets/pages/scripts/components-date-time-pickers.min.js',
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/assess/assessinquire.js?'+rev
                    ])
                }
            })
            .state('ruleSet', {
                url: "/assess/ruleSet",
                title:  '指标设置',
                templateUrl: "views/assess/ruleset.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        '../assets/pages/scripts/components-date-time-pickers.min.js',
                        'js/plugin/rule/rule-define-constant.js',
                        'js/plugin/rule/rule-define-plugin-angular.js',
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/assess/ruleset.js?'+rev
                    ])
                }
            })

            .state('sales', {
                url: "/sales",
                title:  '销量管理',
                templateUrl: "views/sales/sales.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        '../assets/pages/scripts/components-date-time-pickers.min.js',
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/sales/sales.js?'+rev
                    ])
                }
            })
            .state('salesDetails', {
                url: "/sales/salesDetails",
                title:  '销量详情',
                templateUrl: "views/sales/sales-details.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/sales/sales-details.js?'+rev
                    ])
                }
            })
            //财务管理
            .state('finance', {
                url: "/finance",
                title:  '财务管理',
                templateUrl: "views/finance/finance.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        '../assets/pages/scripts/components-date-time-pickers.min.js',
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/finance/finance.js?'+rev
                    ])
                }
            })
            .state('card', {
                url: "/finance/card",
                title:  '银行卡管理',
                templateUrl: "views/finance/card.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        '../assets/pages/scripts/components-date-time-pickers.min.js',
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/finance/card.js?'+rev
                    ])
                }
            })
            .state('communication', {
                url: "/finance/communicationExpense",
                title:  '通讯费管理',
                templateUrl: "views/finance/communication-expense.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        '../assets/pages/scripts/components-date-time-pickers.min.js',
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/finance/communication.js?'+rev
                    ])
                }
            })
            .state('consumable', {
                url: "/finance/consumableExpense",
                title:  '耗材管理',
                templateUrl: "views/finance/consumable-expense.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        '../assets/pages/scripts/components-date-time-pickers.min.js',
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/finance/consumable.js?'+rev
                    ])
                }
            })
            .state('large', {
                url: "/finance/largeExpense",
                title:  '大额缴纳',
                templateUrl: "views/finance/large-expense.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        '../assets/pages/scripts/components-date-time-pickers.min.js',
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/finance/large.js?'+rev
                    ])
                }
            })
            .state('reward', {
                url: "/finance/rewardSystems",
                title:  '奖惩管理',
                templateUrl: "views/finance/reward-systems.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        '../assets/pages/scripts/components-date-time-pickers.min.js',
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/finance/reward.js?'+rev
                    ])
                }
            })
            .state('risk', {
                url: "/finance/riskExpense",
                title:  '风险金管理',
                templateUrl: "views/finance/risk-expense.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        '../assets/pages/scripts/components-date-time-pickers.min.js',
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/finance/risk.js?'+rev
                    ])
                }
            })

            //系统设置
            .state('userAdmin', {
                url: "/system/userAdmin",
                title:  '人员管理',
                templateUrl: "views/system/useradmin.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        '../assets/pages/scripts/components-date-time-pickers.min.js',
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/system/useradmin.js?'+rev
                    ])
                }
            })
            .state('privilege', {
                url: "/system/userAdmin/privilege?id",
                title:  '权限编辑',
                // params:{id:null},
                templateUrl: "views/system/privilege.html?"+rev,
                controller: "privilegeCtrl",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/system/privilege.js?'+rev
                    ])
                }
            })
            .state('deptAdmin', {
                url: "/system/deptAdmin",
                title:  '机构管理',
                templateUrl: "views/system/deptadmin.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/system/deptadmin.js?'+rev
                    ])
                }
            })
            .state('roleAdmin', {
                url: "/system/roleAdmin",
                title:  '角色管理',
                templateUrl: "views/system/roleadmin.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/system/roleadmin.js?'+rev
                    ])
                }
            })
            .state('dictionaryAdmin', {
                url: "/system/dictionaryAdmin",
                title:  '字典管理',
                templateUrl: "views/system/dictionaryadmin.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/system/dictionaryadmin.js?'+rev
                    ])
                }
            })
            .state('regionAdmin', {
                url: "/system/regionAdmin",
                title:  '区域管理',
                templateUrl: "views/system/regionadmin.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/system/regionadmin.js?'+rev
                    ])
                }
            })
            .state('dateAdmin', {
                url: "/system/dateAdmin",
                title:  '日期设置',
                templateUrl: "views/system/dateadmin.html?"+rev,
                controller: "dateCtrl",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/system/dateadmin.js?'+rev,
                        'js/directives/cz-date-picker/date-picker.js?'+rev
                    ])
                }
            })
            .state('periodsAdmin', {
                url: "/system/periodsAdmin",
                title:  '巡检设置',
                templateUrl: "views/system/periodsadmin.html?"+rev,
                controller: "periodsCtrl",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/system/periodsadmin.js?'+rev,
                        'js/directives/cz-date-picker/date-picker.js?'+rev
                    ])
                }
            })
            //.state('digitalAdmin', {
            //    url: "/system/digitalAdmin",
            //    title:  '数据展示',
            //    templateUrl: "views/system/digitaladmin.html?"+rev,
            //    controller: "digitalController",
            //    controllerAs: "vm",
            //    resolve: {
            //        loadMyFile: _lazyLoad([
            //            'js/controllers/restController.js?'+rev,
            //            'js/controllers/system/digitaladmin.js?'+rev,
            //        ])
            //    }
            //})
            .state('logsAdmin', {
                url: "/system/logsAdmin",
                title:  '日志管理',
                templateUrl: "views/system/logsadmin.html?"+rev,
                controller: "GeneralPageController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        '../assets/pages/scripts/components-date-time-pickers.min.js',
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/system/logsadmin.js?'+rev
                    ])
                }
            })
            .state('404', {
                url: '/404',
                title: '404',
                templateUrl: '404.html',
                //controller: '404Ctrl',
                //controllerAs: 'vm',
                resolve: {
                    loadMyFile: _lazyLoad([
                        //'js/controllers/404Ctrl.js',
                        'css/404.css'
                    ])
                }
            })
            .state('analysisAdmin', {
                url: "/analysis/analysisAdmin",
                title:  '销售分布',
                templateUrl: "views/analysis/analysisinfo.html?"+rev,
                controller: "analysisInfoController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/analysis/analysisinfo.js?'+rev
                    ])
                }
            })
            .state('statisticalAdmin', {
                url: "/analysis/statisticalAdmin",
                title:  '时间纬度分析',
                templateUrl: "views/analysis/statistical.html?"+rev,
                controller: "statisticalController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/analysis/statistical.js?'+rev
                    ])
                }
            })


    }]);



