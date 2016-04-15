var app = angular.module('app', [
    'ngResource',
    'ngMessages',
    'ngRoute',
    // LIBS
    'jcs-autoValidate',
    'angular-ladda',
    
    'app.routes',
    'app.directives.validation',
    'app.shared.navbar',
    
    // RESOURCES
    'app.resources.account',
    
    // LOGIN
    'app.components.login',
    'app.components.login.forgotten',
    
    // REGISTER
    'app.components.register'
]);

app.run(['$rootScope', 'defaultErrorMessageResolver',
function($rootScope, defaultErrorMessageResolver) {
    $rootScope.appSettings = {
        brandName: 'TPO 10',
        // baseUrl: 'http://localhost:64110/'
        baseUrl: 'http://tpo10-rest.azurewebsites.net'
    };
    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
        errorMessages['email'] = 'Napačen e-poštni naslov.';
        errorMessages['password'] = 'Geslo mora vsebovati vsaj 8 zankov od tega vsaj eno številko.';
        errorMessages['confirmPassword'] = 'Gesli se ne ujemata.';
    });
    
}]);