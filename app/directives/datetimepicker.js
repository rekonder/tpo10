var validation = angular.module('app.directives.datetimepicker', []);

validation.directive("datetimepicker", [function() {
    return {
        require: 'ngModel',
        restrict: 'AE',
        scope: {
            useCurrent: '@',
            maxDate: '@',
            minDate: '@',
            viewMode: '@'
        },
        link: function (scope, element, attributes, ngModel) {
            element.datetimepicker({
                useCurrent: scope.useCurrent,
                maxDate: eval(scope.maxDate),
                minDate: eval(scope.minDate),
                viewMode: scope.viewMode,
                locale: 'sl',
                format: 'D. M. YYYY'
            })

            element.on('blur', function () {
                var datetime = new Date(moment(element[0].value, 'D. M. YYYY').add(12, 'hours'));
                ngModel.$setViewValue(datetime);
            });
        }
    };
}]);