// JavaScript source code
(function () {
    if (typeof angular === 'undefined') {
        return;
    }
    angular.module('czPlugin', [])
        .constant('uiCzTables', {czTables: {}})
        .provider('czTableConfig', function(){
            this.options = {
                method : 'post',
                contentType : 'application/x-www-form-urlencoded',
                pagination : true,
                showPrint : true,
                striped : true,
                cache : false,
                sidePagination : 'server',
                totalField : 'recordsTotal',
                dataField : 'data',
                urlPrefix : undefined
            };

            this.$get = function () {
                return this.options;
            }
        })
        .directive('czTableControl', ['uiCzTables', '$parse', 'czTableConfig',
            function (uiCzTables, $parse, czTableConfig) {
                var CONTAINER_SELECTOR = '.bootstrap-table';
                var SCROLLABLE_SELECTOR = '.fixed-table-body';
                var SEARCH_SELECTOR = '.search input';
                var czTables = uiCzTables.czTables;

                function getCzTable(el) {
                    var result;
                    $.each(czTables, function (id, czTable) {
                        if (!czTable.$el.closest(CONTAINER_SELECTOR).has(el).length) return;
                        result = czTable;
                        return true;
                    });

                    return result;
                }

                function getScopeAttr($scope, name){
                    return $parse(name)($scope.$parent);
                }

                $(window).resize(function () {
                    $.each(czTables, function (id, czTable) {
                        czTable.$el.bootstrapTable('resetView');
                    });
                });

                function onScroll() {
                    var czTable = this;
                    var state = czTable.$s.czTableControl.state;
                    czTable.$s.$applyAsync(function () {
                        state.scroll = czTable.$el.bootstrapTable('getScrollPosition');
                    });
                }

                $(document)
                    .on('post-header.bs.table', CONTAINER_SELECTOR + ' table', function (evt) { // bootstrap-table calls .off('scroll') in initHeader so reattach here
                        var czTable = getCzTable(evt.target);
                        if (!czTable) return;
                        czTable.$el
                            .closest(CONTAINER_SELECTOR)
                            .find(SCROLLABLE_SELECTOR)
                            .on('scroll', onScroll.bind(czTable));
                    })
                    .on('sort.bs.table', CONTAINER_SELECTOR + ' table', function (evt, sortName, sortOrder) {
                        var czTable = getCzTable(evt.target);
                        if (!czTable) return;
                        var state = czTable.$s.czTableControl.state;
                        czTable.$s.$applyAsync(function () {
                            state.sortName = sortName;
                            state.sortOrder = sortOrder;
                        });
                    })
                    .on('page-change.bs.table', CONTAINER_SELECTOR + ' table', function (evt, pageNumber, pageSize) {
                        var czTable = getCzTable(evt.target);
                        if (!czTable) return;
                        var state = czTable.$s.czTableControl.state;
                        czTable.$s.$applyAsync(function () {
                            state.pageNumber = pageNumber;
                            state.pageSize = pageSize;
                        });
                    })
                    .on('click-row.bs.table', CONTAINER_SELECTOR + ' table', function (evt, row, $element, field) {
                        var czTable = getCzTable(evt.target);
                        if (!czTable) return;
                        czTable.$s.$emit('$table.row.click', row, field);
                    })
                    .on('load-success.bs.table', CONTAINER_SELECTOR + ' table', function (evt, data) {
                        var czTable = getCzTable(evt.target);
                        if (!czTable) return;

                        if (data && data.errcode){
                            czTable.$s.$emit('$data.error', data);
                        }
                        else{
                            czTable.$s.$emit('$data.success', data);
                        }
                    })
                    .on('search.bs.table', CONTAINER_SELECTOR + ' table', function (evt, searchText) {
                        var czTable = getCzTable(evt.target);
                        if (!czTable) return;
                        var state = czTable.$s.czTableControl.state;
                        czTable.$s.$applyAsync(function () {
                            state.searchText = searchText;
                        });
                    })
                    .on('focus blur', CONTAINER_SELECTOR + ' ' + SEARCH_SELECTOR, function (evt) {
                        var czTable = getCzTable(evt.target);
                        if (!czTable) return;
                        var state = czTable.$s.czTableControl.state;
                        czTable.$s.$applyAsync(function () {
                            state.searchHasFocus = $(evt.target).is(':focus');
                        });
                    });

                return {
                    restrict: 'EA',
                    scope: {czOption: '=', czDelegateHandle : '@'},
                    controller : ['$scope',
                        function($scope){
                            var that = this;

                            this.setColumnOptions = function(name, index, value, optName){
                                var opt = value;
                                if (typeof opt == 'string') {
                                    opt = getScopeAttr($scope, value);
                                }
                                if (opt){
                                    if (!$scope.columnExt) $scope.columnExt = {};
                                    var o = {};
                                    o[optName] = opt;
                                    var key =  index + (name == undefined ? '' : '__' + name);
                                    $scope.columnExt[key] = angular.extend({}, $scope.columnExt[key], o);
                                }
                            };

                            this.setIndexColumn = function(index){
                                function formatIndex(value, row, ind){
                                    var state = $scope.czTableControl.state || {};
                                    var num = state.pageNumber || 1,
                                        size = state.pageSize || 10;
                                    return (num - 1) * size + (ind + 1);
                                }

                                that.setColumnOptions(undefined, index, formatIndex, 'formatter');
                            };

                            this.reindexColumn = function(start, length){
                                if (length <= 1)
                                    return;

                                var col = $scope.columnExt || {};
                                $.each(col, function (field, ext) {
                                    var p = field.split('__');
                                    if (p[0] * 1 > start){
                                        delete col[field];
                                        var nf = (p[0] * 1 + length - 1) + (p.length == 1 ? '' : '__' + p[1]);
                                        col[nf] = ext;
                                    }
                                });
                            }
                        }],
                    link: function ($scope, $element, $attr) {
                        var czTable = czTables[$scope.$id] = {$s: $scope, $el: $element};
                        $scope.czTableControl = {};

                        var opt;
                        if ($scope.czOption){
                            opt = $scope.czOption || {};
                        }

                        var url = $attr.url;

                        var extOpt = {
                            queryParams : function(params){
                                var p = [];
                                if ($scope.$parent.filter){
                                    var filter = {};
                                    $.each($scope.$parent.filter, function (name, value) {
                                        var n = name.replace(/__/ig, '.');
                                        filter['filter.' + n] = value;
                                    });
                                    angular.extend(params, filter);
                                }

                                $.each(params, function (name, value) {
                                    if (name === 'limit'){
                                        p.push('length=' + encodeURIComponent(value));
                                    }
                                    else if (name === 'offset'){
                                        p.push('start=' + encodeURIComponent(value));
                                    }
                                    else if (value != undefined) {
                                        p.push(encodeURIComponent(name) + '=' + encodeURIComponent(value));
                                    }
                                });

                                return p.join('&');
                            }
                        };

                        if (url)
                            extOpt.url = czTableConfig.urlPrefix == undefined ? url : czTableConfig.urlPrefix + url;

                        angular.extend(extOpt, czTableConfig);

                        if ($scope.columnExt){
                            angular.extend(extOpt, {columnExt : $scope.columnExt});
                        }

                        angular.extend(extOpt, opt);

                        $scope.czTableControl.options = extOpt || {};
                        var handle = $scope.czDelegateHandle || 'delegateHandle';

                        function delegateHandle() {
                            var args = Array.prototype.slice.call(arguments);
                            var method = args[0],
                                param = args.length > 1 ? args[1] : undefined;

                            if (method == 'refresh'){
                                $scope.czTableControl.options.initLoad = true;
                            }

                            return $element.bootstrapTable(method, param);
                        }

                        $scope.$parent[handle] = delegateHandle;
                        var f = $scope.$parent['setDelegate'];
                        if (f && typeof f == 'function'){
                            f.call($scope.czTableControl.options, delegateHandle);
                        }

                        $scope.instantiated = false;

                        $scope.$watch('czOption.hide', function (hide) {
                            $scope.czTableControl.options.hide = hide;
                        }, true);

                        $scope.$watch('czTableControl.options', function (options) {
                            //redefine options
                            if (!options) options = $scope.czTableControl.options = {};
                            var state = $scope.czTableControl.state || {};

                            if (!options.hide){
                                if ($scope.instantiated) $element.bootstrapTable('destroy');
                                $element.bootstrapTable(angular.extend(options, state));
                                $scope.instantiated = true;

                                // Update the UI for state that isn't settable via options
                                if ('scroll' in state) $element.bootstrapTable('scrollTo', state.scroll);
                                if ('searchHasFocus' in state) $element.closest(CONTAINER_SELECTOR).find(SEARCH_SELECTOR).focus(); // $el gets detached so have to recompute whole chain
                            }
                        }, true);

                        $scope.$watch('czTableControl.state', function (state) {
                            if (!state) state = $scope.czTableControl.state = {};
                            $element.trigger('directive-updated.bs.table', [state]);
                        }, true);

                        $scope.$on('$destroy', function () {
                            delete czTables[$scope.$id];
                        });
                    }
                };
            }])
        .directive('czColumnFormatter', function () {
            return {
                restrict: 'A',
                scope: true,
                require : "^^czTableControl",
                link: function ($scope, $ele, $attrs, $table) {
                    if ($table && $table.setColumnOptions && (typeof $table.setColumnOptions === 'function')){
                        var index = $ele.prop('cellIndex');
                        $table.setColumnOptions($attrs.field, index, $attrs.czColumnFormatter, 'formatter');
                    }
                }
            };
        })
        .directive('czColumnEvent', function () {
            return {
                restrict: 'A',
                scope: true,
                require : "^^czTableControl",
                link: function ($scope, $ele, $attrs, $table) {
                    if ($table && $table.setColumnOptions && (typeof $table.setColumnOptions === 'function')){
                        var index = $ele.prop('cellIndex');
                        $table.setColumnOptions($attrs.field, index, $attrs.czColumnEvent, 'events');
                    }
                }
            };
        })
        .directive('czIndexColumn', function () {
            return {
                restrict: 'A',
                scope: true,
                require : "^^czTableControl",
                link: function ($scope, $ele, $attrs, $table) {
                    if ($table && $table.setIndexColumn && (typeof $table.setIndexColumn === 'function') && $attrs.czIndexColumn == 'true'){
                        var index = $ele.prop('cellIndex');
                        $table.setIndexColumn(index);
                    }
                }
            };
        })
        .directive('czColumnRepeat', function () {
            return {
                restrict: 'A',
                scope: {czColumnRepeat: '='},
                require : "^^czTableControl",
                link: function ($scope, $ele, $attrs, $table) {
                    var index = $ele.prop('cellIndex');

                    $scope.$watch('czColumnRepeat', function (columns) {
                        if (columns && angular.isArray(columns) && columns.length > 1){
                            var cols = [];
                            angular.forEach(columns, function(col){
                                var p = $ele.clone();
                                p.text(col.name);
                                p.attr('data-field', col.field);
                                cols.push(p);
                            });

                            $ele.after(cols);
                            $ele.remove();

                            if ($table && $table.reindexColumn && (typeof $table.reindexColumn === 'function')){
                                $table.reindexColumn(index, cols.length);
                            }

                            $scope.$parent.$emit('$column.repeat.done');
                        }
                    }, true);
                }
            };
        })
})();
