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
            .when('/playAdmin', {
                templateUrl: "views/play/play.html?"+rev
            });

        $urlRouterProvider.otherwise('/play/playAdmin');
        $stateProvider
            .state('404', {
                url: '/404',
                title: '404',
                templateUrl: '404.html',
                resolve: {
                    loadMyFile: _lazyLoad([
                        'css/404.css'
                    ])
                }
            })
            .state('playAdmin', {
                url: "/play/playAdmin",
                title:  '玩法分析',
                templateUrl: "views/play/play.html?"+rev,
                controller: "playController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        '../assets/pages/scripts/components-date-time-pickers.min.js',
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/play/play.js?'+rev
                    ])
                }
            })
            .state('timeAdmin', {
                url: "/time/timeAdmin",
                title:  '时间分析',
                templateUrl: "views/time/time.html?"+rev,
                controller: "timeController",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        'js/controllers/restController.js?'+rev,
                        'js/controllers/time/time.js?'+rev
                    ])
                }
            })
    }]);



