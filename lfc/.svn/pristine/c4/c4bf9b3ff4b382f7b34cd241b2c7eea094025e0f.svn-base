'use strict';

app.controller('restController', ['$scope', '$rootScope', '$http', '$element', function($scope, $rootScope, $http, $element) {
    function initOperation($element) {
        if ($scope.operation)
            return;

        var options = parseDataOptions($element);
        $scope.operation = options || {};

        $scope.operation.pageStatus = $scope.operation.pageStatus || "LIST";
        $scope.operation.pojoName = $scope.operation.pojoName || "pojo";
        $scope.operation.pojoNames = $scope.operation.pojoName + "s";
        if ($scope.operation.initLoad == undefined)
            $scope.operation.initLoad = false;

        if (!$scope[$scope.operation.pojoName])
            $scope[$scope.operation.pojoName] = {};
        if (!$scope.operation.action)
            $scope.operation.action = "/rest/" + $scope.operation.pojoName;
    }

    var tableDelegate = undefined;

    $scope.setDelegate = function(delegate){
        this.initLoad = $scope.operation.initLoad;
        if (this.url == undefined && $scope.operation.pageStatus == 'LIST')
            this.url = $scope.operation.action + '?_method=get';
        tableDelegate = delegate;
    };

    $scope.executeDelegate = function(){
        var fn = tableDelegate || angular.noop;
        var args = Array.prototype.slice.apply(arguments);
        var method = args[0],
            param = args[1];

        return fn(method, param);
    };

    initOperation($element);

    $scope.filter = $scope.filter || {};

    $scope.getPojo = function(id) {
        var pojo = null;
        if (id || id == 0) {
            var data = $scope.executeDelegate('getData');
            if (data) {
                for (var d in data) {
                    if (data[d] && data[d]['id'] == id) {
                        pojo = data[d];
                        break;
                    }
                }
            }
        }
        return pojo;
    };

    $scope.refresh = function(){
        $scope.executeDelegate('refresh');
    };

    $scope.setPojoAfters = {};
    $scope.setPojo = function(pojo) {
        $scope[$scope.operation.pojoName] = pojo;
        doCallbackFunction($scope.setPojoAfters);
    };

    $scope.createAfters = {};
    $scope.create = function() {
        $("span.required").show();
        $scope.operation.pageStatus = 'CREATE';
        $scope.setPojo({});
        doCallbackFunction($scope.createAfters);
    };

    $scope.updateAfters = {};
    $scope.update = function(id) {
        $("span.required").show();
        var p = $scope.getPojo(id);
        if (p == null)
            return;
        $scope.operation.pageStatus = 'UPDATE';
        $scope.setPojo(p);
        doCallbackFunction($scope.updateAfters);
    };

    $scope.removePres = {};
    $scope.remove = function(id) {
        var removed = $scope.getPojo(id);
        doCallbackFunction($scope.removePres);
        if (removed == null)
            return;
        var pi = "";
        if ($scope.operation.pojoIndex)
            pi = removed[$scope.operation.pojoIndex];
        else
            pi = removed['id'];
        $scope.dialog({
            title : '删除',
            message : '确定要删除吗？',
            callback : function() {
                $http({
                    method : 'DELETE',
                    action : $scope.operation.action,
                    data : id
                }).success(function(result) {
                    $scope.refresh();
                });
            }
        });
    };

    $scope.detailAfters = {};
    $scope.detail = function(id) {
        $("span.required").hide();
        var p = $scope.getPojo(id);
        console.log(p);
        if (p == null)
            return;
        $scope.setPojo(p);
        $scope.operation.pageStatus = 'DETAIL';
        doCallbackFunction($scope.detailAfters);
    };

    $scope.cancel = function() {
        if ($scope.operation.pageStatus != 'DETAIL') {
            $scope.refresh();
        }
        $scope.operation.pageStatus = 'LIST';
    };

    $scope.savePres = {};
    $scope.saveAfters = {};
    $scope.save = function(form) {
        doCallbackFunction($scope.savePres);
        if ($scope.errFormValidator(form))
            return;
        $http({
            block: true,
            pres: $scope.savePres,
            method : 'PUT',
            action : $scope.operation.action,
            data : $scope[$scope.operation.pojoName]
        }).success(function(result){
            $scope[$scope.operation.pojoName] = result;
            doCallbackFunction($scope.saveAfters);
            $scope.cancel()
        });
    };

    $scope.saveSubmit = function(form, submitFlag){
        if ($scope.errFormValidator(form))
            return;

        $scope[$scope.operation.pojoName].submitFlag = submitFlag;
        $scope.save(form);
    };

    $scope.showMessage = function(title, message, subTitle) {
        $rootScope.alert({
            title : title,
            subTitle: subTitle,
            message : message,
            callback : function() {
            }
        });
    };

    $scope.getSelectedRowIds = function(){
        var data = $scope.getSelectedRows();
        var ret = [];
        for(var i in data){
            ret.push(data[i]['id']);
        }
        return ret;
    };

    $scope.getSelectedRows = function(){
        return $scope.executeDelegate('getSelections');
    };

    $scope.$on('$dict.loaded', function(){
        if (!$scope.operation.initLoad)
            $scope.refresh();
    });
}]);