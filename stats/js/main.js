'use strict';

if (typeof $ === 'undefined') {
    throw new Error('请先加载jQuery');
}
var app = angular.module('LFCAdmin', [
    //'ngStorage',
    //'ngCookies',

    "ui.router",
    "ngRoute",
    "ui.bootstrap",
    'ntt.TreeDnD',
    "oc.lazyLoad",
    "ngSanitize",
    'czPlugin',


    //'mgcrea.ngStrap',
    //'ngMessages'
]);

app.constant('ENV', {
    version: '1.0',
    name: 'production',
    debug: true,
    api: '/lfc/lfc'
});

app.factory('settings', ['$rootScope', '$uibModal', function ($rootScope, $uibModal) {
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pagescoll: false,
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: '../assets',
        globalPath: '../assets/global',
        layoutPath: '../assets/layouts/layout'
    };
    $rootScope.settings = settings;

    $rootScope.alert = function (items) {
        var modalInstance = $uibModal.open({
            backdrop: 'static',
            keyboard: false,
            templateUrl: 'appModalAlertCtrl.html',
            controller: 'appModalCtrl',
            // size: 'sm',
            resolve: {
                items: function () {
                    return items;
                }
            }
        });
    };

    $rootScope.dialog = function (items) {
        var modalInstance = $uibModal.open({
            backdrop: 'static',
            keyboard: false,
            templateUrl: 'appModalDialogCtrl.html',
            controller: 'appModalCtrl',
            // size: 'sm',
            resolve: {
                items: function () {
                    return items;
                }
            }
        });
    };

    $rootScope.confirm = function (items) {
        var modalInstance = $uibModal.open({
            backdrop: 'static',
            keyboard: false,
            templateUrl: 'appModalConfirmCtrl.html',
            controller: 'appModalCtrl',
            // size: 'sm',
            resolve: {
                items: function () {
                    return items;
                }
            }
        });
    };

    $rootScope.prompt = function (items) {
        var modalInstance = $uibModal.open({
            backdrop: 'static',
            keyboard: false,
            templateUrl: 'appModalPromptCtrl.html',
            controller: 'appModalCtrl',
            // size: 'sm',
            resolve: {
                items: function () {
                    return items;
                }
            }
        });
    };

    $rootScope.errorHandler = function (e) {
        var msg = '';
        if (typeof e == 'string') {
            msg = e;
        }
        else if (e && e.error) {
            msg = e.msg;
        } else if (e.msg) {
            msg = e.msg;
        }
        else {
            if (e) msg = e.toString();
        }
        console.error('错误：' + msg);
    };

    $rootScope.errFormValidator = function (form) {
        if (form && form.$invalid) {
            $.each(form.$error, function (type, value) {
                var input = $('form[name="' + form.$name + '"] [name="' + value[0].$name + '"]');
                var cnname = "";
                var ps = input.parents(".form-group");
                if (!ps || !ps[0]) {
                    var tds = input.parents("tr").children("td");
                    if (tds && tds.length > 0) {
                        for (var i in tds) {
                            if (cnname !== "")
                                break;
                            var fc = $(tds[i]).find(".form-control");
                            if (fc && fc.length > 0) {
                                for (var pos = 0; pos < fc.length; ++pos) {
                                    if ($(fc[pos]).attr('name') == value[0].$name) {
                                        cnname = $(tds[i - 1])[0].innerText;
                                        if (cnname && cnname.indexOf('*') != -1) {
                                            cnname = cnname.replace('*', '');
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    var label = ps.children("label");
                    if (!label || !label[0]) {
                        label = ps.children("div .textright");
                    }
                    if (label && label.length == 1) {
                        cnname = label.text();
                        if (cnname && cnname.indexOf('*') != -1) {
                            cnname = cnname.replace('*', '');
                        }
                    } else {
                        label && label.length > 1
                    }
                    {
                        var is = ps.find(".form-control");
                        for (var pos = 0; pos < label.length; ++pos) {
                            if ($(is[pos]).attr('name') == value[0].$name) {
                                cnname = $(label[pos]).text();
                                if (cnname && cnname.indexOf('*') != -1) {
                                    cnname = cnname.replace('*', '');
                                }
                                break;
                            }
                        }
                    }
                }

                var errMsg = "";
                if (type == 'required')
                    errMsg = "没有值，请输入或选择值";
                else if (type == 'minlength')
                    errMsg = '长度不对，最少' + input.attr('ng-minlength');
                else if (type == 'maxlength')
                    errMsg = '长度不对，最多' + input.attr('ng-maxlength');
                else if (type == 'min')
                    errMsg = '大小不对，最小' + input.attr('ng-min');
                else if (type == 'max')
                    errMsg = '大小不对，最大' + input.attr('ng-max');
                else if (type == 'ngtype' && _ngtype_errmsgs[input.attr('ngtype')])
                    errMsg = _ngtype_errmsgs[input.attr('ngtype')];
                else
                    errMsg = '没有值，或者长度，或者大小等有误';
                $rootScope.alert({
                    title: '输入有误！',
                    subTitle: cnname,
                    message: errMsg,
                    callback: function () {
                        input[0].focus();
                    }
                });
                return false;
            });
            return true;
        }
        return false;
    };

    $rootScope.initFormValidator = function ($s, formName) {
        $("form[name='" + formName + "'] textarea,select,input").each(function () {
            var pName = $(this).attr("name");
            if (!pName || pName === '')
                return;
            var div = $(this).parent("div");
            var p = div.children(".validate");
            if (!p || !p[0]) {
                var v = "";
                var count = 0;
                var n = formName + '.' + pName + '.$dirty && ' + formName + '.' + pName + '.$error.';
                if (typeof($(this).attr("ng-required")) != "undefined") {
                    count++;
                    v += '<font color="red" ng-show="' + n + 'required">请输入或选择内容</font>';
                }
                if (typeof($(this).attr("ng-minlength")) != "undefined") {
                    count++;
                    v += '<font color="red" ng-show="' + n + 'minlength">长度不对，最少' + $(this).attr('ng-minlength') + '</font>';
                }
                if (typeof($(this).attr("ng-maxlength")) != "undefined") {
                    count++;
                    v += '<font color="red" ng-show="' + n + 'maxlength">长度不对，最多' + $(this).attr('ng-maxlength') + '</font>';
                }
                if (typeof($(this).attr("ng-min")) != "undefined") {
                    count++;
                    v += '<font color="red" ng-show="' + n + 'min">大小不对，最小' + $(this).attr('ng-min') + '</font>';
                }
                if (typeof($(this).attr("ng-max")) != "undefined") {
                    count++;
                    v += '<font color="red" ng-show="' + n + 'max">大小不对，最大' + $(this).attr('ng-max') + '</font>';
                }
                if (count > 0) {
                    div.append('<p class="validate">' + v + '</p>');
                }
                $compile(div.children(".validate")[0])($s);
            }
        });
    };

    return settings;
}]);

app.factory('httpInterceptor', ["$q", "$rootScope", 'ENV', function ($q, $rootScope, ENV) {
    return {
        request: function (config) {

            //设置调试参数
            //config.debug = ENV.debug;

            if (true === config.block || 'true' === config.block)
                uiBlock();
            checkGlobalSettingsUser();
            if (config.pres) {
                try {
                    doCallbackFunction(config.pres, config.data);
                } catch (e) {
                    console.log(e);
                    $rootScope.alert({title: '出错了', message: _errorPrompt});
                    uiUnblock();
                    $q.reject(config);
                }
            }
            // rest 风格整形
            if (!config.url) {
                if (config.action)
                    config.url = config.action;
                else if (config.rest)
                    config.url = "/rest/" + config.rest;
            }
            if (('GET' == config.method || 'get' == config.method) && !config.data) { // && !config.params
                config.method = 'GET';
            } else if (!('POST' == config.method || 'post' == config.method)) {
                if (config.url) {
                    if (('DELETE' == config.method || 'delete' == config.method) && config.data) {
                        if (Object.prototype.toString.call(config.data) === "[object]") {
                            config.url += ("/" + config.data['id']);
                        } else {
                            config.url += ("/" + config.data);
                        }
                    }
                    config.url += config.url.indexOf('?') > 0 ? "&" : "?";
                    config.url += ("_method=" + config.method.toUpperCase());
                } else {
                    return $q.reject(request);
                }
                if (!config.headers['Content-Type'])
                    config.headers['Content-Type'] = "application/json;charset=UTF-8";
                config.method = 'POST';
            }
            config.url = checkUrl4AppPath(config.url);
            // 加密传输，不能加密queryString，只加密config.data
            var requestCrypt = false;
            var responseCrypt = false;
            if (secureRequired(config.secure)) {
                var noHtml = !(new RegExp(".html$").test(config.url));
                var cType = config.headers['Content-Type'];
                requestCrypt = noHtml && !(cType && cType.indexOf('application/x-www-form-urlencoded') >= 0);
                responseCrypt = noHtml && config.headers.Accept.indexOf('application/json') >= 0;
            }
            config.headers['Encrypt-Requ'] = requestCrypt;
            config.headers['Encrypt-Resp'] = responseCrypt;
            var secureData = encryptRequest(config.data, requestCrypt, responseCrypt);
            config.data = secureData.data;
            config.secureKey = secureData.keys;
            if (secureData.headers.encrypt_key)
                config.headers['Encrypt-Key'] = secureData.headers.encrypt_key;
            if (secureData.headers.encrypt_iv)
                config.headers['Encrypt-Iv'] = secureData.headers.encrypt_iv;
            if (secureData.headers.encrypt_u)
                config.headers['Encrypt-U'] = secureData.headers.encrypt_u;

            return config;
        },
        response: function (response) {
            //调试
            if ('true' == response.config.debug) {
                console.log('Took ' + (new Date().getTime() - response.config.requestTimestamp) + ' millis.');
                console.log(response);
            }
            // 后台以200状态码的结果形式返回的错误信息
            if (response.status == 200 && isResponseErrcode(response.data)) {
                doResponseErrcode(response.data);
                uiUnblock();
                return $q.reject(response);
            }
            if (response.config.secureKey && response.config.headers['Encrypt-Resp']) {
                response.data = decryptResponse(response.config.secureKey, response.data);
            }
            if (response.config.afters) {
                try {
                    doCallbackFunction(response.config.afters, response.data);
                } catch (e) {
                    console.log(e);
                    $rootScope.alert({title: '出错了', message: _errorPrompt});
                    uiUnblock();
                    $q.reject(response);
                }
            }
            if (true === response.config.block || 'true' === response.config.block)
                uiUnblock();
            return response;
        },
        responseError: function (response) {
            $rootScope.alert({title: '出错了', message: _errorPrompt});
            uiUnblock();
            return $q.reject(response);
        }
    };
}]);

app.controller('appModalCtrl', ['$scope', '$uibModalInstance', 'items', function ($scope, $uibModalInstance, items) {
    $scope.items = items;
    $scope.ok = function () {
        $uibModalInstance.close();
        if ($scope.items.callback)
            $scope.items.callback();
    };
    $scope.confirm = function () {
        $uibModalInstance.close();
        var requst = {};
        requst[$scope.items.Id] = $scope.items.id;
        requst[$scope.items.Content] = $scope.reason;
        if ($scope.items.callback)
            $scope.items.callback(requst);
    };
    $scope.msg = function () {
        $uibModalInstance.close();
        if ($scope.items.callback)
            $scope.items.callback($scope.items.message);
    };
    $scope.cancel = function () {
        $uibModalInstance.close();
        if ($scope.items.cancel)
            $scope.items.cancel();
    };
}]);

app.controller('AppController', ['$scope', '$rootScope', '$http', '$timeout', 'PATH', function ($scope, $rootScope, $http, $timeout, PATH) {
    $scope.$on('$viewContentLoaded', function () {
        if(sessionStorage.user!=null) {
            $rootScope.user = angular.fromJson(sessionStorage.user)
        }
        App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
    });

    //加载字典数据
    $rootScope.dicts = [];
    $scope.initDicts = function (names) {
        var nonames = names.split(",");
        var index = [];
        for (var i in nonames) {
            if ($scope.dicts[nonames[i]])
                index.push(i);
        }
        index.reverse();
        for (var j in index) {
            nonames.splice(index[j], 1);
        }
        if (nonames.length != 0) {
            $http.get(PATH.common.dict + '/' + nonames.join(",")).success(function (result) {
                if (nonames.length == 1) {
                    $scope.dicts[nonames[0]] = result;
                } else {
                    for (var p in result) {
                        $scope.dicts[p] = result[p];
                    }
                }

                $scope.$broadcast('$dict.loaded');
            });
        }
        else {
            $timeout(function () {
                $scope.$broadcast('$dict.loaded');
            }, 50);
        }
    };

    $scope.getDictByProp = function (typename, value, prop) {
        if (!$scope.dicts[typename]) {
            console.error('Can not found ' + typename + '[' + prop + '] dictionary');
            return undefined;
        }
        for (var p in $scope.dicts[typename]) {
            var dp = prop == undefined ? 'id' : prop;
            if ($scope.dicts[typename][p][dp] == value)
                return $scope.dicts[typename][p];
        }
        console.error('Can not found ' + typename + '[' + prop + '] dictionary');
        return undefined;
    };

    $scope.formatter = {
        formatDictByValue: function (value, row, index) {
            if (value == undefined)
                return value;
            var dict = this.dict;
            if (!dict) {
                return 'can not found dict attribute in column define';
            }
            var d = $scope.getDictByProp(dict, value, 'value');
            return d == undefined ? undefined : d.name;
        },
        formatDictById: function (value, row, index) {
            if (value == undefined)
                return value;
            var dict = this.dict;
            if (!dict) {
                return 'can not found dict attribute in column define';
            }
            var d = $scope.getDictByProp(dict, value);
            return d == undefined ? undefined : d.name;
        }
    };


    //加载区域信息
    $scope.regions = [];
    $scope.initRegions = function () {
        if ($scope.regions.length == 0) {
            $http.get(PATH.common.region).success(function (result) {
                $scope.regions = result;
            });
        }
    };

    //加载管理公司信息
    $scope.company = [];
    $scope.initCompany = function () {
        if ($scope.company.length == 0) {
            $http.post(PATH.company()).success(function (result) {
                $scope.company = result.data;
            });
        }
    };

    //加载部门信息
    $scope.depts = [];
    $scope.initDepts = function () {
        if ($scope.depts.length == 0) {
            $http.post(PATH.dept()).success(function (result) {
                $scope.depts = result.data;
            });
        }
    };

    //加载彩种信息
    $scope.lottery_type = [];
    $scope.initlotterytype = function () {
        if ($scope.lottery_type.length == 0) {
            $http.post(PATH.dept()).success(function (result) {
                $scope.lottery_type = result.data;
            });
        }
    };

    //加载违规信息
    $scope.kpiCategory = [];
    $scope.initKpiCategory = function () {
        if ($scope.kpiCategory.length == 0) {
            $http.post(PATH.kpiCategory()).success(function (result) {
                $scope.kpiCategory = result.data;
            });
        }
    };

}]);


app.controller('HeaderController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initHeader(); // init header
    });
    if (sessionStorage.user != null) {
        $rootScope.userName = angular.fromJson(sessionStorage.user).user.name
    }
}]);

app.controller('SidebarController', ['$state', '$scope', function ($state, $scope) {

    $scope.$on('$includeContentLoaded', function () {
        Layout.initSidebar($state); // init sidebar
    });
}]);
app.controller('QuickSidebarController', ['$scope', 'messageService', function ($scope, messageService) {
    $scope.$on('$includeContentLoaded', function () {
        setTimeout(function () {
            QuickSidebar.init(); // init quick sidebar
        }, 100)
    });
    //if (sessionStorage.user != null) {
    //    messageService.getmessage().then(function (res) {
    //        $scope.msgList=res.data;
    //    })
    //}

}]);
app.controller('GeneralPageController', ['$rootScope', '$scope', 'settings', function ($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        App.initAjax();

        // set default layout mode
        // $rootScope.settings.layout.pageBodySolid = false;
        // $rootScope.settings.layout.pageSidebarClosed = false;
    });
}]);

app.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        modules: []
    });
}]);

app.config(['czTableConfigProvider', 'ENV', function (czTableConfigProvider, ENV) {
    czTableConfigProvider.options.urlPrefix = ENV.api;
}]);


app.config(['$httpProvider', function ($httpProvider) {
    // Set x-www-form-urlencoded Content-Type
    //$httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    //$httpProvider.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    //$httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    //Set up global transformRequest function
    /**
     $httpProvider.defaults.transformRequest = function (data) {
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    };
     **/

    $httpProvider.interceptors.push('httpInterceptor');
}]);

app.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
    // 将Angular的组件，指令等等的注册接口挂到app对象上，可以在应用程序启动之后任意可以添加功能
    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
    app.value = $provide.value;
}]);

app.run(['$rootScope', 'settings', '$state', function ($rootScope, settings, $state) {
    $rootScope.$state = $state;
    $rootScope.$settings = settings;
    $rootScope.$settings.layout.pageBodySolid = false;
    $rootScope.$settings.layout.pageSidebarClosed = false;
    $rootScope.context = {};
}]);
app.directive('repeatFinish', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last == true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});