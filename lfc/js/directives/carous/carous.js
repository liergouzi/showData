/**
 * Created by 46358 on 2016/11/4.
 */
app.directive('smCarous', function() {
    return {
        templateUrl:'js/directives/carous/carous.html',
        restrict: "EA",
        scope:{
          imgArr:'=',
          size:'='
        },
        link: function(scope, ele, attrs, modelCtrl) {
            scope.i=12/scope.size;
            var carousels = $('.carousel');
            function chunk(array, size) {
                var result = [];
                for (var x = 0; x < Math.ceil(array.length / size); x++) {
                    var start = x * size;
                    var end = start + size;
                    result.push(array.slice(start, end));
                }
                return result;
            }
            scope.imgArr=chunk(scope.imgArr,scope.size);
            carousels.each(function () {
                var $obj = $(this);
                var $inner = $obj.find('.carousel-inner');

                var id = 'uuid' + new Date().getTime();
                $obj.addClass(id);
                setTimeout(function(){
                    if ($obj.data('shift') === 1) {
                        var items = $obj.find('.item > [class*="col-"]'),
                            visibleCnt = $obj.find('.item:first [class*="col-"]').length,
                            wrapper = "";
                        // build styles
                        var rule_base = '.carousel.' + id + ' .carousel-inner > .item',
                            styles = $('<style></style>'),
                            rules = [];
                        rules[0] = rule_base + '.next {left: ' + (100 / visibleCnt) + '%; transform: none;}';
                        rules[1] = rule_base + '.active {left: 0;}';
                        rules[2] = rule_base + '.active.left {left: -' + (100 / visibleCnt) + '%; transform: none;}';
                        rules[3] = rule_base + '.next.left {left: 0;}';
                        rules[4] = rule_base + '.active.right {left: ' + (100 / visibleCnt) + '%; transform: none;}';
                        rules[5] = rule_base + '.prev.right {left: 0;}';
                        rules[6] = rule_base + '.prev {left: -' + (100 / visibleCnt) + '%; transform: none;}';
                        for (var i = 0; i < rules.length; i++) {
                            styles.append(rules[i]);
                        }
                        $obj.prepend(styles);
                        // rebuild items
                        for (var i = 0; i < $(items).length; i++) {
                            var $item = $(items[i]);
                            var parent = $item.parent();
                            if (parent.hasClass('item')) {
                                if (!wrapper.length) {
                                    wrapper = parent.clone().removeClass('active').html('');
                                }
                                $item.unwrap();
                            }

                            var itemGroup = [$item];
                            for (var x = 1; x < visibleCnt; x++) {
                                var a = i + x;
                                var next = $(items[a]);
                                if (!next.length) {
                                    next = $(items[(a - $(items).length)]);
                                }
                                itemGroup[x] = next.clone();
                            }
                            var newSet = wrapper.clone().html(itemGroup);
                            if (i == 0) {
                                newSet.addClass('active');
                            }
                            newSet.appendTo($inner);
                        }
                    }
                },100)

            });

        }
    }
});