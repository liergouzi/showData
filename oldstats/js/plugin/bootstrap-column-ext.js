/**
 * @version: v1.0.0
 *
 */

!function($) {
    'use strict';

    $.extend($.fn.bootstrapTable.defaults, {
        columnExt : {}
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initTable = BootstrapTable.prototype.initTable;

    BootstrapTable.prototype.initTable = function() {
        _initTable.apply(this, Array.prototype.slice.apply(arguments));

        if (this.options.columnExt) {
            var that = this;
            $.each(that.options.columnExt, function (field, ext) {
                var p = field.split('__');
                $.each(that.columns, function(index, column){
                    if ((p.length == 1 && index == p[0] * 1) || (p.length == 2 && index == p[0] * 1 && column.field === p[1])){
                        $.extend(column, ext);
                    }
                })
            });
        }
    };
}(jQuery);
