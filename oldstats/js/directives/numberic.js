/**
 * Created by 46358 on 2016/10/26.
 */
//只输入数字
app.directive('numberic', function() {
    return {
        require: 'ngModel',
        restrict: "EA",
        scope: {
            max: '@',
            maxLength: '@',
            min: '@'
        },
        link: function(scope, ele, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(inputValue) {
                if (inputValue == undefined) {
                    return '';
                }

                var max = +scope.max;
                var maxLength = +scope.maxLength;
                var min = +scope.min;

                var transformedInput = inputValue.replace(/[^0-9]/g, '');

                if (maxLength && inputValue.length > maxLength) {
                    transformedInput = inputValue.slice(0, maxLength);
                }
                if (max && +transformedInput > max) {
                    transformedInput = max + '';
                }
                if (min && +transformedInput < min) {
                    transformedInput = min + '';
                }
                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            })
        }
    }
});

//只输入中文和字母
app.directive('chinese', function() {
    return {
        require: 'ngModel',
        restrict: "EA",
        scope: {
            max: '@',
            maxLength: '@',
            min: '@'
        },
        link: function(scope, ele, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(inputValue) {
                if (inputValue == undefined) {
                    return '';
                }

                var max = +scope.max;
                var maxLength = +scope.maxLength;
                var min = +scope.min;

                var transformedInput = inputValue.replace(/[^a-zA-Z\u4e00-\u9fa5]+$/g, '');

                if (maxLength && inputValue.length > maxLength) {
                    transformedInput = inputValue.slice(0, maxLength);
                }
                if (max && +transformedInput > max) {
                    transformedInput = max + '';
                }
                if (min && +transformedInput < min) {
                    transformedInput = min + '';
                }
                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            })
        }
    }
});