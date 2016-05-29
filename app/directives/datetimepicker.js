var validation = angular.module('app.directives.datetimepicker', []);

validation.directive("datetimepicker", [function() {
    return {
        require: 'ngModel',
        restrict: 'AE',
        scope: {
            useCurrent: '@',
            maxDate: '@',
            minDate: '@',
            viewMode: '@',
            format: '@'
        },
        link: function (scope, element, attributes, ngModel) {
            element.datetimepicker({
                useCurrent: scope.useCurrent,
                maxDate: eval(scope.maxDate),
                minDate: eval(scope.minDate),
                viewMode: scope.viewMode,
                locale: 'sl',
                format: scope.format ||  'D. M. YYYY',
                disabledTimeIntervals: false
            })
            
            
                                    
            element.on('blur', function () {
                var datetime = {};
                
                /* 
                ? Zakaj so v bazi datumi shranjeni z uro 10 oz. 2 uri za zeljeno (+12h je Mav prištel, v bazi 10)
                 Central European Summer Time (CEST) is 2 hours ahead of Coordinated Universal Time. 
                 This time zone is a Daylight Saving Time time zone and is used in: Europe, Antarctica. 
                */
                if(typeof scope.format === 'undefined') 
                    datetime = new Date(moment(element[0].value, 'D. M. YYYY').add(12, 'hours'));
                else 
                    datetime = new Date(moment(element[0].value, scope.format).add(2, 'hours')); 
                
                // console.log(datetime);
                ngModel.$setViewValue(datetime);
                   
            });
            
            
            
        }
    };
}]);