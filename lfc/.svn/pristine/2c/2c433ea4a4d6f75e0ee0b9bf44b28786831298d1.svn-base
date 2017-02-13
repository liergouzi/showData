/**
 * @version: v1.0.0
 *
 */

!function($) {
    'use strict';

    $.extend($.fn.bootstrapTable.defaults, {
        advancedSearch: false,
        searchToolbar: undefined,
        initLoad : true
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initToolbar = BootstrapTable.prototype.initToolbar,
        _initServer = BootstrapTable.prototype.initServer,
        _refresh = BootstrapTable.prototype.refresh;

    BootstrapTable.prototype.initToolbar = function() {
        _initToolbar.apply(this, Array.prototype.slice.apply(arguments));

        if (this.options.advancedSearch && this.options.searchToolbar){
            $(this.options.searchToolbar).find('#ok')
                .off('click').on('click', $.proxy(this.refresh, this));
        }
    };

    BootstrapTable.prototype.refresh = function() {
        this.options.initLoad = true;

        _refresh.apply(this, Array.prototype.slice.apply(arguments));
    };

    BootstrapTable.prototype.setInitLoad = function(value) {
        this.options.initLoad = value;
    };

    BootstrapTable.prototype.initServer = function(silent, query, url) {
        if (!this.options.initLoad)
            return;

        _initServer.apply(this, [silent, query, url]);
    };
}(jQuery);
