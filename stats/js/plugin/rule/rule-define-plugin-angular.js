'use strict';

angular.module('czPlugin')
    .directive('czRuleDefine', ['$compile', '$templateRequest', '$q', '$timeout', 'pluginRuleDefine', function ($compile, $templateRequest, $q, $timeout, pluginRuleDefine) {
        return {
            restrict: 'EA',
            link: function ($scope, $element, $attrs) {
                $scope.$$rules = pluginRuleDefine.define;
                function makeTemplateUrl(url){
                    if (pluginRuleDefine.baseUrl){
                        return pluginRuleDefine.baseUrl + '/' + url + '?' + Math.floor(Math.random() * ( 10000000 + 1));
                    }
                    else{
                        return url;
                    }
                }

                function getTemplatePromise(rule) {
                    return rule.template ? $q.when(rule.template) :
                        $templateRequest(angular.isFunction(rule.templateUrl) ?
                            rule.templateUrl() : makeTemplateUrl(rule.templateUrl));
                }

                function createRuleElement(name){
                    var rule = null;
                    for(var i = 0; i < pluginRuleDefine.define.length; i++){
                        var r = pluginRuleDefine.define[i];
                        if (r && r.name === name){
                            rule = r;
                            break;
                        }
                    }

                    return getTemplatePromise(rule)
                        .then(function(template){
                            var html = [
                                '<div class="rule-select" ng-controller="$$RuleDefineCtrl_' + name + '">',
                                template,
                                '</div>'
                            ].join('');
                            $scope['$$RuleDefineCtrl_' + name] = rule.controller;
                            var ele = $compile(html)($scope);
                            return {rule : rule, element : ele};
                        })
                        .then(function(ele){
                            var div = $($element).find('#_rule_div_');
                            div.empty();
                            div.append(ele.element);
                            return ele;
                        });
                }

                $scope.$watch($attrs.czRuleDefine, function(value) {
                    if (value && value.name) {
                        $scope.ruleName = value.name;
                        createRuleElement($scope.ruleName).then(function(ele){});
                    }
                });

                var html = [
                    '<select class="custom-control" style="margin-bottom: 15px">',
                    '<option>---请选择---</option>',
                    '<option ng-value="r.name" ng-selected="ruleName == r.name" ng-repeat="r in $$rules">{{r.displayName}}</option>',
                    '</select><div id="_rule_div_"></div>'
                ].join('');
                $element.append($compile(html)($scope));

                $element.find('select').off('change').on('change', function(){
                    var name = this.options[this.options.selectedIndex].value;
                    if ('' === name)
                        return;

                    $scope.ruleName = name;
                    createRuleElement(name).then(function(ele){});
                });

                $element.on('$destroy', function() {
                    $element.find('select').off('change');
                });
            }
        };
    }]);