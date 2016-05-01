var validation = angular.module('app.directives.validation', []);

validation.directive("email", [function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.email = function(modelValue) {
                var patt = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i);
                return patt.test(modelValue);
            }
        }
    };
}]);

validation.directive("password", [function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.password = function(modelValue) {  
                var patt = new RegExp(/^(?=.*\d)[a-z+\d !\u0022#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/i);
                return patt.test(modelValue);
            }
        }
    };
}]);

validation.directive("confirmPassword", [function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=confirmPassword"
        },
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.confirmPassword = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
}]);

validation.directive("healthInsuranceNumber", [function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.healthInsuranceNumber = function(modelValue) {
                var patt = new RegExp(/^[\d]{9}$/i);
                return patt.test(modelValue);
            }
        }
    };
}]);

// TODO - Ni čisto ok
validation.directive("date", [function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.date = function(modelValue) {
                return (modelValue instanceof Date) && modelValue && modelValue != 'Invalid Date';
            }
        }
    };
}]);

// TODO - Ni čisto ok
validation.directive("telephoneNumber", [function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.telephoneNumber = function(modelValue) {
                var patt = new RegExp(/^[\d+ -]{9,}$/i);
                return patt.test(modelValue);
            }
        }
    };
}]);

// TODO - Ni čisto ok
validation.directive("postNumber", ['helperResources', function(helperResources) {
    return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attributes, ngModel) {
        ngModel.$validators.postNumber = function(modelValue) {
            var patt = new RegExp(/^[\d]{4}$/i);
            return patt.test(modelValue);
        }
    }
};
}]);

validation.directive("doctorKey", [function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.doctorKey = function(modelValue) {
                var patt = new RegExp(/^[a-zA-Z\d]{4}$/i);
                return patt.test(modelValue);
            }
        }
    };
}]);